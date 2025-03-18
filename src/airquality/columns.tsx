import { DeleteIcon, EyeIcon } from "../components/icons";
import React from "react";
import { Tooltip } from "@heroui/react";

export type AirQuality = {
  id: string;
  data: AirQualityLog;
  obs: string;
  insertTimeStamp: string;
  stationId: string;
};

export type AirQualityLog = {
  partículasInalaveis2: number;
  particulasInalaveis10: number;
  partículasTotaisEmSuspensao: number;
  dioxidoDeEnxofre: number;
  monoxidoDeCarbono: number;
  dioxidoDeNitrogenio: number;
  monoxidoDeNitrogenio: number;
  oxidosDeNitrogenio: number;
  ozonio: number;
};

export const columns = [
  {
    key: "data",
    label: "DATA STRING",
  },
  {
    key: "obs",
    label: "OBSERVATIONS",
  },
  {
    key: "insertTimeStamp",
    label: "ADD DATE",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

export const renderCell = (
  airQualityLogs: AirQuality,
  columnKey: React.Key,
  onDeleteLogSubmit: (id: string) => void,
  onOpenModalClick: () => void
) => {
  const cellValue = airQualityLogs[columnKey as keyof AirQuality];

  switch (columnKey) {
    case "insertTimeStamp":
      if (typeof cellValue !== "string") {
        return <span>Data Inválida</span>;
      }
      return <span>{new Date(cellValue).toLocaleDateString()}</span>;
    case "data":
      return (
        <span className="cursor-pointer" onClick={() => onOpenModalClick()}>
          {JSON.stringify(cellValue).slice(0, 55)}
        </span>
      );
    case "actions":
      return (
        <>
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon onClick={() => onOpenModalClick()} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon
                  onClick={() => onDeleteLogSubmit(airQualityLogs.id)}
                />
              </span>
            </Tooltip>
          </div>
        </>
      );
    default:
      if (cellValue) {
        return cellValue.toString();
      } else {
        return null;
      }
  }
};
