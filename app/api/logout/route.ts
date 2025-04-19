import { NextResponse } from 'next/server';
import { deleteCookie } from '@/lib/cookies';

export async function POST() {
  try {
    // Clear the auth cookie
    await deleteCookie('auth-token');
    
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Error during logout' },
      { status: 500 }
    );
  }
} 