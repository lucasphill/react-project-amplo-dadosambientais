import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
} from "@heroui/react";
import { columns, renderCell, AirQuality } from "../airquality/columns";
import { useCallback, useMemo, useState } from "react";
import { SearchIcon } from "./icons";

interface AirQualityTableProps {
  airQualityLogs: AirQuality[];
  onDeleteLogSubmit: (id: string) => void;
}

export default function AirQualityTable({
  airQualityLogs,
  onDeleteLogSubmit,
}: AirQualityTableProps) {
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredStations = [...airQualityLogs];

    if (hasSearchFilter) {
      filteredStations = filteredStations.filter((airQualityLogs) =>
        JSON.stringify(airQualityLogs.data)
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    return filteredStations;
  }, [airQualityLogs, filterValue, hasSearchFilter]);

  //#region pagination
  const rowsPerPage = 5;
  const [page, setPage] = useState(1);
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);
  //#endregion

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by station name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear]);

  return (
    <div className="">
      <Table
        aria-label="Example table with dynamic content"
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent="No stations to display">
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey, () =>
                    onDeleteLogSubmit(item.id)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
