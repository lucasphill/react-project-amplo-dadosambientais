import {
  CircleStack,
  DeleteIcon,
  EditIcon,
  EyeIcon,
} from "../components/icons";
import React from "react";
import { Tooltip } from "@heroui/react";

export type Station = {
  id: string;
  name: string;
  obs: string;
  insertTimeStamp: string;
};

export const columns = [
  {
    key: "name",
    label: "NAME",
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
  station: Station,
  columnKey: React.Key,
  onDeleteStationSubmit: (id: string) => void,
  onSeeDetailsClick: () => void,
  onSeeLogsClick: () => void
) => {
  const cellValue = station[columnKey as keyof Station];

  switch (columnKey) {
    case "insertTimeStamp":
      return <span>{new Date(cellValue).toLocaleDateString()}</span>;
    case "actions":
      return (
        <>
          <div className="relative flex items-center gap-2">
            <Tooltip content="Logs">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon onClick={() => onSeeLogsClick()} />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => onSeeDetailsClick()} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => onDeleteStationSubmit(station.id)} />
              </span>
            </Tooltip>
          </div>
        </>
      );
    default:
      return cellValue;
  }
};
