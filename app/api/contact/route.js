import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

export async function POST(request) {
  try {
    // Connect to database
    await dbConnect();

    // Get request data
    const { propertyId, name, email, phone, message } = await request.json();

    // Validate required fields
    if (!propertyId || !name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find property to get owner information
    const property = await Property.findById(propertyId).populate('owner', 'name email phone');
    
    if (!property) {
      return NextResponse.json(
        { success: false, message: 'Property not found' },
        { status: 404 }
      );
    }

    // In a real application, you would send an email to the property owner
    // For now, we'll just return a success response
    console.log('Contact form submission:', {
      propertyId,
      propertyTitle: property.title,
      ownerName: property.owner.name,
      ownerEmail: property.owner.email,
      contactName: name,
      contactEmail: email,
      contactPhone: phone,
      message
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to send message' },
      { status: 500 }
    );
  }
} 