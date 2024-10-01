import configPromise from "@payload-config";
import { CollectionSlug, getPayload } from "payload";
import { NextResponse } from "next/server";
import { Customer } from "../../../payload-types"; // Import your custom type

export const POST = async (req: Request) => {
  try {
    const { customerId, productId } = await req.json();
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Assuming token is sent as "Bearer <token>"
    console.log("token", token);

    // Validate input
    if (!customerId || !productId || !token) {
      return NextResponse.json(
        { message: "Invalid input or missing token" },
        { status: 400 }
      );
    }

    // Initialize Payload CMS
    const payload = await getPayload({
      config: configPromise,
    });

    // Find the customer by ID
    const customer = (await payload.findByID({
      collection: "customers" as CollectionSlug,
      id: customerId,
    })) as Customer;

    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    // Get the current wishlist
    let updatedWishlist = [...(customer.wishlist || [])];

    // Check if the product is already in the wishlist
    const productExists = updatedWishlist.some(
      (item: any) => item.product.id === parseInt(productId, 10)
    );

    if (productExists) {
      // Remove the product from the wishlist
      updatedWishlist = updatedWishlist.filter(
        (item: any) => item.product.id !== parseInt(productId, 10)
      );
    } else {
      // Add the product to the wishlist
      updatedWishlist.push({ product: parseInt(productId, 10) });
    }

    // Update customer's wishlist in the database
    const updatedCustomer = await payload.update({
      collection: "customers",
      id: customerId,
      data: {
        wishlist: updatedWishlist,
      },
    });

    return NextResponse.json({
      message: "Wishlist updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
};
