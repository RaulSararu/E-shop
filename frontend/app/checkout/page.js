"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Checkout.module.css';

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
        
        // Încărcăm coșul utilizatorului din localStorage
        const storedCart = JSON.parse(localStorage.getItem(`cart_${userData.email}`)) || [];
        setCart(storedCart);
        const total = storedCart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        setTotalPrice(total);
      }
    }
  }, [router]);

  const handlePlaceOrder = () => {
    if (user) {
      // Salvăm comanda în istoricul utilizatorului
      const orders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
      const newOrder = {
        id: Date.now(),
        items: cart,
        total: totalPrice,
        date: new Date().toISOString()
      };
      orders.push(newOrder);
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(orders));

      // Golește coșul
      setCart([]);
      localStorage.setItem(`cart_${user.email}`, JSON.stringify([]));

      alert('Order placed successfully!');
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <Navbar cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
      <main className={styles.main}>
        <h1 className={styles.title}>Checkout</h1>
        <div className={styles.cartItems}>
          {cart.map((product, index) => (
            <div key={`${product.id}-${index}`} className={styles.cartItem}>
              <img src={product.image} alt={product.title} className={styles.cartItemImage} />
              <div className={styles.cartItemDetails}>
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.totalPrice}>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>
        <button onClick={handlePlaceOrder} className={styles.placeOrderButton}>Place Order</button>
      </main>
    </div>
  );
}