import mysql from 'mysql2'
import dotenv from 'dotenv'// required for using .env
dotenv.config()


const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getTodoList() {
  const [ rows ] = await pool.query("SELECT * FROM todoList")
  return rows
}

export async function getTodo(id) {
  const [ rows ] = await pool.query(`SELECT * FROM todoList WHERE id = ?`, [id])
  return rows[0]
}

export async function createTodo(todo) {
  const [ result ] = await pool.query(`
    INSERT INTO todoList (todo)
    VALUES (?)
  `, [todo])
  
  const id = result.insertId
  return await getTodo(id)
}

export async function deleteTodo(id) {
  console.log(`Deleted todo: ${getTodo(id)}`)
  const [ result ] = await pool.query(`
    DELETE FROM todoList 
    WHERE id = ?
  `, [id])
}

