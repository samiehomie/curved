import { initAuth0 } from '@auth0/nextjs-auth0';

const envCondition = process.env.NODE_ENV === 'production';
const auth0 = initAuth0({
  secret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: envCondition ? process.env.AUTH0_BASE_URL : 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

export default auth0;