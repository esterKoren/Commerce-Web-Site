import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

export const getInformationOnTheQuantityOfProductsPurchasedForEachProduct = async () => {
    try {
        // שליפת כל ההזמנות
        const ordersSnapshot = await getDocs(collection(db, "order"));
        const orders = ordersSnapshot.docs.map((doc) => ({
            products: doc.data().products.map((product) => ({
                productId: product.prodId,
                qty: product.amount,
            })),
        }));

        // שליפת כל המוצרים
        const productsSnapshot = await getDocs(collection(db, "product"));
        const products = productsSnapshot.docs.map((doc) => {
            const productId = doc.id;
            const productName = doc.data().productName;

            // חישוב הכמות הכוללת שנרכשה עבור מוצר זה
            const quantityPurchased = orders.reduce((total, order) => {
                return total + (order.products.find((product) => product.productId === productId)?.qty || 0);
            }, 0);

            return {
                id: productId,
                quantityPurchased,
                productName,
              
            };
        });

        return products;
    } catch (error) {
        console.error("Error fetching product purchase data:", error);
        return [];
    }

};
export const getProductsQuantityPerCustomer = async () => {
    try {
      // שליפת הזמנות
      const ordersSnapshot = await getDocs(collection(db, "order"));
      const orders = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        userId: doc.data().userId, 
        products: doc.data().products.map((product) => ({
          productId: product.prodId,
          qty: product.amount,
        })),
      }));
  
      // שליפת מוצרים
      const productsSnapshot = await getDocs(collection(db, "product"));
      const productsMap = productsSnapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data().productName;
        return acc;
      }, {});
  
      // שליפת לקוחות
      const usersSnapshot = await getDocs(collection(db, "user"));
      const customers = usersSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          name: doc.data().name, 
        }))
        .filter((user) => user.role !== "admin"); // סינון רק לקוחות
  
      // יצירת מבנה הנתונים הרצוי
      const customersWithProducts = customers.map((customer) => {
        // חישוב סך כל הכמויות שהלקוח קנה לכל מוצר
        const purchasedProducts = orders
          .filter((order) => order.userId === customer.id)
          .reduce((acc, order) => {
            order.products.forEach((product) => {
              acc[product.productId] = (acc[product.productId] || 0) + product.qty;
            });
            return acc;
          }, {});
  
        // הפיכת הנתונים לרשימה עם שם המוצר והכמות
        const productsList = Object.entries(purchasedProducts).map(
          ([productId, qty]) => ({
            name: productsMap[productId] || "Unknown Product", // הוספת שם המוצר
            qty,
            id: productId 
          })
        );
  
        return {
          id: customer.id,
          name: customer.name,
          products: productsList,
        };
      });
  
      return customersWithProducts;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };