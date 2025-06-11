import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

export const getDataCustomersWithTheirOrders = async () => {
  try {
    // שלב 1: שליפת כל המוצרים
    const productsSnapshot = await getDocs(collection(db, "product"));
    const productsName = productsSnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data().productName; // שמירת שם המוצר לפי ID
      return acc;
    }, {});

    // שלב 2: שליפת כל ההזמנות
    const ordersSnapshot = await getDocs(collection(db, "order"));
    const orders = ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      clientId: doc.data().userId,
      orderDate: doc.data().orderDate,
      products: doc.data().products.map((product) => ({
        productName: productsName[product.prodId] || "Unknown Product", // טיפול במקרה שהמוצר לא נמצא
        quantity: product.amount,
      })),
    }));

    // שלב 3: שליפת כל הלקוחות עם fullName
    const clientsSnapshot = await getDocs(collection(db, "user"));
    const clients = clientsSnapshot.docs.map((doc) => {
      const clientOrders = orders.filter((order) => order.clientId === doc.id);

      return {
        id: doc.id,
        fullName: `${doc.data().firstName || "Unknown"} ${doc.data().lastName || "Unknown"}`, // טיפול במקרה שהנתונים חסרים
        joinDate: doc.data().joinDate || "Unknown Date", // טיפול במקרה שאין תאריך הצטרפות
        orders: clientOrders.map((order) => ({
          orderDate: order.orderDate,
          products: order.products,
        })),
      };
    });

    console.log( clients);
    return clients;
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    return [];
  }
};
