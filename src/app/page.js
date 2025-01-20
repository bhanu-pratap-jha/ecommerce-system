'use client';
import { useEffect, useState } from 'react';
import Styles from './page.module.css';
import Product from '../../components/products';

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch cart items from the database
  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await fetch('/api/cart');
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    }
    fetchCartItems();
  }, []);

  // Handle removing an item from the cart
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(`/api/cart/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId }),
      });
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== productId)
        );
      } else {
        console.error('Error removing item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message or spinner while fetching
  }

  return (
    <main>
      <div className={Styles.container}>
        <div className={Styles.textContainer}>
          <div>Welcome to</div>
          <div className={Styles.shopName}>ShopEase</div>
          <div className={Styles.tagline}>
            Your one-stop destination for quality products.
          </div>

          <div className={Styles.featureList}>
            <div>
              <Product cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
            </div>
            <div>Join Our Community</div>
          </div>
        </div>
      </div>
    </main>
  );
}
