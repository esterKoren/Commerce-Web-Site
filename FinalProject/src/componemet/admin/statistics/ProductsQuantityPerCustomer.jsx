import React, { useState, useEffect } from "react";
import { getProductsQuantityPerCustomer } from "./statisticsApi";
import { Select, MenuItem } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

/**
 * קומפוננטה להצגת כמות המוצרים שנרכשו על ידי כל לקוח באמצעות תרשים עמודות.
 */
function ProductsQuantityPerCustomer() {
  // משתנה מצב לאחסון כל נתוני המוצרים לפי לקוח
  const [allProductsQuantityPerCustomer, setAllProductsQuantityPerCustomer] = useState([]);
  // משתנה מצב לאחסון רשימת הלקוחות לבחירה
  const [customers, setCustomers] = useState([]);
  // משתנה מצב לאחסון הנתונים של הלקוח הנבחר
  const [productsQuantityPerCustomer, setProductsQuantityPerCustomer] = useState([]);
  // משתנה מצב לאחסון הלקוח הנבחר כרגע
  const [currentCustomer, setCurrentCustomer] = useState({});

  /**
   * טוען את הנתונים מה-API בעת טעינת הקומפוננטה
   */
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductsQuantityPerCustomer();
      console.log("Data received:", data);
      // יצירת מערך של שמות לקוחות לבחירה
      const nameCustomers = data.map((item) => ({
        id: item.id,
        name: item.name,
      }));

      // עדכון המצב עם הנתונים שהתקבלו
      setAllProductsQuantityPerCustomer(data);
      setCustomers(nameCustomers);
      setCurrentCustomer(nameCustomers[0]); // הגדרת לקוח ברירת מחדל
    };

    fetchData();
  }, []);

  /**
   * פונקציה לקבלת הנתונים של הלקוח הנבחר ועדכון התרשים בהתאם
   */
  const handleCustomerChange = (event) => {
    const selectedCustomer = customers.find((customer) => customer.id === event.target.value);
    setCurrentCustomer(selectedCustomer);

    // חיפוש הנתונים של הלקוח הנבחר
    const data = allProductsQuantityPerCustomer.find((customer) => customer.id === selectedCustomer.id);

    // עיצוב הנתונים לתרשים
    if (data) {
      const formattedData = data.products.map((item, index) => ({
        id: item.id,
        name: item.name, // שם המוצר
        qty: item.qty, // כמות המוצרים שנרכשו
        color: getColor(index), // צבע לעמודה בתרשים
      }));

      setProductsQuantityPerCustomer(formattedData);
    }
  };

  /**
   * פונקציה להחזרת צבע עבור כל עמודת מוצר
   * @param {number} index - האינדקס של המוצר במערך
   * @returns {string} צבע בפורמט HEX או HSL
   */
  const getColor = (index) => {
    // מערך צבעים מוגדר מראש (לשימוש ראשוני)
    const predefinedColors = ["#FF4D4D", "#FFC107", "#FFD700", "#4CAF50", "#2196F3"];

    // אם האינדקס קטן ממספר הצבעים שהוגדרו מראש, נחזיר צבע מהמערך
    if (index < predefinedColors.length) {
      return predefinedColors[index];
    }

    // אם נגמרו הצבעים במערך, ניצור צבע דינמי
    const randomColor = `hsl(${(index * 137.5) % 360}, 70%, 50%)`;
    return randomColor;
  };

  return (
    <div>
      <h2>Products Quantity Per Customer</h2>

      {/* תפריט נפתח לבחירת לקוח */}
      <Select fullWidth value={currentCustomer?.id || ""} onChange={handleCustomerChange} sx={{ marginBottom: 2 }}>
        {customers.map((customer) => (
          <MenuItem key={customer.id} value={customer.id}>
            {customer.name}
          </MenuItem>
        ))}
      </Select>

      {/* תרשים עמודות להצגת כמות המוצרים שנרכשו לכל לקוח */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={productsQuantityPerCustomer}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="qty" fill="#8884d8">
            {productsQuantityPerCustomer.map((entry, index) => (
              <Bar key={`bar-${index}`} dataKey="qty" fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProductsQuantityPerCustomer;
