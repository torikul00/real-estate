import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { normalizeProperty } from '@/lib/normalizeProperty';

export async function GET(request, { params }) {
   try {
      // Connect to database
      await dbConnect();

      // Get property ID from params
      const { id } = params;

      // Find property by ID and populate owner information
      const property = await Property.findById(id).populate('owner', 'name email phone').lean();

      // If property not found
      if (!property) {
         return NextResponse.json(
            { error: 'Property not found' },
            { status: 404 }
         );
      }

      return NextResponse.json({ property: normalizeProperty(property) });
   } catch (error) {
      console.error('Error fetching property:', error);
      return NextResponse.json(
         { error: error.message || 'Failed to fetch property' },
         { status: 500 }
      );
   }
} 