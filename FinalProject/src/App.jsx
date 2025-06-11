


import { Route, Routes } from 'react-router-dom'
import SignIn from './componemet/user/SignIn'
import SignUp from './componemet/user/SignUp'
import CategoryList from './componemet/admin/category/CategoryList.jsx'
import ProductListForAdmin from './componemet/admin/productForAdmin/ProductListForAdmin'
import CustomersAndTheirOrders from './componemet/admin/customers/customersAndTheirOrders.jsx'
import AllStatistics from "./componemet/admin/statistics/AllStatistics.jsx"
import Products from "./componemet/customers/products/ProductsList"
import CustomerOrders from "./componemet/customers/customerOrders/customerOrders.jsx"
import CustomerDetails from './componemet/customers/CustomerDetails/CustomerDetails.jsx'

function App() {
 

  return (
   <>
   <Routes>
    <Route path='/' element={<SignIn/>}/> 
    <Route path='/signUp' element={<SignUp/>}/> 
    <Route path='/categories' element={<CategoryList/>}/>   
    <Route path='/productsForAdmin' element={<ProductListForAdmin/>}/> 
    <Route path='/customers' element={<CustomersAndTheirOrders/>}/> 
    <Route path='/statitistic' element={<AllStatistics/>}/> 
    <Route path='/ProductForCustomer' element={<Products/>}/> 
    <Route path='/CustomerOrders' element={<CustomerOrders/>}/> 
    <Route path='/CustomerDetails' element={<CustomerDetails/>}/> 
   
   </Routes>
   </>
  )
}

export default App
