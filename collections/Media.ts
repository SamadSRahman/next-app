import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'; // Import Cloudinary types
import type { CollectionConfig } from 'payload';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'alt', // Alt text for the image
      type: 'text',
      required: true,
    },
    {
      name: 'cloudinaryUrl', // Field for storing Cloudinary URL
      type: 'text',
    },
  ],
  upload: true, // This enables file uploads
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Check if the file is uploaded
        if (req.file) {
          try {
            // Get the file buffer and filename from the request
            const fileBuffer = req.file.data; // Buffer data
            const fileName = req.file.name;   // Original file name

            // Use a Promise wrapper around the Cloudinary upload_stream
            const uploadToCloudinary = async (buffer: Buffer, filename: string): Promise<UploadApiResponse> => {
              return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                  { public_id: filename.split('.')[0] }, // Use the filename (without extension) as public_id
                  (error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                  }
                );
                // Write buffer to the upload stream
                uploadStream.end(buffer);
              });
            };

            // Upload the file buffer to Cloudinary
            const uploadResult = await uploadToCloudinary(fileBuffer, fileName);

            // Generate optimized URL with auto-format and quality
            const optimizedUrl = cloudinary.url(uploadResult.public_id, {
              fetch_format: 'auto',
              quality: 'auto',
            });

            // Set the Cloudinary URL to the new `cloudinaryUrl` field
            data.cloudinaryUrl = optimizedUrl;
          } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
          }
        }

        return data;
      },
    ],
  },
};
