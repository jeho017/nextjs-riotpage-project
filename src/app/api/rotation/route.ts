import { NextResponse } from "next/server";

// Riot Games API 키 가져오기
const RIOT_API_KEY = process.env.RIOT_API_KEY;

if (!RIOT_API_KEY) {
  throw new Error("Riot API 키가 환경 변수에 없습니다.");
}

// Champion Rotation 타입 정의
interface ChampionRotation {
  freeChampionIds: number[]; // 무료 챔피언 ID 목록
  freeChampionIdsForNewPlayers: number[]; // 신입 플레이어용 무료 챔피언 ID 목록
  maxNewPlayerLevel: number; // 신입 플레이어로 간주되는 최대 레벨
}

// Riot Games API에서 챔피언 로테이션 데이터 가져오기
async function fetchChampionRotation(): Promise<ChampionRotation | null> {
  const response = await fetch(
    "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
    {
      headers: {
        "X-Riot-Token": RIOT_API_KEY!,
      },
    }
  );

  if (!response.ok) {
    console.error("챔피언 로테이션 데이터를 가져오지 못했습니다.");
    return null;
  }

  return response.json();
}

// GET 요청 처리
export async function GET() {
  const championRotation = await fetchChampionRotation();

  if (!championRotation) {
    return NextResponse.json(
      { error: "챔피언 로테이션 데이터를 가져오지 못했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(championRotation);
}
