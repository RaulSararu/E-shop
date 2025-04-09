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
      // Obținem utilizatorii existenți din localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = existingUsers.find((user) => user.email === email);

      if (userExists) {
        setError('User already exists!');
        return;
      }

      // Creăm un utilizator nou și îl adăugăm la lista de utilizatori
      const newUser = { email, password };
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Simulăm autentificarea după înregistrare
      const token = 'fake-token';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ email }));

      router.push('/');
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
      <p className={styles.loginText}>
        Already have an account? <a href="/login" className={styles.loginLink}>Login here</a>
      </p>
    </div>
  );
}