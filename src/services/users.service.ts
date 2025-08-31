import api from "./api";
import { Player } from "@/types/player";

export const getPlayers = async (): Promise<Player[]> => {
  const { data } = await api.get("/players");
  return data;
};

export const getPlayer = async ({
  nickname
}: {
  nickname: string;
}): Promise<Player | []> => {
  const { data } = await api.get(`/${nickname}`);
  return data;
};

export const createPlayer = async (user: Player): Promise<Player> => {
  const { data } = await api.post("/add-player", user);
  return data;
};
