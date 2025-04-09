import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../styles/Navbar.module.css';

export default function Navbar({ cartItemCount }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/orders">Order History</Link>
      </div>
      <div className={styles.actions}>
        <Link href="/cart">
          Cart <span className={styles.cartCount}>{cartItemCount}</span>
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
    </nav>
  );
}