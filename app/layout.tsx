import './global.css';
import localFont from '@next/font/local';
import NavBar from './components/NavBar';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const myFont = localFont({
  src: [
    { path: './public/font/D2Coding-Ver1.3.2-20180524.ttf', weight: '400' },
    { path: './public/font/D2CodingBold-Ver1.3.2-20180524.ttf', weight: '700' },
  ],
  variable: '--font-D2Coding',
  display: 'fallback',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={myFont.variable}>
      <body className="font-sans bg-base-purple">
        <UserProvider>
          <div className="px-4 py-10 max-w-2xl sm:mx-auto text-sm sm:text-base">
            <NavBar />
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
