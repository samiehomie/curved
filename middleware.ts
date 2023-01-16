import { getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const user = await getSession(req, res);
  if (!user) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return res;
}

export const config = {
  matcher: ['/life/(.+)', '/bird/(.+)', '/dog/(.+)'],
};
