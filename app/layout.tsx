import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "تحليل محتوى الفيديو والتعليقات | MindTube",
  description: "تحليل شامل لتعليقات الفيديو ورؤى الجمهور لمساعدة صناع المحتوى على فهم جمهورهم وتخطيط محتواهم",
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
