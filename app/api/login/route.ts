import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { setCookie } from '@/lib/cookies';

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
   try {
      await dbConnect();

      const { email, password } = await req.json();

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
         return NextResponse.json(
            { success: false, message: 'Invalid email or password' },
            { status: 401 }
         );
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         return NextResponse.json(
            { success: false, message: 'Invalid email or password' },
            { status: 401 }
         );
      }

      // Generate JWT token
      const token = jwt.sign(
         { userId: user._id, email: user.email },
         SECRET,
         { expiresIn: '7d' }
      );

      // Set cookie
      await setCookie('auth-token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return NextResponse.json({
         success: true,
         user: {
            id: user._id,
            name: user.name,
            email: user.email
         }
      });
   } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json(
         { success: false, message: 'Error during login' },
         { status: 500 }
      );
   }
}
