import { initAuth0 } from '@auth0/nextjs-auth0';

export const authObjFunc = () => {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.AUTH0_BASE_URL
      : 'http://localhost:3000';

  return {
    secret: process.env.AUTH0_SECRET,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    baseURL: baseUrl,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
  };
};

const auth0 = initAuth0(authObjFunc());

export default auth0;
