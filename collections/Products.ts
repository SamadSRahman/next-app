import type { CollectionConfig, CollectionSlug } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: () => true,
  },
  admin: { useAsTitle: "productName" },
  labels: {
    singular: "Product",
    plural: "Products",
  },
  fields: [
    {
      name: "productName",
      label: "Name",
      type: "text",
    },
    {
      name: "brandName",
      label: "Brand",
      type: "text",
    },
    {
      name: "brandLogo",
      label: "Brand Logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "variant",
      label: "Variant",
      type: "array",
      fields: [
        {
          name: "markedPrice",
          label: "Marked Price",
          type: "number",
        },
        {
          name: "sellingPrice",
          label: "Selling Price",
          type: "number",
        },
        {
          name: "discount",
          label: "Discount (in %)",
          type: "number",
        },
        {
          name: "maxPurchaseBySingleUser",
          label: "Max Purchase By Single User",
          type: "number",
        },
        {
          name: "inStock",
          label: "In Stock",
          type: "checkbox",
        },
        {
          name: "offers",
          label: "Offers",
          type: "array",
          fields: [
            {
              name: "offer",
              label: "Offer Title",
              type: "text",
            },
            {
              name: "terms",
              label: "Terms and Conditions",
              type: "array",
              fields: [
                {
                  name: "terms",
                  label: "Terms",
                  type: "text",
                },
              ],
            },
            {
              name: "isOfferValid",
              type: "checkbox",
              label: "Is Offer Valid",
            },
          ],
        },
        {
          name: "color",
          label: "Color",
          type: "text",
        },
        {
          name: "images",
          label: "Images",
          type: "array",
          fields: [
            {
              name: "image",
              label: "Image",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
        },
        {
          name: "sizes",
          label: "Sizes",
          type: "array",
          fields: [
            {
              name: "size",
              label: "size",
              type: "text",
            },
          ],
        },
        {
          name: "features",
          label: "Features",
          type: "array",
          fields: [
            {
              name: "feature",
              label: "Feature",
              type: "text",
            },
          ],
        },
        {
          name: "technicalDetails",
          label: "Technical Details",
          type: "array",
          fields: [
            {
              name: "title",
              label: "Title",
              type: "text",
            },
            {
              name: "description",
              label: "Description",

              type: "text",
            },
          ],
        },
        {
          name: "reviews",
          label: "Reviews",
          type: "array",
          fields: [
            {
              name: "rating",
              label: "Rating",
              type: "number",
              min: 1,
              max: 5,
              required: true,
            },
            {
              name: "reviewText",
              label: "Review Text",
              type: "textarea",
              required: true,
            },
            {
              name: "customerName",
              label: "Customer Name",
              type: "text",
              required: true,
            },
            {
              name: "createdAt",
              label: "Created At",
              type: "date",
              required: true,
              defaultValue: () => new Date().toISOString(),
            },
          ],
        },
      ],
    },
    { name: "subcategory", 
      type: "relationship", 
      label:"Sub Category",
      relationTo: "subCategories" },
  ],
};
