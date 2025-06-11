import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function Table({ titles, contents }) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", marginTop: 4, boxShadow: 3 }}>
      <MuiTable>
        {/* כותרות הטבלה */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#FF6F61" }}> {/* צבע אדום בהיר */}
            {titles.map((title, index) => (
              <TableCell
                key={index}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "10px", // הוספתי padding לטבלה
                }}
              >
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/* תוכן הטבלה */}
        <TableBody>
          {contents.map((content, rowIndex) => (
            <TableRow key={rowIndex} hover>
              {Object.values(content).map((value, colIndex) => (
                <TableCell
                  key={colIndex}
                  sx={{
                    textAlign: "center",
                    verticalAlign: "top",
                    padding: "10px", // הוספתי padding לטבלה
                    border: "1px solid #ddd", // גבולות רכים בין התאים
                  }}
                >
                  {/* הצגת התוכן ישירות */}
                  {value || "-"} {/* אם הערך לא קיים, הצג "-" */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
