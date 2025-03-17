import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  SortDescriptor,
} from "@heroui/react";
import { columns, renderCell, Station } from "../stations/columns";
import { useCallback, useMemo, useState } from "react";
import { SearchIcon } from "./icons";
import { useNavigate } from "react-router";

interface StationTableProps {
  stations: Station[];
  onDeleteStationSubmit: (id: string) => void;
}

export default function StationTable({
  stations,
  onDeleteStationSubmit,
}: StationTableProps) {
  //#region top filter
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredStations = [...stations];

    if (hasSearchFilter) {
      filteredStations = filteredStations.filter((station) =>
        station.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredStations;
  }, [stations, filterValue, hasSearchFilter]);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);
  //#endregion

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

  //#region sort CORRIGIR ERRO DE SORT SOMENTE NA PAGINA FILTRADA
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "insertTimeStamp",
    direction: "descending",
  });

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Station] as string;
      const second = b[sortDescriptor.column as keyof Station] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  //#endregion

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

  const navigateEditStation = useNavigate();
  function onSeeDetailsClick(id: string) {
    const query = new URLSearchParams();
    query.set("id", id);
    navigateEditStation(`/Station?${query.toString()}`);
  }

  const navigateLogsStation = useNavigate();
  function onSeeLogsClick(id: string) {
    const query = new URLSearchParams();
    query.set("id", id);
    navigateLogsStation(`/Logs/Station?${query.toString()}`);
  }

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
        // bottomContentPlacement="outside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              {...(column.key === "name" ||
              column.key === "obs" ||
              column.key === "insertTimeStamp"
                ? { allowsSorting: true }
                : {})}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems} emptyContent="No stations to display">
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    item,
                    columnKey,
                    () => onDeleteStationSubmit(item.id),
                    () => onSeeDetailsClick(item.id),
                    () => onSeeLogsClick(item.id)
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
