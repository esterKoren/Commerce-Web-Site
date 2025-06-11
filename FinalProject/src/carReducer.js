const initialState = {
  basket: [],
  details: {}
};

const productsReducer = (state = initialState, action) => {
switch (action.type) {

  case 'ADD': { // הוספת מוצר לסל
      let updateBasket = [...state.basket];
      let index = updateBasket.findIndex((product) => product.id === action.payload.id);

      if (index !== -1) {
          updateBasket[index] = { ...updateBasket[index], amount: updateBasket[index].amount + 1 ,total:updateBasket[index].total+action.payload.price};
      } else {
          let newProduct = { ...action.payload, qty: 1 };
          updateBasket.push(newProduct);
      }

      return {
          ...state,
          basket: updateBasket // תיקון התחביר
      };
  }

  case 'REDUCTION': { // הפחתת כמות מהמוצר בסל
      let updateBasket = [...state.basket];
      let index = updateBasket.findIndex((product) => product.id === action.payload.id);

      if (index !== -1) {
          if (updateBasket[index].qty > 1) {
              updateBasket[index] = { ...updateBasket[index], amount: updateBasket[index].qty - 1 ,total:updateBasket[index].total-action.payload.price};
          } else {
              updateBasket = updateBasket.filter((product) => product.id !== action.payload.id);
          }
      }

      return {
          ...state,
          basket: updateBasket
      };
  }

  case 'DELETE': { // מחיקת מוצר מהסל
      let updateBasket = state.basket.filter((product) => product.id !== action.payload.id);

      return {
          ...state,
          basket: updateBasket
      };
  }

  default:
    return state;
}
};

// פעולות
export const addProduct = (product) => ({
type: "ADD",
payload: product,
});

export const reductionProduct = (product) => ({
type: "REDUCTION",
payload: product,
});

export const deleteProduct = (product) => ({
type: "DELETE",
payload: product,
});

export default productsReducer;
