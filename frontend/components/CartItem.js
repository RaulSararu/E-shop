import React from 'react';
import styles from '../styles/CartItem.module.css';

export default function CartItem({ product, onRemove, onIncrease, onDecrease }) {
  return (
    <div className={styles.cartItem}>
      <img src={product.image} alt={product.title} className={styles.cartItemImage} />
      <div className={styles.cartItemDetails}>
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <div className={styles.quantityButtons}>
          <button onClick={() => onDecrease(product.id)} className={styles.quantityButton}>-</button>
          <button onClick={() => onIncrease(product.id)} className={styles.quantityButton}>+</button>
        </div>
        <button onClick={() => onRemove(product.id)} className={styles.removeButton}>Remove</button>
      </div>
    </div>
  );
}