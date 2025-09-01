import { Player } from "@/types/player";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function PlayerCard({
  name,
  nickname,
  photo,
  goals,
  assists,
  errors,
}: Player) {
  return (
    <Link href={`/${nickname}`}>
      <div
        className="flex flex-row justify-between items-center w-[100%] h-auto bg-[#ffffff] rounded-[16px] p-2"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",

            height: "100%",
            width: "60%",
            // border: "1px solid red",
          }}
          className="flex flex-row gap-2 items-center justify-center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "80px",
              height: "80px",
              background: `linear-gradient(45deg, #ffa200 0%,#ffff00d9 25%,#dc2743 50%,#ff0095 75%,#ff01ae 100%)`,

              backgroundColor: "#f09433",
              borderRadius: "50%",
              padding: "3px",
            }}
            className=""
          >
            <Image
              width={80}
              height={80}
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
                photo ||
                "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              }
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              flex: 1, // ocupa o restante
              minWidth: 0, // necessário para o text-overflow funcionar
            }}

            // className="flex flex-col justify-center items-start h-[100%]"
          >
            <p
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "16px",
                fontWeight: 500,
                // border: "1px solid blue",
                width: "100%",
              }}
              // className="text-[16px] font-[500]"
            >
              {nickname}
            </p>
            <p className="text-[12px] text-[#74747489]">{name}</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "100%",
            width: "40%",
            // border: "1px solid #000",
          }}
          className="flex flex-row gap-1"
        >
          <Tooltip placement="top" title={"gols"}>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[22px]">⚽</p>
              <p className="text-[#06d748] text-[16px] font-[500]">{goals}</p>
            </div>
          </Tooltip>

          <Tooltip placement="top" title={"assistências"}>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[22px]">🤝</p>
              <p className="text-[16px]">{assists}</p>
            </div>
          </Tooltip>

          <Tooltip placement="top" title={"falhas"}>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[22px]">❌</p>
              <p className="text-[16px]">{errors}</p>
            </div>
          </Tooltip>
        </div>
      </div>
    </Link>
  );
}
