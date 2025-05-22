// app/lib/actions.ts
'use server';

import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

export async function registerUser(formData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Check if user already exists
    const { rows } = await sql`
      SELECT * FROM users WHERE email = ${formData.email}
    `;
    if (rows.length > 0) {
      throw new Error("Email already exists");
    }

    // Generate UUID for user
    const userId = (await sql`SELECT gen_random_uuid() AS id`).rows[0].id;

    // Hash password
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // Insert into users table
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${userId}, ${formData.name}, ${formData.email}, ${hashedPassword})
    `;

    // Insert into satsangis table
    await sql`
      INSERT INTO satsangis (id, name, email)
      VALUES (${userId}, ${formData.name}, ${formData.email})
    `;

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Registration failed" };
  }
}

export async function loginUser(formData: { email: string; password: string }) {
  try {
    // Query user from Vercel Postgres
    const { rows } = await sql`
      SELECT * FROM users WHERE email = ${formData.email}
    `;

    const user = rows[0];
    if (!user) {
      throw new Error("User not found");
    }

    // Verify password
    const isValid = await bcrypt.compare(formData.password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    return { success: true, user: { id: user.id, name: user.name, email: user.email } };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Login failed" };
  }
}