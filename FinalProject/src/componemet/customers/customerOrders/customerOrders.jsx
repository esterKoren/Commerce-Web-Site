import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../../Table';
import { getCustomerOrders } from './customerApiOrders.js';
import NavBarUser from '../../NavBar/NavBarUser.jsx'

function CustomerOrders() {
    const id = useSelector((state) => state.currentUser?.id); // הוספת בדיקה שהמשתמש קיים
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!id) return; // אם אין משתמש מחובר, לא לבצע את הקריאה

        const fetchOrders = async () => {
            const data = await getCustomerOrders(id);
            setOrders(data);
        };

        fetchOrders();
    }, [id]);

    return (
        <span>
            <NavBarUser/>
        
        <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
            <h3 style={{ textAlign: 'center', color: '#1976d2' }}>My Orders</h3>
            <Table
                titles={["Title", "Qty", "Total", "Date"]}
                contents={orders.map(order => ({
                    nameProduct: order.nameProduct,
                    qty: order.qty,
                    total: order.total,
                    date: order.date
                }))}
            />
        </div>
        </span>
    );
}

export default CustomerOrders;
