import type { CollectionConfig } from 'payload'

const About: CollectionConfig = {
  slug: 'about',
  labels: {
    singular: 'About Us',
    plural: 'About Us',
  },
  fields: [
    {
      name: 'heroSection',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
        },
        {
          name: 'subheading',
          type: 'text',
          required: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media', // Assuming you have a media collection
        },
        {
          name: 'ctaButton',
          type: 'text',
        },
      ],
    },
    {
      name: 'missionSection',
      type: 'group',
      fields: [
        {
          name: 'missionStatement',
          type: 'textarea',
          required: true,
        },
        {
          name: 'missionImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'storySection',
      type: 'array', // Timeline structure
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'milestoneImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'valuesSection',
      type: 'array',
      fields: [
        {
          name: 'valueTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'valueDescription',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'teamSection',
      type: 'array',
      fields: [
        {
          name: 'teamMemberName',
          type: 'text',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
        },
        {
          name: 'teamMemberImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'testimonialsSection',
      type: 'array',
      fields: [
        {
          name: 'testimonial',
          type: 'textarea',
          required: true,
        },
        {
          name: 'customerName',
          type: 'text',
        },
        {
          name: 'customerImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    // {
    //   name: 'globalReachSection',
    //   type: 'group',
    //   fields: [
    //     {
    //       name: 'mapImage',
    //       type: 'upload',
    //       relationTo: 'media',
    //     },
    //     {
    //       name: 'reachStats',
    //       type: 'text',
    //     },
    //   ],
    // },
    // {
    //   name: 'sustainabilitySection',
    //   type: 'group',
    //   fields: [
    //     {
    //       name: 'sustainabilityDescription',
    //       type: 'textarea',
    //     },
    //     {
    //       name: 'sustainabilityImage',
    //       type: 'upload',
    //       relationTo: 'media',
    //     },
    //   ],
    // },
    // {
    //   name: 'ctaSection',
    //   type: 'group',
    //   fields: [
    //     {
    //       name: 'ctaText',
    //       type: 'textarea',
    //       required: true,
    //     },
    //     {
    //       name: 'ctaButton',
    //       type: 'text',
    //     },
    //     {
    //       name: 'socialMediaLinks',
    //       type: 'array',
    //       fields: [
    //         {
    //           name: 'platform',
    //           type: 'text',
    //         },
    //         {
    //           name: 'url',
    //           type: 'text',
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
};

export default About;
