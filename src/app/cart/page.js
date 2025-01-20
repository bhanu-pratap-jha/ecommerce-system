'use client';
import { useEffect, useState } from 'react';
import styles from './cart.module.css'; // Ensure the CSS is correctly imported

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCartItems() {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCartItems(data || []); // Directly use the array from the response
    }
    fetchCartItems();
  }, []);

  // Function to remove item from the cart
  const removeItem = async (id) => {
    try {
      // Sending DELETE request to the backend
      const response = await fetch(`/api/cart/${id}`, { method: 'DELETE' });
      
      if (response.ok) {
        // If successful, remove item from the frontend state
        setCartItems(cartItems.filter((item) => item.id !== id));
      } else {
        // Handle the case where deletion fails
        console.error('Failed to remove item:', await response.json());
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Function to increase quantity
  const increaseQuantity = async (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems); // Update state to reflect the increased quantity

    // Optionally, update the database (if needed)
    await fetch(`/api/cart/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: 1 }),
    });
  };

  // Function to decrease quantity
  const decreaseQuantity = async (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems); // Update state to reflect the decreased quantity

    // Optionally, update the database (if needed)
    await fetch(`/api/cart/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: -1 }),
    });
  };

  const buyItem = (item) => {
    // For now, just log the item being purchased
    console.log('Item bought:', item);
  };

  return (
    <div className={styles.container}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th> {/* Add Total column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    className={styles.quantityButton}
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className={styles.quantityButton}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td> {/* Display updated total price */}
                <td>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                  <button
                    className={styles.buyButton}
                    onClick={() => buyItem(item)}
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
