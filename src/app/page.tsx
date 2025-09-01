"use client";
import PlayerCard from "@/components/playerCard";
import { getPlayers } from "@/services/users.service";
import { Player } from "@/types/player";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [users, setUsers] = useState<Player[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const fetchUsers = async (): Promise<Player[]> => {
    try {
      const users = await getPlayers();
      console.log("Usuários buscados:", users);
      return users;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  };

  return (
    <div className="w-full h-full  flex flex-col items-center justify-start  p-2 ">
      <h1 className="text-[32px] text-white text-center">
        Ranking<br></br>605 FC
      </h1>

      <div className="flex flex-col gap-5 w-[100%] max-w-[512px] bg-[#b7b7b7] rounded-t-[24px] h-auto p-4 min-h-[100vh]">
        {/* CARD */}

        {users.map((user) => (
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
    </div>
  );
}
