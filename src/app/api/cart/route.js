import { pool } from '../../config/db';
import { NextResponse } from 'next/server';

// GET request to fetch cart items
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM cart');
    return NextResponse.json(result.rows); // Send the cart items as a response
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Failed to fetch cart items.' }, { status: 500 });
  }
}

// POST request to add an item to the cart
export async function POST(request) {
  try {
    // Parse the incoming JSON request body
    const { id, name, price, quantity } = await request.json();
    
    // Log the request data for debugging
    console.log('Received data for POST:', { id, name, price, quantity });

    // Ensure price is a number (if it's passed as a string like '$120', we remove '$' sign)
    const priceValue = parseFloat(price.replace('$', ''));

    // Perform the database query
    const result = await pool.query(
      'INSERT INTO cart (id, name, price, quantity) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET quantity = cart.quantity + $4',
      [id, name, priceValue, quantity]
    );

    // Return success response
    return NextResponse.json({ message: 'Product added to cart successfully!' });
  } catch (error) {
    console.error('Error adding to cart:', error); // Log detailed error
    return NextResponse.json({ error: 'Failed to add product to cart.' }, { status: 500 });
  }
}
