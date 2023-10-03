import mysql2 from "mysql2/promise";

// Creating Database connection.
const connection = await mysql2.createConnection(process.env.DATABASE_URL);

export default connection;
