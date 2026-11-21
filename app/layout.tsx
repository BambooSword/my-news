import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "知简 · Daily Brief",
  description: "每日新闻摘要、深度阅读与英语学习收藏。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
