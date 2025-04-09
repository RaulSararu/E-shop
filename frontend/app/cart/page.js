"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import CartItem from '../../components/CartItem';
import styles from '../../styles/Cart.module.css';

export default function Cart() {
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

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
    }
    const total = updatedCart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    setTotalPrice(total);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    updateCart(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map(product => 
      product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map(product => 
      product.id === productId ? { ...product, quantity: product.quantity - 1 } : product
    ).filter(product => product.quantity > 0);
    updateCart(updatedCart);
  };

  return (
    <div className={styles.container}>
      <Navbar cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
      <main className={styles.main}>
        <h1 className={styles.title}>Your Cart</h1>
        <div className={styles.cartItems}>
          {cart.map((product, index) => (
            <CartItem 
              key={`${product.id}-${index}`} 
              product={product} 
              onRemove={removeFromCart} 
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
            />
          ))}
        </div>
        <div className={styles.totalPrice}>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>
        <button onClick={() => router.push('/checkout')} className={styles.checkoutButton}>Proceed to Checkout</button>
      </main>
    </div>
  );
}