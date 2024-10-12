import type { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
  slug: "customers", // The slug of the collection
  auth: {
    tokenExpiration: 7200,
    verify:true,
  }, // Enable auth for this collection
  access: {
    read:() => true,
    update:() => true,
    create:() => true,
   
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
      name: "wishlists",
      type: "relationship",
      relationTo:'products',
      label:"Wishlist",
      hasMany:true
    },
  ],
};
