"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../styles/Login.module.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Obținem utilizatorii existenți din localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const user = existingUsers.find((user) => user.email === email && user.password === password);

      if (!user) {
        setError('User does not exist or invalid credentials');
        return;
      }

      // Salvăm token-ul și datele utilizatorului în localStorage
      const token = 'fake-token';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ email }));

      router.push('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <label className={styles.formLabel}>Email:</label>
        <input 
          type="email" 
          className={styles.formInput}
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <label className={styles.formLabel}>Password:</label>
        <input 
          type="password" 
          className={styles.formInput}
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.formButton}>Login</button>
      </form>
      <p className={styles.registerText}>
        Don't have an account? <Link href="/register" className={styles.registerLink}>Register here</Link>
      </p>
    </div>
  );
}