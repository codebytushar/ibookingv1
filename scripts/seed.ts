import { sql } from '@vercel/postgres';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function main() {

  try {

    const schemaPath = path.join(__dirname, '../src/db/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Running schema.sql...');

    // Split by semicolon, filter empty lines
    const statements = schemaSql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (const stmt of statements) {
      await sql.query(stmt);
    }

    console.log('✅ Schema created.');
    console.log('Inserting seed data...');

    // Example insert
    await sql`
      INSERT INTO satsangis (name, age, city, state, birthdate, panno, address, mobile, email, room_allocation_type, seva_payment_status, is_seva_waived)
      VALUES (
        'Harsh Patel', 28, 'Ahmedabad', 'Gujarat', '1996-02-14', 'ABCDE1234F',
        'Somewhere Street', '9999999999', 'harsh@example.com',
        'shared', true, false
      )
    `;

    console.log('✅ Seed data inserted.');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  } finally {
    // Close the database connection
    await sql.end();
  }
}

main();