import { pool } from '../../../config/db'; // Ensure correct import for the database
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  // Await the params
  const { id } = await params; // Await the params before extracting the id
  
  if (!id) {
    return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
  }

  try {
    // Execute the DELETE query
    const result = await pool.query('DELETE FROM cart WHERE id = $1 RETURNING *', [id]);

    // If no product was found, return a 404 error
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Product not found in cart' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product removed from cart!' });
  } catch (error) {
    console.error('Error removing item:', error);
    return NextResponse.json({ error: 'Failed to remove product from cart' }, { status: 500 });
  }
}
