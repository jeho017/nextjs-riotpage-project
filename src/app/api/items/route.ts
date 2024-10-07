import { NextResponse } from "next/server";

interface ItemAPIData {
  id: string;
  name: string;
  description: string;
  image: {
    full: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface Item {
  id: string;
  name: string;
  description: string;
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

// 아이템 목록 가져오기
async function fetchItems(version: string): Promise<Item[]> {
  const itemsResponse = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/item.json`
  );

  if (!itemsResponse.ok) {
    console.error("아이템을 가져오지 못했습니다.");
    return [];
  }

  const data = await itemsResponse.json();
  const items: ItemAPIData[] = Object.values(data.data) as ItemAPIData[];

  // 필요한 데이터만 추출하여 Item 타입으로 반환
  return items.map((item: ItemAPIData) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    image: {
      full: item.image.full,
    },
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

  const items = await fetchItems(version);

  if (items.length === 0) {
    return NextResponse.json(
      { error: "아이템을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json({ items, version });
}
