import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../userReducer.js";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const dispatch = useDispatch();
  let navigate=useNavigate

  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {dispatch(logout()),navigate('/')}}
      sx={{
        fontSize: "1rem",
        padding: "8px 16px",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          backgroundColor: "#d32f2f",
        },
      }}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
