import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export const getCustomerOrders = async (customerId) => {
  try {
    // שליפת כל המוצרים כדי למפות מזהה מוצר -> שם מוצר
    const productSnapshot = await getDocs(collection(db, "products"));
    const products = productSnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data().productName2; // הנחה שהשם נמצא כאן
      return acc;
    }, {});

    // שאילתה לשליפת רק ההזמנות של המשתמש הנוכחי
    const orderQuery = query(collection(db, "order"), where("userId", "==", customerId));
    const orderSnapshot = await getDocs(orderQuery);

    // פריסת כל המוצרים מתוך ההזמנות לשורות בטבלה
    const formattedOrders = orderSnapshot.docs.flatMap((doc) => {
      const order = doc.data();
      return order.products.map((product) => ({
        nameProduct: products[product.prodId] || "Unknown Product",
        qty: product.amount,
        total: `$${product.total.toFixed(2)}`, // הוספת שני מקומות עשרוניים
        date: new Date(order.orderDate).toLocaleDateString(),
      }));
    });

    return formattedOrders;
  } catch (error) {
    console.error("❌ Error fetching orders data:", error);
    return [];
  }
};
