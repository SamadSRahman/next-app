import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getPayload } from "payload";
import configPromise from "@payload-config";

const JWT_SECRET = process.env.JWT_SECRET||""; // Make sure to set this in your environment variables

export async function GET(req:NextRequest, { params }:any) {

    const payload = await getPayload({
        config:configPromise
    })
  // Check if the request method is OPTIONS
  if (req.method === "OPTIONS") {
    return NextResponse.json({}, { status: 204 });
  }

  try {
    // Extract token from Authorization header
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Missing Token" },
        { status: 400 }
      );
    }

    // Verify JWT token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      console.error("Token validation failed:", err);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }
console.log("token verified");

    // Retrieve customerId from params
    const { customerId } = params;
    console.log("customer Id", customerId);
    
    // Now you can use customerId in your logic
    console.log("Customer ID:", customerId);

    // Add your logic here to handle the customer's wishlist
    const customer = await payload.findByID({
        collection:'customers',
        id:customerId
    }) 
    console.log("customer", customer);
    
    return NextResponse.json({ message: "Wishlist fetched successfully", wishlist:customer.wishlists });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
