import shift from "postgres-shift";
import postgres from "postgres";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); //

export const sql = postgres({
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_NAME,
  user: process.env.POSTGRES_USERNAME,
  pass: process.env.POSTGRES_PASSWORD,
  idle_timeout: 1,
});

console.log(process.env.POSTGRES_PORT);

shift({
  sql,
  path: fileURLToPath(new URL("./src/database/migrations", import.meta.url)),
  before: ({ migration_id, name }) => {
    console.log("Migrating", migration_id, name);
  },
})
  .then(() => console.log("All good"))
  .catch((err) => {
    console.error("Failed", err);
    process.exit(1);
  });
