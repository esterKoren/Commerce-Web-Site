import React, { useState, useEffect } from "react";
import { getDataCustomersWithTheirOrders } from "./customersAndTheirOrdersApi.js";
import Table from "../../../Table.jsx";
import NavBarAdmin from "../../NavBar/NavBarAdmin.jsx";

function CustomersAndTheirOrders() {
  const [customersAndTheirOrders, setCustomersAndTheirOrders] = useState([]);
  const [titles, setTitles] = useState(["Full Name", "Joined At", "Products Bought"]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      const date = timestamp.toDate();
      return date.toLocaleDateString();
    } else if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString();
    }
    return "-"; // במקרה שאין תאריך או שהוא לא תקין
  };

  useEffect(() => {
    const fetchCustomersAndTheirOrders = async () => {
      const data = await getDataCustomersWithTheirOrders();
      console.log("Fetched customers and their orders:", data); // בדיקה אם הנתונים מתקבלים
      setCustomersAndTheirOrders(data);
      setIsLoading(false);
    };
    fetchCustomersAndTheirOrders();
  }, []);
  
  return (
    
    <div style={styles.pageContainer}>
      <NavBarAdmin />
      <div style={styles.contentContainer}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          
          customersAndTheirOrders.map((customer) => (
            <Table
  key={customer.id}
  titles={titles}
  contents={[
    {
      "Full Name": customer.fullName,
      "Joined At": formatDate(customer.joinDate),
      "Products Bought":
        customer.orders.length > 0 ? (
          <Table
            key={`nested-table-${customer.id}`}
            titles={["Product", "Qty", "Date"]}
            contents={customer.orders
              .map((order) =>
                order.products.map((product) => ({
                  Product: product.productName,
                  Qty: product.quantity,
                  Date: formatDate(order.orderDate),
                }))
              )
              .flat()}
          />
        ) : (
          "No orders"
        ),
    },
  ]}
/>

          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: "20px",
    width: "100%",
    boxSizing: "border-box",
  },
};

export default CustomersAndTheirOrders;
