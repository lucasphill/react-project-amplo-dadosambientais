import { addToast, Divider } from "@heroui/react";
import AddStation from "../components/StationForm";
import StationTable from "../components/StationTable";
import TopNavigation from "../components/TopNavigation";
import { Station } from "./columns";
import { useEffect, useState } from "react";
import LoadScreen from "../components/LoadScreen";

export default function Stations() {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const [loading, setLoading] = useState(true);

  const [stations, setStations] = useState<Station[]>([]);
  async function fetchStations() {
    const response = await fetch(`${apiUrl}/api/Station`, {
      method: "GET",
    });
    const data = await response.json();
    setStations(data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchStations();
  }, []);

  async function onAddStationSubmit(name: string, obs: string) {
    const formData = { name, obs };

    const response = await fetch(`${apiUrl}/api/Station`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      addToast({
        title: formData.name,
        description: "Estação cadastrada com sucesso",
      });
      fetchStations();
    } else {
      console.log(data);
      addToast({
        title: data.message,
      });
    }
  }

  async function onDeleteStationSubmit(id: string) {
    const response = await fetch(`${apiUrl}/api/Station?Id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(response.status);
      addToast({
        description: "Estação removida com sucesso",
      });
      fetchStations();
    } else {
      const data = await response.json();
      console.log(data.message);
      addToast({
        title: data.message,
      });
    }
  }

  if (loading) {
    <LoadScreen></LoadScreen>;
  }

  return (
    <>
      <TopNavigation></TopNavigation>
      <div className="p-8 m-auto max-w-[1024px] bg-foreground-900 rounded-[8px] mt-8">
        <StationTable
          stations={stations}
          onDeleteStationSubmit={onDeleteStationSubmit}
        ></StationTable>
        <Divider className="my-4" />
        <AddStation onAddStationSubmit={onAddStationSubmit}></AddStation>
      </div>
    </>
  );
}
