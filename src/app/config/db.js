import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'order_service_db',
  password: 'radhekrishn',
  port: 5432, // Default PostgreSQL port
});

export { pool };
