"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Register.module.css';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (err) {
      console.error('Register failed:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Register</h1>
      <form onSubmit={handleRegister} className={styles.form}>
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
        <button type="submit" className={styles.formButton}>Register</button>
      </form>
    </div>
  );
}