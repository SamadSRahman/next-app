


import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
labels: {
    singular: 'Product',
    plural: 'Products',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0, // Initially 0 views
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
        name: 'features',
        label: 'Features',
        type: 'array',
        fields: [
          {
            name: 'feature',
            label: 'Feature',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        name: 'images',
        label: 'Images',
        type: 'array',
        fields: [
          {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media', // Reference the Uploads collection
            required: true,
          },
        ],
      },
      {
        name: 'category',
        label: 'Category',
        type: 'relationship',
        relationTo: 'categories', // Reference the Categories collection
        required: true,
      },
    // Add other fields as needed
  ],
}
