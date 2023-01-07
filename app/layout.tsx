import './public/css/global.css';
import localFont from '@next/font/local';

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
      <body>{children}</body>
    </html>
  );
}
