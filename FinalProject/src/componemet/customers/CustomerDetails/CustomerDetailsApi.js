import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const getCustomerDetails = async (id) => {
  try {
    const userRef = doc(db, "user", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("User not found");
      return null;
    }

    const userData = userSnap.data();
    return {
      id: userSnap.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: userData.userName,
      password: userData.password,
      email: userData.email,
      allow: userData.allow,
    };
  } catch (error) {
    console.error("Error fetching customer details:", error);
    return null;
  }
};

export const updateCustomerDetails = async (customerId, newCustomer) => {
  try {
    const userRef = doc(db, "user", customerId);
    await updateDoc(userRef, newCustomer);
    console.log("Customer updated successfully");
  } catch (error) {
    console.error("Error updating customer:", error);
  }
};
