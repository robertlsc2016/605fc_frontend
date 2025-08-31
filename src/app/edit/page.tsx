"use client";
import { getPlayers } from "@/services/users.service";
import { Player } from "@/types/player";
import { Button, DatePicker } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import api from "@/services/api";

interface PlayerStats {
  playerId: string;
  nickname: string;
  goals: number;
  assists: number;
  errors: number;
}

export default function EditPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [stats, setStats] = useState<PlayerStats[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    fetchPlayers().then((players) => {
      setPlayers(players);
      setStats(
        players
          .filter((p) => typeof p._id === "string")
          .map((p) => ({
            playerId: p._id as string,
            nickname: p.nickname,
            goals: 0,
            assists: 0,
            errors: 0,
          }))
      );
    });
  }, []);

  const fetchPlayers = async (): Promise<Player[]> => {
    try {
      const players = await getPlayers();
      return players;
    } catch (error) {
      return [];
    }
  };

  const inputFocusStyle: React.CSSProperties = {
    width: "60px",
    textAlign: "center",
    padding: "4px",
    border: "2px solid #1976d2",
    outline: "none",
    boxShadow: "0 0 4px #1976d2",
  };

  const handleChange = (
    playerId: string,
    field: keyof Omit<PlayerStats, "playerId" | "nickname">,
    value: number
  ) => {
    setStats((prev) =>
      prev.map((s) => (s.playerId === playerId ? { ...s, [field]: value } : s))
    );
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      alert("Selecione uma data antes de salvar.");
      return;
    }

    try {
      const payload = {
        date: selectedDate.format("YYYY-MM-DD"),
        playersStats: stats,
      };

      const response = await api.post("/add-history/all", payload);
      alert(response.data.message || "Histórico salvo com sucesso!");
    } catch (error: any) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Ocorreu um erro ao salvar o histórico."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          background: "#fff",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Jogador</th>
            <th style={thStyle}>Gols</th>
            <th style={thStyle}>Assists</th>
            <th style={thStyle}>Erros</th>
          </tr>
        </thead>
        <tbody>
          {players
            .filter((player) => typeof player._id === "string")
            .map((player) => {
              const playerStat = stats.find((s) => s.playerId === player._id);
              return (
                <tr key={player._id}>
                  <td style={tdStyle}>{player.nickname}</td>
                  <td style={tdStyle}>
                    <input
                      type="number"
                      style={inputFocusStyle}
                      value={playerStat?.goals || 0}
                      onChange={(e) =>
                        handleChange(
                          player._id as string,
                          "goals",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number"
                      style={inputFocusStyle}
                      value={playerStat?.assists || 0}
                      onChange={(e) =>
                        handleChange(
                          player._id as string,
                          "assists",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number"
                      style={inputFocusStyle}
                      value={playerStat?.errors || 0}
                      onChange={(e) =>
                        handleChange(
                          player._id as string,
                          "errors",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          format="DD/MM/YYYY"
          disabledDate={(current) => {
            return current && current.isAfter(dayjs(), "day"); // bloqueia datas após hoje
          }}
        />

        <Button style={{ padding: "8px 16px" }} onClick={handleSubmit}>
          Salvar
        </Button>
      </div>
    </div>
  );
}

// Reutilizáveis
const thStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
  background: "#f0f0f0",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "6px",
  textAlign: "center",
  width: "30px",
  height: "40px",
};
