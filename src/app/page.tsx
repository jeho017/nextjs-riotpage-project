import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-4xl mb-10">리그 오브 레전드 정보 앱</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
          <Link href="/champions" className="mt-2 text-xl">
            챔피언 목록 보기
          </Link>
        </div>
        <div className="text-center">
          <Link href="/items" className="mt-2 text-xl">
            아이템 목록 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
