import React, { useState } from 'react';
import { Typography, IconButton, Box, Paper } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon, ArrowBackIos as ArrowIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, reductionProduct, deleteProduct } from "../../carReducer";

function Cart() {
    const productsInShoppingBasket = useSelector((state) => state.car.basket);
    const [isClosed, setIsClosed] = useState(true);
    const dispatch = useDispatch();

    return (
        <Paper sx={{ width: isClosed ? 80 : 300, padding: 2, position: 'relative', backgroundColor: isClosed ? 'grey.300' : 'white' }}>
            <IconButton onClick={() => setIsClosed(!isClosed)} sx={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)' }}>
                <ArrowIcon sx={{ transform: isClosed ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </IconButton>
            {isClosed ? (
                <Typography variant="h6">Close Cart</Typography>
            ) : (
                <Box>
                    <Typography variant="h6">Open Cart</Typography>
                    {productsInShoppingBasket.map((product) => (
                        <Box key={product.id} display="flex" alignItems="center" justifyContent="space-between" my={1}>
                            <Typography variant="body1">{product.name} -</Typography>
                            <IconButton size="small" color="primary" onClick={() => dispatch(reductionProduct(product))}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ mx: 1 }}>{product.amount}</Typography>
                            <IconButton size="small" color="primary" onClick={() => dispatch(addProduct(product))}>
                                <AddIcon />
                            </IconButton>
                            <IconButton size="small" color="secondary" onClick={() => dispatch(deleteProduct(product))}>
                                <RemoveIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}
        </Paper>
    );
}

export default Cart;
