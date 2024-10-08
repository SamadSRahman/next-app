import type { CollectionConfig, CollectionSlug } from "payload";
export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  labels: {
    singular: "Category",
    plural: "Categories",
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
      required: true,
    },

    {
      name: "subcategories",
      label: "Subcategories",
      type: "relationship",
      relationTo: "subCategories",
      hasMany:true
    },
  ],
};
