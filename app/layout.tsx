import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teleprompter App",
  description: "Professional teleprompter for speakers, presenters, and video creators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
