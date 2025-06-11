// import { v4 as uuidv4 } from 'uuid';

// const initialState = {
//   products: [],
 
// };

// const productsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOAD': {
//       return { ...state, products: action.payload };
//     }

//     case 'ADD': {
//       return {
//         ...state,
//         cars: [...state.products, { id: uuidv4(), ...action.payload }],
//       };
//     }

//     case 'DELETE': {
//       const NProducts = [...state.products];
//       const index = NProducts.findIndex((car) => car.id === action.payload);

//       if (index !== -1) {
//         if (NProducts[index].status === 'UNCHANGED') {
//           NProducts[index].status = 'DELETED';
//         } else { // status === 'NEW'
//           NProducts.splice(index, 1);
//         }
//       }

//       return { ...state, NProducts };
//     }

//     default:
//       return state;
//   }
// };

// export default productsReducer;