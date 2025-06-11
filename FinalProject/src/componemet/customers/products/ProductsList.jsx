import React, { useEffect, useState } from "react";
import { getProducts } from "./productsApi";
import { getCategories } from "../../admin/category/categoryApi";
import ProductItem from "./ProductItem";
import { Select, MenuItem, Slider, TextField, Button, Box } from "@mui/material";
import Cart from "../Car";
import NavBarUser from "../../NavBar/NavBarUser"

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtering, setFiltering] = useState({ categoryId: "", price: 0, title: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(filtering);
      setProducts(data);
    };

    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories([...data, { name: "All", id: "" }]);
    };

    fetchProducts();
    fetchCategories();
  }, [filtering]);

  const handleChange = (e) => {
    setFiltering({ ...filtering, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (event, newValue) => {
    setFiltering({ ...filtering, price: newValue });
  };

  const handleClear = () => {
    setFiltering({ categoryId: "", price: 0, title: "" });
  };

  return (
    <span>
      <NavBarUser/>
    <Box display="flex">
      <Box flex={1}>
        <Box display="flex" alignItems="center" gap={2}>
          <Select fullWidth name="categoryId" value={filtering.categoryId} onChange={handleChange}>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          <Slider
            value={filtering.price}
            onChange={handlePriceChange}
            min={0}
            max={200}
            step={1}
            valueLabelDisplay="auto"
          />
          <TextField name="title" value={filtering.title} onChange={handleChange} placeholder="Title" />
          <Button onClick={handleClear}>Clear</Button>
        </Box>
        <Box>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Box>
      </Box>
      <Cart />
    </Box>
    </span>
  );
}

export default Products;