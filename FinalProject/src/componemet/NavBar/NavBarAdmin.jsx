import React from 'react'
import { Link } from "react-router-dom";
import LogoutButton from "../user/Logout";

import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function NavBarAdmin() {
  return (
    <div><AppBar position="fixed" sx={{ backgroundColor: "gray", zIndex: 1000 }}>
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      {/* שם המשתמש */}
      <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
        Hi Admin
      </Typography>

      {/* קישורים */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link to="/categories" style={linkStyle}>
          Categories
        </Link>
        <Link to="/productsForAdmin" style={linkStyle}>
         products
        </Link>
        <Link to="/customers" style={linkStyle}>
          customers
        </Link>
        <Link to="/statitistic" style={linkStyle}>
          statistics
        </Link>
      </Box>

      {/* כפתור התנתקות */}
      <LogoutButton />
    </Toolbar>
  </AppBar></div>
  )
}
// עיצוב לקישורים
const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
  };
  

export default NavBarAdmin