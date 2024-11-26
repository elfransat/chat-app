import Database from "better-sqlite3";
const db = new Database("./my.db", { verbose: console.log });

export function createUsersTable() {
  const stmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password INTEGER NOT NULL
    )
  `);
  stmt.run();
}

export function insertUser(name, age) {
  const stmt = db.prepare(
    "INSERT INTO users (username, password) VALUES (?, ?)"
  );
  stmt.run(name, age);
}

export function getAllUsers() {
  const stmt = db.prepare("SELECT * FROM users");
  return stmt.all(); // Returns an array of all users
}

// A method to close the database connection
export function closeDatabase() {
  db.close();
}
