import type { CollectionConfig, CollectionSlug } from "payload";
export const SubCategories: CollectionConfig = {
  slug: "subCategories",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  labels: {
    singular: "Sub Category",
    plural: "Sub Categories",
  },

  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
    },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media", // Reference the Uploads collection
    },
    {
      name: "products",
      label: "Products",
      type: "relationship",
      relationTo: "products",
      hasMany:true
    },
  ],
};
