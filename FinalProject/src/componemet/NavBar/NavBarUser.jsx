import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../user/Logout";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function NavBarUser() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976d2", zIndex: 1000 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* שם המשתמש */}
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
          Hi, {currentUser?.userName || "Guest"}
        </Typography>

        {/* קישורים */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link to="/ProductForCustomer" style={linkStyle}>
            Products
          </Link>
          <Link to="/CustomerOrders" style={linkStyle}>
            My Orders
          </Link>
          <Link to="/sofas" style={linkStyle}>
            My Account
          </Link>
        </Box>

        {/* כפתור התנתקות */}
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}

// עיצוב לקישורים
const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
};

export default NavBarUser;
