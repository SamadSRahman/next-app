import configPromise from "@payload-config";
import { CollectionSlug, getPayload } from "payload";
import { NextRequest, NextResponse } from "next/server";
import { Customer, Product } from "../../../payload-types";
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

  try {
    const { customerId, productId } = await req.json();
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!customerId ||  !token) {
      return NextResponse.json(
        { message: "Invalid input or missing token" },
        { status: 400 }
      );
    }

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

    const customer = (await payload.findByID({
      collection: "customers" as CollectionSlug,
      id: customerId,
    })) as Customer;
    console.log("customer:", customer);

    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }
    if(!productId){
      return  NextResponse.json({
        message: "Wishlist fetched successfully",
        wishlist: customer.wishlists,
      });
    }
    let updatedWishlist = [...(customer.wishlists || [])];
    console.log("wishlist", updatedWishlist);

    const productIndex = updatedWishlist.findIndex(
      (item: any) => item.id === parseInt(productId, 10)
    );
    console.log("productIndex", productIndex);

    if (productIndex !== -1) {
      // Remove the product if it exists
      updatedWishlist.splice(productIndex, 1);
    } else {
      // Fetch the full product details
      const newProduct = (await payload.findByID({
        collection: "products" as CollectionSlug,
        id: productId,
      })) as Product;
      console.log("newProduct", newProduct);

      if (!newProduct) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }

      // Add the new wishlist item
      updatedWishlist.push(newProduct);
    }
    console.log("updatedWishlist", updatedWishlist);

    updatedWishlist = updatedWishlist.map((ele:any)=>ele.id)
    console.log("updatedWishlistWithId", updatedWishlist);
    

    const updatedCustomer = (await payload.update({
      collection: "customers",
      id: customerId,
      data: {
        wishlists: updatedWishlist,
      },
    })) as Customer;

    console.log("Final Customer:", updatedCustomer);

    const response = NextResponse.json({
      message: "Wishlist updated successfully",
      wishlist: customer.wishlists,
    });

    // Set CORS headers
    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:5173",
      // "https://e-commerce-am.vercel.app"
    );
    response.headers.set("Access-Control-Allow-Methods", "POST");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");

    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}



// export async function GET(req:NextRequest) {
// console.log("API hit");

//   const payload = await getPayload({
//       config:configPromise
//   })
// // Check if the request method is OPTIONS
// if (req.method === "OPTIONS") {
//   return NextResponse.json({}, { status: 204 });
// }

// try {
//   // Extract token from Authorization header
  
  
//   const { customerId } = await req.json();
//   console.log("customerId", customerId);
//   const token = req.headers.get("Authorization")?.split(" ")[1];
//   if (!token) {
//     return NextResponse.json(
//       { message: "Missing Token" },
//       { status: 400 }
//     );
//   }

//   // Verify JWT token
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     console.error("Token validation failed:", err);
//     return NextResponse.json(
//       { message: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// console.log("token verified");

//   // Retrieve customerId from params
//   // const { customerId } = params;
//   console.log("customer Id", customerId);
  
//   // Now you can use customerId in your logic
//   console.log("Customer ID:", customerId);

//   // Add your logic here to handle the customer's wishlist
//   const customer = await payload.findByID({
//       collection:'customers',
//       id:customerId
//   }) 
//   console.log("customer", customer);
  
//   return NextResponse.json({ message: "Wishlist fetched successfully", wishlist:customer.wishlists });

// } catch (error) {
//   console.error("Error:", error);
//   return NextResponse.json(
//     { message: "An error occurred", error },
//     { status: 500 }
//   );
// }
// }

