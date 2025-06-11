import React from "react";

import { Box } from "@mui/material";
import InformationOnTheQuantityOfProductsPurchasedForEachProduct from "./InformationOnTheQuantityOfProductsPurchasedForEachProduct ";
import NavBarAdmin from "../../NavBar/NavBarAdmin";
// import ProductsQuantityPerCustomer from "./ProductsQuantityPerCustomer";

function AllStatistics() {
  return (
    <span>
    <NavBarAdmin/>
    <Box sx={{ maxHeight: "80vh", overflow: "auto", p: 2 }}>
     <InformationOnTheQuantityOfProductsPurchasedForEachProduct/>
     {/* <ProductsQuantityPerCustomer/> */}
     
    </Box>
    </span>
  );
}

export default AllStatistics;
