import type { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
  slug: "customers", // The slug of the collection
  auth: {
    tokenExpiration: 7200,
    verify:true,
  }, // Enable auth for this collection
  access: {
    read:({ req: { user }, id }) => {
      // Check if the user object is present (i.e., the JWT token is valid)
      console.log("id", id);
      console.log("userId",user, user?.id);
    
      
      
      if (user && user.id === id) {
        // If the authenticated user's ID matches the document's ID, allow access
        return true;
      }

      // The token is invalid or not present, deny access
      return false;
    },
    update: ({ req: { user } , id}) => {
      // Check if the user object is present (i.e., the JWT token is valid)
      if (user?.id ===id) {
        // The token is valid, allow the update
        return true;
      }

      // The token is invalid or not present, deny access
      return false;
    },
  },
  admin: {
    useAsTitle: "name", // Display 'name' in the admin panel
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "address",
      type: "array",
      fields: [
        {
          name: "line1",
          type: "text",
          required: true,
        },
        {
          name: "line2",
          type: "text",
        },
        {
          name: "city",
          type: "text",
          required: true,
        },
        {
          name: "state",
          type: "text",
          required: true,
        },
        {
          name: "zip",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "cart",
      label: "Cart",
      type: "array",
      fields: [
        {
          name: "product",
          label: "Product",
          type: "relationship",
          relationTo: "products",
        },
        {
          name: "quantity",
          label: "Quantity",
          type: "number",
        },
      ],
    },
    {
      name: "wishlist",
      type: "array",
      fields: [
        {
          name:"product",
          label:"Product",
          type:"relationship",
          relationTo:"products",
        }
      ],
    },
  ],
};
