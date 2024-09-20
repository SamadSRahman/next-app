import type { CollectionConfig, CollectionSlug } from "payload";

export const Customers: CollectionConfig = {
  slug: "customers", // The slug of the collection
  auth: true, // Enable auth for this collection
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
    // {
    //   name: 'cart',
    //   type: 'array',
    //   fields: [
    //     {
    //       name: 'productId',
    //       type: 'text',
    //       required: true,
    //     },
    //     {
    //       name: 'quantity',
    //       type: 'number',
    //       required: true,
    //     },
    //   ],
    // },
    {
      name: "cart",
      label: "Cart",
      type:'array',
      fields:[
        {
          name:"product",
          label:"Product",
          type: "relationship",
          relationTo: "products" as CollectionSlug,
        },
        {
          name:'quantity',
          label:"Quantity",
          type:"number"
        }
      ] 
 
    },
    {
      name: "wishlist",
      type: "array",
      fields: [
        {
          name: "productId",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
