import React, { useEffect, useState } from "react";
import { getCategories, updateCategory, deleteCategory, addCategory } from "./categoryApi";
import CategoryItem from "./CategoryItem";
import { Paper, List, TextField, Button, Box } from "@mui/material";
import NavBarAdmin from "../../NavBar/NavBarAdmin";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      await addCategory(newCategory);
      setNewCategory("");
      setCategories(await getCategories());
    }
  };

  const handleUpdateCategory = async (id, newName) => {
    await updateCategory(id, newName);
    setCategories(await getCategories());
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    setCategories(await getCategories());
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // גובה מינימלי של הדף יהיה 100% מהגובה של הדפדפן
        backgroundColor: "#f4f4f4", // צבע רקע לדף אם רוצים
      }}
    >
      <div>
        <NavBarAdmin />
        <Paper sx={{ padding: 3, maxWidth: 400, width: "100%", marginTop: 5 }}>
          <List>
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                update={handleUpdateCategory}
                remove={handleDeleteCategory}
              />
            ))}
          </List>
          <TextField
            fullWidth
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button fullWidth variant="contained" onClick={handleAddCategory} sx={{ marginTop: 2 }}>
            Add
          </Button>
        </Paper>
      </div>
    </Box>
  );
}

export default CategoryList;
