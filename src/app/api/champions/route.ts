import { NextResponse } from "next/server";

// 챔피언 API 응답 데이터에 맞는 타입 정의
interface ChampionAPIData {
  id: string;
  name: string;
  title: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

// 챔피언 데이터 타입 정의
interface Champion {
  id: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
}

// 버전 정보 가져오기
async function fetchLatestVersion(): Promise<string | null> {
  const versionResponse = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );

  if (!versionResponse.ok) {
    console.error("버전을 가져오지 못했습니다.");
    return null;
  }

  const versions = await versionResponse.json();
  return versions[0]; // 최신 버전
}

// 챔피언 목록 가져오기
async function fetchChampions(version: string): Promise<Champion[]> {
  const championsResponse = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
  );

  if (!championsResponse.ok) {
    console.error("챔피언을 가져오지 못했습니다.");
    return [];
  }

  const data = await championsResponse.json();
  const champions: ChampionAPIData[] = Object.values(
    data.data
  ) as ChampionAPIData[];

  return champions.map((champ: ChampionAPIData) => ({
    id: champ.id,
    name: champ.name,
    title: champ.title,
    image: champ.image,
  }));
}

export async function GET() {
  const version = await fetchLatestVersion();

  if (!version) {
    return NextResponse.json(
      { error: "최신 버전을 가져오지 못했습니다." },
      { status: 500 }
    );
  }

  const champions = await fetchChampions(version);

  if (champions.length === 0) {
    return NextResponse.json(
      { error: "챔피언을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json({ version, champions });
}
