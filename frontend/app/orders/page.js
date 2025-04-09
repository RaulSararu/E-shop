"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Orders.module.css';

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
        
        // Încărcăm comenzile utilizatorului din localStorage
        const storedOrders = JSON.parse(localStorage.getItem(`orders_${userData.email}`)) || [];
        setOrders(storedOrders);
      }
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Navbar cartItemCount={0} />
      <main className={styles.main}>
        <h1 className={styles.title}>Order History</h1>
        <div className={styles.orders}>
          {orders.map((order) => (
            <div key={order.id} className={styles.order}>
              <h3>Order ID: {order.id}</h3>
              <p>Date: {new Date(order.date).toLocaleString()}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <div className={styles.orderItems}>
                {order.items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className={styles.orderItem}>
                    <img src={item.image} alt={item.title} className={styles.orderItemImage} />
                    <div className={styles.orderItemDetails}>
                      <h4>{item.title}</h4>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}