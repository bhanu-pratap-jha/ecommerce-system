'use client'; // Ensures the component works in a Next.js client context
import Image from 'next/image';
import { useState, useEffect } from 'react'; // Import useEffect for client-side handling
import styles from './product.module.css';
import Headp from './images/headphone.jpeg';
import Phone from './images/phone.webp';
import Laptop from './images/laptop.png';

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality sound with noise cancellation.",
    price: "$2120",
    image: Headp,
  },
  {
    id: 2,
    name: "Smartphone",
    description: "Latest model with stunning camera features.",
    price: "$85000",
    image: Phone,
  },
  {
    id: 3,
    name: "Laptop",
    description: "Powerful performance for professional work.",
    price: "$151500",
    image: Laptop,
  }
];

export default function Product() {
  const [notification, setNotification] = useState('');
  const [isClient, setIsClient] = useState(false); // State to track if client-side rendering is complete

  // Ensure notifications are handled on the client side
  useEffect(() => {
    setIsClient(true); // Mark as client-side after mount
  }, []);

  const addToCart = async (product) => {
    // Send POST request to add the product to the cart
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          price: product.price.replace('$', ''), // Remove dollar sign if needed for the database
          quantity: 1, // Default quantity is 1
        }),
      });
      const data = await response.json();
      if (data.message) {
        setNotification(`${product.name} added to cart!`);
        setTimeout(() => setNotification(''), 2000);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (!isClient) {
    return null; // Return null during SSR to avoid hydration mismatch
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Explore Our Products :</h2>
      <div className={styles.productList}>
        {products.map((product) => (
          <div className={styles.productCard} key={product.id}>
            <div className={styles.imageContainer}>
              <Image
                alt={product.name}
                src={product.image}
                layout="responsive"
                width={300}
                height={200}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.details}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>{product.price}</p>
            </div>
            <button
              className={styles.addToCartButton}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {notification && (
        <div className={styles.notification}>
          {notification}
        </div>
      )}
    </div>
  );
}
