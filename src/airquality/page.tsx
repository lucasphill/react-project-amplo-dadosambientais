import { useEffect, useState } from "react";
import TopNavigation from "../components/TopNavigation";
import { useSearchParams } from "react-router";
import { addToast, Divider } from "@heroui/react";
import AirQualityTable from "../components/AirQualityTable";
import AirQualityForm from "../components/AirQualityForm";
import AirQualityChart from "../components/AirQualityChart";

export default function AirQuality() {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get("id");

  const [airQualityLogs, setAirQualityLogs] = useState([]);

  async function fetchLogs() {
    const response = await fetch(
      `${apiUrl}/api/AirQuality/ByStationId/${urlId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (data.data === null) {
      setAirQualityLogs([]);
      addToast({
        title: data.message,
      });
    } else {
      setAirQualityLogs(data.data);
      // console.log("Dados:", data.data);
      // addToast({
      //   title: data.message,
      // });
    }
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  async function onDeleteLogSubmit(id: string) {
    const response = await fetch(`${apiUrl}/api/AirQuality?Id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(response.status);
      addToast({
        description: "Log removido com sucesso",
      });
      fetchLogs();
    } else {
      const data = await response.json();
      console.log(data.message);
      addToast({
        title: data.message,
      });
    }
  }

  async function onAddLogSubmit(data: object, obs: string) {
    const stationId = urlId;
    const formData = { data, obs, stationId };
    // console.log(formData);

    const response = await fetch(`${apiUrl}/api/AirQuality`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    if (response.ok) {
      addToast({
        title: "Log adicionado com sucesso",
      });
      fetchLogs();
    } else {
      console.log(responseData);
      addToast({
        title:
          "Ocorreu um erro ao inserir os dados, tente novamente mais tarde",
      });
    }
  }

  return (
    <>
      <TopNavigation></TopNavigation>
      <div className="p-8 m-auto max-w-[1024px] bg-foreground-900 rounded-[8px] mt-8">
        <AirQualityChart airQualityLogs={airQualityLogs}></AirQualityChart>
        <AirQualityTable
          airQualityLogs={airQualityLogs}
          onDeleteLogSubmit={onDeleteLogSubmit}
        ></AirQualityTable>
        <Divider className="my-4" />
        <AirQualityForm onAddLogSubmit={onAddLogSubmit}></AirQualityForm>
      </div>
    </>
  );
}
