import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request) {
   try {
      // Check authentication
      const user = await getCurrentUser();
      if (!user) {
         return NextResponse.json(
            { error: 'Unauthorized - Please login first' },
            { status: 401 }
         );
      }

      // Connect to database
      await dbConnect();

      // Get form data
      const formData = await request.formData();

      // Handle file uploads
      const imageFiles = formData.getAll('images');
      const uploadedImages = [];

      for (const file of imageFiles) {
         if (file instanceof File) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const base64String = buffer.toString('base64');
            const dataURI = `data:${file.type};base64,${base64String}`;

            const uploadResult = await uploadToCloudinary(dataURI);
            uploadedImages.push({
               url: uploadResult.url,
               public_id: uploadResult.public_id
            });
         }
      }

      // Create property object
      const propertyData = {
         title: formData.get('title'),
         description: formData.get('description'),
         price: Number(formData.get('price')),
         location: {
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zipCode: formData.get('zipCode')
         },
         propertyType: formData.get('propertyType'),
         status: formData.get('status'),
         features: {
            bedrooms: Number(formData.get('bedrooms')),
            bathrooms: Number(formData.get('bathrooms')),
            area: Number(formData.get('area')),
            parking: Number(formData.get('parking'))
         },
         images: uploadedImages,
         owner: user.userId
      };

      // Create new property
      const property = await Property.create(propertyData);

      return NextResponse.json(
         { message: 'Property created successfully', property },
         { status: 201 }
      );

   } catch (error) {
      console.error('Property creation error:', error);
      return NextResponse.json(
         { error: error.message || 'Failed to create property' },
         { status: 500 }
      );
   }
}

export async function GET(request) {
   try {
      await dbConnect();

      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page')) || 1;
      const limit = parseInt(searchParams.get('limit')) || 10;
      const skip = (page - 1) * limit;

      const properties = await Property.find()
         .sort({ createdAt: -1 })
         .skip(skip)
         .limit(limit)
         .populate('owner', 'name email');

      const total = await Property.countDocuments();

      return NextResponse.json({
         properties,
         pagination: {
            total,
            page,
            pages: Math.ceil(total / limit)
         }
      });

   } catch (error) {
      console.error('Error fetching properties:', error);
      return NextResponse.json(
         { error: 'Failed to fetch properties' },
         { status: 500 }
      );
   }
} 