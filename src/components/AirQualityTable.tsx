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
import {
  AirQuality,
  AirQualityLog,
  columns,
  renderCell,
} from "../airquality/columns";
import { useCallback, useMemo, useState } from "react";
import { SearchIcon } from "./icons";
import AirQualityModal from "./AirQualityModal";

interface AirQualityTableProps {
  airQualityLogs: AirQuality[];
  onDeleteLogSubmit: (id: string) => void;
}

interface ModalContent {
  data: AirQualityLog;
  obs: string;
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

  const defaultAirQualityLog: AirQualityLog = {
    partículasInalaveis2: 0,
    particulasInalaveis10: 0,
    partículasTotaisEmSuspensao: 0,
    dioxidoDeEnxofre: 0,
    monoxidoDeCarbono: 0,
    dioxidoDeNitrogenio: 0,
    monoxidoDeNitrogenio: 0,
    oxidosDeNitrogenio: 0,
    ozonio: 0,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    data: defaultAirQualityLog,
    obs: "",
  });

  const openModal = (data: AirQualityLog, obs: string) => {
    setModalContent({ data, obs });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
                  {renderCell(
                    item,
                    columnKey,
                    () => onDeleteLogSubmit(item.id),
                    () => {
                      openModal(item.data, item.obs);
                      console.log("item.data ", item.data);
                    }
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AirQualityModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        data={modalContent.data}
        obs={<p>{modalContent.obs}</p>}
        onClose={closeModal}
      ></AirQualityModal>
    </div>
  );
}
