"use client";
import "./styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full bg-[#838383]">
      <body className="h-full min-h-screen m-0">{children}</body>
    </html>
  );
}
