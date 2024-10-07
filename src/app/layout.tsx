import "./globals.css";
import Navbar from "./components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>리그 오브 레전드 정보 앱</title>
      </head>
      <body className="bg-black text-white">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
