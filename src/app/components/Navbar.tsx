import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <ul className="flex justify-center space-x-8 text-white">
        <li className="hover:text-yellow-400">
          <Link href="/">홈</Link>
        </li>
        <li className="hover:text-yellow-400">
          <Link href="/champions">챔피언 목록</Link>
        </li>
        <li className="hover:text-yellow-400">
          <Link href="/items">아이템 목록</Link>
        </li>
        <li className="hover:text-yellow-400">
          <Link href="/rotation">챔피언 로테이션</Link>
        </li>
      </ul>
    </nav>
  );
}
