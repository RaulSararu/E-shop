"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
      const storedCart = JSON.parse(localStorage.getItem(`cart_${JSON.parse(userData).email}`)) || [];
      setCart(storedCart);
    }
  }, [router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=20');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterProducts(e.target.value, sortOrder, category);
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
    filterProducts(searchTerm, order, category);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    filterProducts(searchTerm, sortOrder, cat);
  };

  const filterProducts = (searchTerm, sortOrder, category) => {
    let filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category ? product.category === category : true)
    );

    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    let updatedCart;
    
    if (existingProductIndex >= 0) {
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
    }
    alert(`${product.title} has been added to your cart.`);
  };

  if (loading) {
    return <div className={styles.container}><p>Loading products...</p></div>;
  }

  if (error) {
    return <div className={styles.container}><p>{error}</p></div>;
  }

  return (
    <div className={styles.container}>
      <Navbar cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to My E-Commerce Site</h1>
        <div className={styles.filters}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchBar}
          />
          <button onClick={() => handleSortOrder('asc')} className={styles.sortButton}>Sort by Price: Low to High</button>
          <button onClick={() => handleSortOrder('desc')} className={styles.sortButton}>Sort by Price: High to Low</button>
          <select onChange={(e) => handleCategory(e.target.value)} className={styles.categorySelect}>
            <option value="">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
        <div className={styles.productContainer}>
          {filteredProducts.map(product => (
            <div key={product.id} className={styles.product}>
              <img src={product.image} alt={product.title} className={styles.productImage} />
              <h3>{product.title}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)} className={styles.addButton}>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}