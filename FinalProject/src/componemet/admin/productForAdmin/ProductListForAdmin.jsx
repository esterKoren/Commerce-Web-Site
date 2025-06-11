import React, { useEffect, useState } from 'react';
import { getDataProductsForAdmin, addProduct, updataProduct, deleteProduct } from './productForAdminApi';
import ProductItemForAdmin from "./ProductItemForAdmin"
import { Button } from '@mui/material';
import NavBarAdmin from '../../NavBar/NavBarAdmin';

function ProductListForAdmin() {
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);  // מצב של הוספת מוצר חדש
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    linkToImg: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getDataProductsForAdmin();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    await addProduct(newProduct);
    setProducts(await getDataProductsForAdmin());
    setIsAdding(false);  // אחרי ההוספה נחזור למצב הרגיל
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    await updataProduct(id, updatedProduct);
    setProducts(await getDataProductsForAdmin());
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts(await getDataProductsForAdmin());
  };

  const handleCancelAdd = () => {
    setIsAdding(false);  // אם החלטת לא להוסיף, נחזור למצב הרגיל
  };

  return (
    <div>
      <NavBarAdmin/>

      {!isAdding ? (
        <>
          {products.map((product) => (
            <ProductItemForAdmin 
              key={product.id} 
              product={product} 
              update={handleUpdateProduct} 
              remove={handleDeleteProduct} 
            />
          ))}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setIsAdding(true)} 
            sx={{ marginTop: 2 }}>
            Add New Product
          </Button>
        </>
      ) : (
        <>
          {/* כאן אנחנו מציגים את טופס ההוספה של המוצר החדש */}
          <ProductItemForAdmin 
            product={newProduct} 
            update={handleUpdateProduct} 
            remove={handleDeleteProduct} 
          />
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleCancelAdd} 
            sx={{ marginTop: 2 }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddProduct} 
            sx={{ marginTop: 2 }}>
            Save
          </Button>
        </>
      )}
    </div>
  );
}

export default ProductListForAdmin;
