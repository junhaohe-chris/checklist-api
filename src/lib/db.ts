import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: 'postgres',
  password: 'mysecretpassword',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
})

const client = await pool.connect()
const res = await client.query('SELECT NOW()')

console.log(res.rows[0])

client.release()