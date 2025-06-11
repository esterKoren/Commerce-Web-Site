import React, { useState } from "react";
import { TextField, Button, IconButton, ListItem, Typography } from "@mui/material";
import { Edit, Delete, Save } from "@mui/icons-material";

function CategoryItem({ category, update, remove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(category.name);

  return (
    <ListItem sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {isEditing ? (
        <TextField size="small" value={newName} onChange={(e) => setNewName(e.target.value)} />
      ) : (
        <Typography>{category.name}</Typography>
      )}
      <div>
        {isEditing ? (
          <IconButton onClick={() => { update(category.id, newName); setIsEditing(!isEditing); }}>
            <Save />
          </IconButton>
        ) : (
          <IconButton onClick={() => setIsEditing(!isEditing)}>
            <Edit />
          </IconButton>
        )}
        <IconButton onClick={() => remove(category.id)}>
          <Delete />
        </IconButton>
      </div>
    </ListItem>
  );
}

export default CategoryItem;