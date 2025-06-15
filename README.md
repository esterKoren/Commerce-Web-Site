# Commerce Web Site

A full-stack e-commerce web application built with React, Vite, Redux, Material UI, and Firebase. The project supports two user roles: admin and customer. Admins can manage products, categories, view statistics, and see customer orders. Customers can browse products, filter and search, manage their cart, place orders, and view their order history.

## Features
- User authentication (sign up, sign in, logout) with Firebase
- Admin dashboard for managing products, categories, and viewing statistics
- Customer dashboard for browsing products, filtering, searching, and managing orders
- Shopping cart with add, remove, and quantity adjustment
- Real-time statistics and charts for admins
- Responsive and modern UI with Material UI

## Technologies Used
- React 18
- Vite
- Redux
- Material UI (MUI)
- Firebase (Authentication & Firestore)
- React Router
- ESLint

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/esterKoren/Commerce-Web-Sit.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Commerce-Web-Sit
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure
- `src/`
  - `App.jsx` - Main app routes
  - `store.js` - Redux store
  - `firebase.js` - Firebase configuration
  - `componemet/` - All React components
    - `admin/` - Admin features (categories, products, statistics, customers)
    - `customers/` - Customer features (products, cart, orders, details)
    - `NavBar/` - Navigation bars for admin and user
    - `user/` - Authentication components
- `public/` - Static assets
- `index.html` - Main HTML file

## Author
- Developed by Ester Koren 

---

For any questions or issues, please open an issue on the repository.
