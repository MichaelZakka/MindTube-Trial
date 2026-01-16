import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "تحليل محتوى الفيديو والتعليقات | MindTube",
  description: "تحليل شامل لتعليقات الفيديو ورؤى الجمهور لمساعدة صناع المحتوى على فهم جمهورهم وتخطيط محتواهم",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
