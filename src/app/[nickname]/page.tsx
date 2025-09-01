"use client";

import { getPlayer } from "@/services/users.service";
import { Player } from "@/types/player";
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin, Table, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [player, setPlayer] = useState<Player>();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const nickname = params.nickname; // pega "osso" da URL /osso

  useEffect(() => {
    fetchPlayer().then((player) => {
      setPlayer(player[0]);

      if (player[0]) {
        setIsLoading(false);
      }
    });
  }, []);

  const fetchPlayer = async (): Promise<Player | any> => {
    try {
      const user = await getPlayer({
        nickname: nickname as string,
      });

      if ((Array.isArray(user) && user.length === 0) || user == null) {
        window.location.href = "/";
      }

      return user;
    } catch (error) {
      window.location.href = "/";
      console.error("Erro ao buscar usuário:", error);
      return [];
    }
  };
  return (
    <div className="w-full h-full  flex flex-col items-center justify-start  p-2 ">
      <div
        className="flex justify-start items-center  flex-col w-[100%] max-w-[512px] bg-[#b7b7b7] rounded-t-[24px] h-auto p-4 min-h-[100vh]"
        style={{ position: "relative", gap: "8px" }}
      >
        {isLoading ? (
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        ) : (
          <>
            <Link href="/ranking">
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                }}
              >
                <LeftOutlined
                  style={{
                    fontSize: "24px",
                    backgroundColor: "#ffffff",
                    borderRadius: "50%",
                    padding: "8px",
                  }}
                />
              </div>
            </Link>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "128px",
                height: "128px",
                background: `linear-gradient(45deg, #ffa200 0%,#ffff00d9 25%,#dc2743 50%,#ff0095 75%,#ff01ae 100%)`,

                backgroundColor: "#f09433",
                borderRadius: "50%",
                padding: "3px",
              }}
              className=""
            >
              <Image
                width={128}
                height={128}
                alt="player photo"
                style={{
                  width: "100%",
                  height: "100%",

                  // border: "3px solid gray",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  border: "3px solid black",
                }}
                src={
                  player?.photo ||
                  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                }
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[32px]">
                {decodeURIComponent(nickname ? String(nickname) : "")}
              </h2>
              <p className="text-[16px] italic text-center text-[#575757]">
                {decodeURIComponent(
                  player?.description ? String(player?.description) : ""
                ) || "Sem descrição"}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                // height: "100%",
                width: "100%",
                // border: "1px solid #000",
              }}
              className="pt-4 flex flex-row gap-1"
            >
              <Tooltip placement="top" title={"gols"}>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[22px]">⚽</p>
                  <p className="text-[#06d748] text-[24px] font-[500]">
                    {player?.goals}
                  </p>
                </div>
              </Tooltip>

              <Tooltip placement="top" title={"assistências"}>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[22px]">🤝</p>
                  <p className="text-[24px]">{player?.assists}</p>
                </div>
              </Tooltip>

              <Tooltip placement="top" title={"falhas"}>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[22px]">❌</p>
                  <p className="text-[16px]">{player?.errors}</p>
                </div>
              </Tooltip>
            </div>

            <div className="w-full">
              <div className=" flex flex-row justify-start items-center gap-2 ">
                <h2
                  style={{
                    fontSize: "36px",
                    fontWeight: "600",
                    marginTop: "24px",
                    marginBottom: "24px",
                  }}
                >
                  Histórico
                </h2>
              </div>

              {player?.history.length === 0 ? (
                <p className="text-[16px] italic text-center text-[#575757]">
                  Nenhum dado de histórico disponível.
                </p>
              ) : (
                <div>
                  <Table
                    dataSource={player?.history.map((item, index) => ({
                      ...item,
                      key: index,
                      date: new Date(item.date).toLocaleDateString("pt-BR"),
                    }))}
                    columns={[
                      {
                        title: "data partida",
                        dataIndex: "date",
                        // key: "date",
                      },
                      {
                        title: "⚽",
                        dataIndex: "goals",
                        // key: "date",
                        align: "center",
                      },
                      {
                        title: "🤝",
                        dataIndex: "assists",
                        align: "center",

                        // key: "date",
                      },
                      {
                        title: "❌",
                        dataIndex: "errors",
                        align: "center",

                        // key: "date",
                      },
                    ]}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
