import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "./userApi"; // The login function
import { userIn } from "../../userReducer"; //The action that brings the user into Redux
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  let navigate=useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const save = async (data) => {
    try {
      console.log(data.email, data.password);
      const user = await login(data.email, data.password); // התחברות
      dispatch(userIn(user)); // שמירת המשתמש ב-Redux
      console.log("User Role:", user.role);
      // בדוק אם המשתמש הוא מנהל או לקוח (תלוי במידע שמתקבל מה-API שלך)
      if (user.role === 'admin') {
        navigate('/categories'); // אם הוא מנהל, שלח אותו לדף הניהול
      } else {
        navigate('/ProductForCustomer'); // אם הוא לקוח, שלח אותו לדף הבית של הלקוח
      }
  
    } catch (err) {
      console.log("Login error: " + err.message);
    }
  };
  

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(save)} style={styles.form}>
        <h2 style={styles.title}>Sign In</h2>
        <TextField
          label="Email"
          type="email"
          {...register("email", { required: "Mandatory field" })}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password", { required: "Mandatory field" })}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit" style={styles.button}>
          Login
        </Button>
        <div style={styles.linkContainer}>
          <span>
            New user? <Link to={'signUp'} style={styles.link}>Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "320px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  button: {
    backgroundColor: "black",
    color: "white",
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
  },
  linkContainer: {
    marginTop: "15px",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default SignIn;