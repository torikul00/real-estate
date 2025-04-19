import { jwtVerify } from 'jose';
import { getCookie } from '@/lib/cookies';

const SECRET = process.env.JWT_SECRET!;

export async function getCurrentUser() {
   try {
      const cookie = await getCookie('auth-token');
      const token = cookie?.value;

      if (!token) {
         return null;
      }

      const secret = new TextEncoder().encode(SECRET);
      const { payload } = await jwtVerify(token, secret);

      return payload;
   } catch (error) {
      console.error('Auth error:', error);
      return null;
   }
}

export async function isAuthenticated() {
   const user = await getCurrentUser();
   return !!user;
} 