const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null, // טעינת המשתמש מהאחסון
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "userIn":
      localStorage.setItem("user", JSON.stringify(action.payload)); // שמירה ב-localStorage
      return {
        ...state,
        currentUser: action.payload,
      };
    case "logout":
      localStorage.removeItem("user"); // מחיקת המשתמש מהאחסון
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export const userIn = (user) => ({
  type: "userIn",
  payload: user,
});

export const logout = () => ({
  type: "logout",
});

export default userReducer;
 