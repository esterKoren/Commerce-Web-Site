import { db } from "../../../firebase";
import { collection, addDoc ,doc,updateDoc,deleteDoc,query,where,getDocs} from "firebase/firestore";

 export const addCategory = async (categoryName) => {
  try {
    await addDoc(collection(db, "category"), { name: categoryName });
    console.log("Category added successfully");
  } catch (error) {
    console.error("Error adding category:", error);
  }
};


 export const updateCategory = async (categoryId, newName) => {
  try {
    const categoryRef = doc(db, "category", categoryId);
    await updateDoc(categoryRef, { name: newName });
    console.log("Category updated successfully");
  } catch (error) {
    console.error("Error updating category:", error);
  }
};


 export const deleteCategory = async (categoryId) => {
  try {
    // בדיקה אם יש מוצרים שמקושרים לקטגוריה הזו
    const productsRef = collection(db, "product");
    const q = query(productsRef, where("category", "==", categoryId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.error("Cannot delete category: It is assigned to products.");
      return;
    }

    // אם אין מוצרים שמקושרים לקטגוריה – מוחקים אותה
    const categoryRef = doc(db, "category", categoryId);
    await deleteDoc(categoryRef);
    console.log("Category deleted successfully");
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};
 export   const getCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "category"));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      return []; // מחזיר מערך ריק במקום undefined
    }
  };
  

