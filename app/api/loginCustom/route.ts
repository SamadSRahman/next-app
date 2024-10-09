import configPromise from "@payload-config";
import { getPayload } from "payload";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { Customer } from "../../../payload-types"; // Import the User type from Payload

if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is not set in environment variables');
}

const SECRET_KEY: string = process.env.PAYLOAD_SECRET;

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Initialize Payload CMS
    const payload = await getPayload({
      config: configPromise,
    });

    // Attempt to login
    const result = await payload.login({
      collection: 'customers',
      data: { email, password },
    });

    // Extract user from the result
    const user = result.user as Customer;

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    return NextResponse.json({
      message: "Login successful",
      user,
      token,
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
};