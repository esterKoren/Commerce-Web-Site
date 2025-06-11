import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { addUser } from "./userApi";//Addition function
import { login } from "./userApi"; // The login function

import { userIn } from "../../userReducer"; // The action that brings the user into Redux
import { useNavigate } from "react-router-dom";

function SignUp() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch();
  let navigate=useNavigate();
  // A function that generates a strong password
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
    setValue("password", newPassword, { shouldValidate: true }); // עדכון השדה והפעלת הוולידציה
  };

 
const save = async (data) => {
  try {
    const res = await addUser(data); // יצירת המשתמש ב-Firebase Authentication וב-Firestore
    const loggedInUser = await login(data.email, data.password); // חיבור המשתמש
    dispatch(userIn(loggedInUser)); // שמירת המשתמש ב-Redux
    console.log(res);
    alert("Successfully registered and logged in");
    navigate('/ProductForCustomer');

  } catch (err) {
    alert("Unable to register: " + err.message);
    console.log(err);
  }
};

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{ background: "white", padding: "30px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <form onSubmit={handleSubmit(save)} style={{ width: "300px" }}>
          <TextField
            label="First Name"
            type="text"
            {...register("firstName", { required: "Mandatory field" })}
            variant="outlined"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{ marginBottom: 2, width: "100%" }}
          />
          <TextField
            label="Last Name"
            type="text"
            {...register("lastName", { required: "Mandatory field" })}
            variant="outlined"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={{ marginBottom: 2, width: "100%" }}
          />
          <TextField
            label="User Name"
            type="text"
            {...register("userName", {
              required: "Mandatory field",
              minLength: { value: 3, message: "The name must be at least 3 characters" },
            })}
            variant="outlined"
            error={!!errors.userName}
            helperText={errors.userName?.message}
            sx={{ marginBottom: 2, width: "100%" }}
          />
          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: "Mandatory field",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "The email address is invalid",
              },
            })}
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ marginBottom: 2, width: "100%" }}
          />

          {/* שדה סיסמה עם אייקון של עין להסתיר ולהציג */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Mandatory field",
                minLength: { value: 6, message: "The password must be at least 6 characters long" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    field.onChange(e);
                  }}
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Button onClick={generatePassword} variant="contained" sx={{ backgroundColor: "#007bff", color: "white", fontWeight: "bold" }}>
              🔑
            </Button>
          </div>

          <FormControlLabel
            control={<Checkbox {...register("allowOthers")} color="primary" />}
            label="Allow others to see my order"
            sx={{ marginBottom: 2 }}
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" type="submit" sx={{ backgroundColor: "black", borderRadius: "20px", padding: "10px 20px" }}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
