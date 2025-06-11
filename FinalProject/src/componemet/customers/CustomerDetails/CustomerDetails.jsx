import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCustomerDetails, updateCustomerDetails } from "./CustomerDetailsApi";
import NavBarUser from "../../NavBar/NavBarUser";
import { Card, CardContent, Typography, TextField, FormControlLabel, Button } from "@mui/material";

function CustomerDetails() {
  const [customer, setCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editeCustomer, setEditeCustomer] = useState(null);
  
  const id = useSelector((state) => state.user.currentUser?.id);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;
      const data = await getCustomerDetails(id);
      setCustomer(data);
      setEditeCustomer(data);
    };
    fetchCustomer();
  }, [id]); // הוספת תלות ב-id כדי להפעיל מחדש אם הוא משתנה

  if (!customer) return <Typography>Loading...</Typography>;

  const handleChange = (e) => {
    setEditeCustomer({ ...editeCustomer, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateCustomerDetails(id, editeCustomer);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditeCustomer(customer); // מחזירים לערכים המקוריים
    setIsEditing(false);
  };

  return (
    <>
      <NavBarUser />
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh", 
        paddingTop: "60px" // כדי לא להחפוף עם ה-NavBar
      }}>
        <Card sx={{ maxWidth: 500, padding: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">{isEditing ? "Edit Customer" : "Customer Details"}</Typography>

            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={editeCustomer?.firstName || ""}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={editeCustomer?.lastName || ""}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label="Username"
              name="userName"
              value={editeCustomer?.userName || ""}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={editeCustomer?.email || ""}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={editeCustomer?.password || ""}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              disabled={!isEditing}
            />

            {isEditing ? (
              <>
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: 1 }}>
                  Save
                </Button>
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" onClick={() => setIsEditing(true)} sx={{ marginTop: 2, marginRight: 1 }}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => console.log("Delete customer")} sx={{ marginTop: 2 }}>
                  Delete
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CustomerDetails;
