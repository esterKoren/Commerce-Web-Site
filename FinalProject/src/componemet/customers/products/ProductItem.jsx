import React from 'react';
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from 'react-redux';
import {addProduct,reductionProduct}from "../../../carReducer.js"

function ProductItem({ product }) {
  const dispatch=useDispatch();
  return (
    <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2, width: 250, borderRadius: 3, boxShadow: 3 }}>
      <img src={product.image} alt={product.name} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 8 }} />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">{product.description}</Typography>
        <Typography variant="body1" fontWeight="bold">Price: ${product.price}</Typography>
        <Typography variant="body2">In stock: {product.inStock}</Typography>
        <Typography variant="body2">Bought: {product.bought}</Typography>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <IconButton size="small" color="primary" onClick={()=>dispatch(addProduct(product))}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1 }}>0</Typography>
          <IconButton size="small" color="primary" onClick={()=>dispatch(reductionProduct(product))}>
            <AddIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
    
  );
}

export default ProductItem;
