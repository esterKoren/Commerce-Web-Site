import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase";

export const getDataProductsForAdmin = async () => {
    try {
        // שליפת קטגוריות
        const categorySnapshot = await getDocs(collection(db, "category"));
        console.log("Raw categories snapshot:", categorySnapshot.docs.map(doc => doc.data()));
        const categories = categorySnapshot.docs.reduce((acc, doc) => { 
            console.log("Category ID:", doc.id, "Category Name:", doc.data().name);    
            acc[doc.id] = doc.data().name;
            return acc;
        }, {});
        console.log("Categories Map:", categories);

        // שליפת לקוחות
        const clientsSnapshot = await getDocs(collection(db, "user"));
        const clients = clientsSnapshot.docs.reduce((acc, doc) => {
            acc[doc.id] = doc.data().firstName;
            return acc;
        }, {});
        console.log("Clients Map:", clients);

        // שליפת הזמנות
        const ordersSnapshot = await getDocs(collection(db, "order"));
        const orders = ordersSnapshot.docs.map((doc) => ({
            id: doc.id,
            name: clients[doc.data().userId] || "Unknown",
            orderDate: doc.data().orderDate,
            products: doc.data().products.map((product) => ({
                productId: product.prodId,
                qty: product.amount,
            })),
        }));
        console.log("Orders Array:", orders);

        // שליפת מוצרים
        const productsSnapshot = await getDocs(collection(db, "product"));
        const products = productsSnapshot.docs.map((doc) => {
            const productData = doc.data();

            // בדיקת קטגוריה
            const categoryId = productData.category; // מזהה הקטגוריה
            console.log(`Product ${doc.id} Category ID:`, categoryId);
            
            // מציאת כל הלקוחות שקנו את המוצר
            const boughtBy = orders
                .filter((order) => order.products.some((product) => product.productId === doc.id))
                .map((order) => ({
                    clientName: order.name,
                    orderDate: order.orderDate,
                    quantity: order.products.find((product) => product.productId === doc.id)?.qty || 0
                }));

            console.log(`Product ${doc.id} BoughtBy:`, boughtBy);

            return {
                id: doc.id,
                title: productData.productName2,
                price: productData.price,
                linkToImg: `images/${productData.img1}`,
                category: categories[categoryId] || "Unknown",
                description: productData.description || "No description",
                boughtBy: boughtBy
            };
        });

        console.log("Final products array:", products);
        return products;

    } catch (error) {
        console.error("Error fetching products data:", error);
        return [];
    }
};
export const addProduct = async (product) => {
    try {
        await addDoc(collection(db, "product"), product);
        console.log("Product added successfully");
    } catch (error) {
        console.error("Error adding product:", error);
    }
};


export const updataProduct=async(productId,newProduct)=>{
try{
    const productRef= doc(db,"product",productId);
    await updateDoc(productRef,newProduct);
      console.log("product updated successfully");
}
catch(error){
    console.error("Error updating product:", error);

}
}
export const deleteProduct=async(productId)=>{
    try{
          const productRef = doc(db, "product", productId);
          await deleteDoc(productRef);
          console.log("product deleted successfully");
    }
    catch(error){
        console.error("Error deleting product:", error);

    }
}