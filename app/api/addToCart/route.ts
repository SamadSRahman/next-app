import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.PAYLOAD_SECRET || "your-secret-key";

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
export async function POST(req: NextRequest) {
  if (req.method === "OPTIONS") {
    return OPTIONS(req);
  }

  const { customerId, productId, quantity } = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];
  console.log("customerId", customerId, productId);
  
  if (!token) {
    return NextResponse.json(
      { message: "Token missing" },
      { status: 400 }
    );
  }

  if (!customerId) {
    return NextResponse.json(
      { message: " CustomerId is missing" },
      { status: 400 }
    );
  }
  let productID = parseInt(productId, 10);
  let customerID = parseInt(customerId, 10);
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

  const payload = await getPayload({
    config: configPromise,
  });

  // Fetch the customer by ID
  const customer = await payload.findByID({
    collection: "customers",
    id: customerID,
  });
  console.log("customer", customer);

  if (!productID) {
    return NextResponse.json({
      message: "Cart fetched successfully",
      cart: customer.cart,
    });
  }
let message = ""
  let updatedCart = customer.cart || [];
  console.log("Cart:", customer.cart);

  // Find if the product is already in the cart
  const productIndex = updatedCart.findIndex(
    (item: any) => item.product.id === productID
  );
  console.log("productIndex", productIndex);

  if (productIndex !== -1) {
    // Remove the product if it already exists in the cart (acting as a toggle)
    updatedCart.splice(productIndex, 1);
    message = "Item removed from cart"
  } else {
    // Fetch the product details
    const product = await payload.findByID({
      collection: "products",
      id: productID,
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Add the product to the cart with quantity and price
    updatedCart.push({
      product: product,
      quantity: parseInt(quantity, 10) || 1, // Default to 1 if no quantity provided
    });
    message = "Item added to cart"
  }
  console.log("updatedCart", updatedCart);
  updatedCart = updatedCart.map((item: any) => ({
    product: item.product.id,
    quantity: item.quantity,
  }));
  // Update the customer's cart
  await payload.update({
    collection: "customers",
    id: customerID,
    data: { cart: updatedCart },
  });
  console.log("final cart", customer.cart);

  return NextResponse.json({ message:message });
}
