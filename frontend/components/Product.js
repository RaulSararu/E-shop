import { useState } from 'react';
import styles from '../styles/Product.module.css';

export default function Product({ product }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    const userId = 1; // Replace with actual user ID
    await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId: product.id, quantity }),
    });
  };

  return (
    <div className={styles.product}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}