import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import User from '@/app/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { setCookie } from '@/lib/cookies';

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
   try {
      await dbConnect();

      const { name, email, password } = await req.json();

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return NextResponse.json(
            { success: false, message: 'User already exists' },
            { status: 400 }
         );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = await User.create({
         name,
         email,
         password: hashedPassword
      });

      // Generate JWT token
      const token = jwt.sign(
         { userId: user._id, email: user.email },
         SECRET,
         { expiresIn: '7d' }
      );

      // Set cookie
      setCookie('auth-token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return NextResponse.json(
         { success: true, user: { id: user._id, name: user.name, email: user.email } },
         { status: 201 }
      );
   } catch (error) {
      console.error('Signup error:', error);
      return NextResponse.json(
         { success: false, message: 'Error creating user' },
         { status: 500 }
      );
   }
}
