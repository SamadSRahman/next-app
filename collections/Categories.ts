import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
  },
  admin:{
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Category',
    plural: 'Categories', 
  },
 
  fields: [
 
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media', // Reference the Uploads collection
      required: true,
    },

    {
      name: 'subcategories',
      label: 'Subcategories',
      type: 'array',
      fields: [
        {
          name: 'subcat_name',
          label: 'Subcategory Name',
          type: 'text',
          required: true,
        },

        {
          name: 'subcat_description',
          label: 'Subcategory Description',
          type: 'textarea',
        },
        // {
        //   name: 'products',
        //   label: 'Products',
        //   type: 'relationship',
        //   relationTo: 'products', // This should point to the products collection
        //   hasMany: true, // Allows multiple products in each subcategory
        // },
      ],
    },
  ],
}
