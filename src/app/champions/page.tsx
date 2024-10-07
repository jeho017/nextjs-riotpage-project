"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Champion {
  id: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
}

export default function ChampionListPage() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const router = useRouter();
  // 버전 상태 추가
  console.log(version);
  console.log("champions=>", champions);
  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await fetch("/api/champions");
        if (!response.ok) {
          throw new Error("챔피언을 가져오지 못했습니다.");
        }

        const data = await response.json();
        setChampions(data.champions);

        // 버전 설정 (API에서 반환된 버전을 사용할 경우)
        setVersion(data.version); // 데이터에서 버전이 필요하다면 여기에서 설정
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
        setLoading(false);
      }
    };

    fetchChampions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">챔피언 목록</h1>
        <ul className="grid grid-cols-4 gap-6">
          {champions.map((champion) => (
            <li
              key={champion.id}
              className="p-4 border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition hover:bg-gray-800 cursor-pointer"
              onClick={() => router.push(`/champions/${champion.id}`)}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                alt={champion.name}
                className="w-24 h-24 object-cover mb-4 mx-auto rounded-full"
              />
              <h2 className="text-lg font-semibold text-center">
                {champion.name}
              </h2>
              <p className="text-sm text-gray-400 text-center">
                {champion.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
