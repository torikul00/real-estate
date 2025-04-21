import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
   cloud_name: 'ddw8jsak4',
   api_key: '227619816735221',
   api_secret: '85gTyifLdXJ5ASt0NrUv72d9tM0'
});

// Helper function to upload to Cloudinary
export const uploadToCloudinary = async (file) => {
   try {
      const result = await cloudinary.uploader.upload(file, {
         folder: 'makaan-properties',
         resource_type: 'auto',
      });
      return {
         url: result.secure_url,
         public_id: result.public_id,
      };
   } catch (error) {
      throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
   }
};

export const deleteFromCloudinary = async (public_id) => {
   try {
      await cloudinary.uploader.destroy(public_id);
   } catch (error) {
      throw new Error(`Failed to delete from Cloudinary: ${error.message}`);
   }
};
