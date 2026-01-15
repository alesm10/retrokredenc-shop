export const metadata = {
  title: 'Retrokredenc Shop',
  description: 'Vintage shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
