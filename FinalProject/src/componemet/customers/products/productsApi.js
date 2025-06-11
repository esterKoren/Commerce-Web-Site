import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export const getProducts = async (filtering) => {
  // שאילתה לשליפה רק משתמשים עם הרשאה
  const userQuery = query(collection(db, "user"), where("allowOthers", "==", true));
  const userWithAllow = await getDocs(userQuery);
  
  // חילוץ כל ה-userIds מתוך התוצאות
  const allowedUserIds = userWithAllow.docs.map((doc) => doc.id);
  
  // שליפת ההזמנות שבהן ה-userId שייך למשתמשים המורשים
  const ordersQuery = query(
    collection(db, "orders"),
    where("userId", "in", allowedUserIds) // הסינון כאן מבצע את החיפוש רק לפי ה-userIdים המורשים
  );
  const ordersSnapshot = await getDocs(ordersQuery);
  
  // חילוץ ההזמנות
  const orders = ordersSnapshot.docs.flatMap((doc) => {
    const order = doc.data();
    return order.products.map((product) => ({
      customerId: order.id,
      productId: product.id,
      qty: product.amount,
    }));
  });

  // שליפת המוצרים
  const productSnapshot = await getDocs(collection(db, "product"));
  
  let products = productSnapshot.docs.map((doc) => {
    // חישוב כמות המוצרים שנרכשו
    const bought = orders
      .filter((order) => order.productId === doc.id)
      .reduce((acc, order) => acc + order.qty, 0);
      
    return {
      id: doc.id,
      categoryId: doc.data().category,
      name: doc.data().productName2, // אם השם של המוצר הוא productName2
      title:doc.data().productName,
      price: doc.data().price,
      inStock: doc.data().amount,
      description: doc.data().description,
      bought: bought,  // כמות שנרכשה
    };
  });

  // סינון לפי קטגוריה אם יש
  if (filtering.category.categoryId !== "") {
    products = products.filter((product) => product.categoryId === filtering.category.categoryId);
  }

  // סינון לפי מחיר
  if (filtering.price !== 0) {
    products = products.filter((product) => product.price <= filtering.price);
  }

  // סינון לפי שם המוצר
  if (filtering.title !== "") {
    products = products.filter((product) => product.title === filtering.title);
  }

  return products;
};
