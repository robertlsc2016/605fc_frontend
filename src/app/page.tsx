"use client";
import PlayerCard from "@/components/playerCard";
import { getPlayers } from "@/services/users.service";
import { Player } from "@/types/player";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((players) => {
      setPlayers(players);
      setIsLoading(false);
    });
  }, []);

  const fetchUsers = async (): Promise<Player[]> => {
    try {
      const users = await getPlayers();
      return users;
    } catch (error) {
      return [];
    }
  };

  return (
    <div className="w-full h-full  flex flex-col items-center justify-start  p-2 ">
      <h1 className="text-[32px] text-white text-center">
        Ranking<br></br>605 FC
      </h1>

      {/* CARD */}
      {isLoading ? (
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                marginTop: "96px",
                  fontSize: "48px",
              }}
              spin
            />
          }
          size="large"
        />
      ) : (
        <div
          style={{
            // minHeight: "100vh",
            height: "auto",
          }}
          className=" flex flex-col gap-5 w-[100%] max-w-[512px] bg-[#b7b7b7] rounded-t-[24px] p-4"
        >
          {players.map((user) => (
            <PlayerCard
              key={user._id}
              name={user.name}
              nickname={user.nickname}
              goals={user.goals}
              assists={user.assists}
              errors={user.errors}
              history={user.history}
              photo={user.photo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
