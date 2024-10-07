"use client";

import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
  image: {
    full: string;
  };
}

export default function ItemListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null); // 버전 상태 추가

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        if (!response.ok) {
          throw new Error("아이템을 가져오지 못했습니다.");
        }

        const data = await response.json();
        console.log(data);
        setItems(data.items);
        setVersion(data.version); // 데이터에서 버전 설정
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

    fetchItems();
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
        <h1 className="text-4xl font-bold mb-6 text-center">아이템 목록</h1>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.map((item) => {
            const cleanDescription = item.description.replace(
              /<\/?[^>]+(>|$)/g,
              ""
            );

            return (
              <li
                key={item.image.full}
                className="p-4 border border-gray-700 rounded-lg shadow-md"
              >
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover mb-2 mx-auto rounded-full"
                />
                <h2 className="text-lg font-semibold text-center">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-400 text-center">
                  {cleanDescription}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
