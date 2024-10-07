"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface ChampionDetail {
  id: string;
  name: string;
  title: string;
  lore: string;
  image: {
    full: string;
  };
}

interface ChampionAPIResponse {
  type: string;
  format: string;
  version: string;
  data: {
    [key: string]: ChampionDetail; // 챔피언 ID를 키로 하는 객체
  };
}

// 최신 버전 가져오기
const fetchLatestVersion = async (): Promise<string | null> => {
  try {
    const response = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    if (!response.ok) {
      throw new Error("버전을 가져오지 못했습니다.");
    }
    const versions = await response.json();
    return versions[0]; // 최신 버전 반환
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function ChampionDetailPage() {
  const [champion, setChampion] = useState<ChampionDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>(); // URL에서 챔피언 ID 추출

  useEffect(() => {
    const fetchChampionDetail = async () => {
      try {
        const version = await fetchLatestVersion(); // 최신 버전 가져오기
        if (!version) {
          throw new Error("최신 버전을 가져오지 못했습니다.");
        }

        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion/${id}.json`
        );

        if (!response.ok) {
          throw new Error("챔피언 세부정보를 가져오지 못했습니다.");
        }

        const data: ChampionAPIResponse = await response.json(); // ChampionAPIResponse로 타입 지정
        console.log(data);

        const championData = data.data[id]; // 챔피언 ID를 통해 데이터에 접근
        if (championData) {
          setChampion(championData);
        } else {
          throw new Error("챔피언 정보를 찾을 수 없습니다.");
        }

        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("알수 없는 오류가 발생했습니다.");
        }
        setLoading(false);
      }
    };

    fetchChampionDetail();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!champion) {
    return <p>챔피언 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {champion.name} - {champion.title}
      </h1>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
        alt={champion.name}
        className="w-full mb-4"
      />
      <p className="text-lg">{champion.lore}</p>
    </div>
  );
}
