import { useEffect, useState } from "react";
import TopNavigation from "../components/TopNavigation";
import { useSearchParams } from "react-router";
import { addToast } from "@heroui/react";

export default function Logs() {
  //http://54.232.23.236:8080/api/AirQuality/ByStationId/6c1b6204-05d4-4bd2-8437-d070a9225124
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get("id");

  const [airQualityLogs, setAirQualityLogs] = useState([]);

  async function fetchLogs() {
    const response = await fetch(
      `http://54.232.23.236:8080/api/AirQuality/ByStationId/${urlId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data.data);
    if (data.data === null) {
      setAirQualityLogs([]);
      addToast({
        title: data.message,
      });
    } else {
      setAirQualityLogs(data.data);
      // addToast({
      //   title: data.data[0],
      // });
    }
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      <TopNavigation></TopNavigation>
      <div className="p-8 m-auto max-w-[1024px] bg-foreground-900 rounded-[8px] mt-8">
        air quality page
      </div>
    </>
  );
}
