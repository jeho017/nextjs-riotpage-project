"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// 데이터 인터페이스 정의
interface ChampionRotation {
  freeChampionIds: number[];
  freeChampionIdsForNewPlayers: number[];
  maxNewPlayerLevel: number;
}

interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
}

export default function ChampionRotationPage() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRotationData = async () => {
      try {
        // 로테이션 API에서 무료 챔피언 ID 가져오기
        const rotationResponse = await fetch("/api/rotation");
        if (!rotationResponse.ok) {
          throw new Error("챔피언 로테이션을 가져오지 못했습니다.");
        }
        const rotationData: ChampionRotation = await rotationResponse.json();

        // 최신 버전 정보 가져오기
        const versionResponse = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json"
        );
        const versions = await versionResponse.json();
        const latestVersion = versions[0];

        // DDragon API에서 전체 챔피언 데이터 가져오기
        const championsResponse = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`
        );
        const championsData = await championsResponse.json();
        const allChampions: Champion[] = Object.values(championsData.data);

        // 챔피언 "key"와 무료 챔피언 ID를 매칭하여 필터링
        const rotationChampions = allChampions.filter(
          (champion) =>
            rotationData.freeChampionIds.includes(parseInt(champion.key)) // key가 숫자인지 확인 후 비교
        );

        console.log("Rotation Champions:", rotationChampions); // 필터링된 챔피언 확인
        setChampions(rotationChampions);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRotationData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          현재 무료 챔피언 로테이션
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {champions.map((champion) => (
            <div
              key={champion.id}
              className="text-center p-4 border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition hover:bg-gray-800 cursor-pointer"
            >
              <Link href={`/champions/${champion.id}`}>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
                  alt={champion.name}
                  className="w-24 h-24 object-cover mb-4 mx-auto rounded-full"
                />
                <h3 className="text-lg font-semibold">{champion.name}</h3>
                <p className="text-sm text-gray-400">{champion.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
