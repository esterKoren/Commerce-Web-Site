import React, { useEffect, useState } from 'react';
import { getCategories } from "../category/categoryApi";
import { Card, CardContent, TextField, Select, MenuItem, Button, Typography, Divider, Box } from '@mui/material';
import Table from '../../../Table';

function ProductItemForAdmin({ product, update, remove, isAdding }) {
  const [categories, setCategories] = useState([]);
  const [editedProduct, setEditedProduct] = useState(product);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleDate = (date) => {
    if (!date) return "Unknown Date";
    const dateObject = new Date(date.seconds * 1000);
    return dateObject.toLocaleDateString();
  };

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    update(product.id, editedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  return (
    <Card sx={{ maxWidth: 700, margin: '20px auto', padding: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography 
          variant="h5" 
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2, color: '#1976d2' }}>
          {isEditing ? 'Edit Product' : 'Product Details'}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={editedProduct.title}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={editedProduct.price}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <TextField
            fullWidth
            label="Image URL"
            name="linkToImg"
            value={editedProduct.linkToImg}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Select
            fullWidth
            name="category"
            value={editedProduct.category}
            onChange={handleChange}
            disabled={!isEditing}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={3}
            value={editedProduct.description}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* הצגת טבלת הלקוחות שקנו את המוצר, רק אם מדובר במוצר קיים */}
        {!isAdding && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2, color: '#1976d2' }}>
              Bought By:
            </Typography>
            <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 2, boxShadow: 2, bgcolor: '#f9f9f9' }}>
              {Array.isArray(product.boughtBy) && product.boughtBy.length > 0 ? (
                <Table
                  titles={["Client Name", "Order Date", "Quantity"]}
                  contents={product.boughtBy.map(buyer => ({
                    clientName: buyer.clientName,
                    orderDate: handleDate(buyer.orderDate),
                    quantity: buyer.quantity
                  }))}
                />
              ) : (
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", padding: 2 }}>
                  No customers have purchased this product yet.
                </Typography>
              )}
            </Box>
          </>
        )}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {isEditing ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="outlined" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => remove(product.id)}>
                Delete
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductItemForAdmin;
