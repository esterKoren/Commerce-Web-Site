import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { getInformationOnTheQuantityOfProductsPurchasedForEachProduct } from "./statisticsApi.js";

/**
 * קומפוננטה להצגת מידע על כמות המוצרים שנרכשו מכל מוצר באמצעות תרשים עוגה.
 */
function InformationOnTheQuantityOfProductsPurchasedForEachProduct() {
  // משתנה מצב לאחסון הנתונים המפורמטים עבור תרשים העוגה
  const [chartData, setChartData] = useState([]);

  /**
   * טוען את הנתונים מה-API בעת טעינת הקומפוננטה.
   */
  useEffect(() => {
    const fetchData = async () => {
      const data = await getInformationOnTheQuantityOfProductsPurchasedForEachProduct();

      // המרת הנתונים למבנה המתאים לתרשים עוגה
      const formattedData = data.map((item, index) => ({
        id: item.products.id, // מזהה ייחודי לכל מוצר
        value: item.products.quantityPurchased, // כמות המוצרים שנרכשו
        label: item.products.productName, // שם המוצר
        color: getColor(index), // צבע לכל פרוסה בעוגה
      }));

      setChartData(formattedData);
    };

    fetchData();
  }, []);

  /**
   * פונקציה להחזרת צבע עבור כל פרוסה בתרשים העוגה.
   * @param {number} index - האינדקס של הפריט במערך
   * @returns {string} צבע בפורמט HEX או HSL
   */
  const getColor = (index) => {
    // מערך צבעים קבוע מראש
    const predefinedColors = ["#FF5733", "#FFC300", "#36A2EB", "#4CAF50", "#8E44AD", "#E74C3C"];

    // אם יש צבע במערך, נשתמש בו
    if (index < predefinedColors.length) {
      return predefinedColors[index];
    }

    // יצירת צבע דינמי במקרה שהמערך נגמר
    return `hsl(${(index * 137.5) % 360}, 70%, 50%)`;
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Total Sold Products
        </Typography>

        {/* הצגת תרשים עוגה במרכז */}
        <Box display="flex" justifyContent="center">
          <PieChart
            series={[
              {
                data: chartData,
                innerRadius: 30, // התאמה ויזואלית
                outerRadius: 100, // התאמה ויזואלית
                cx: "50%", // מיקום בציר X
                cy: "50%", // מיקום בציר Y
              },
            ]}
            width={400}
            height={300}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default InformationOnTheQuantityOfProductsPurchasedForEachProduct;
