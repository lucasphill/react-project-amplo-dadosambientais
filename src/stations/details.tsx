import {
  addToast,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import TopNavigation from "../components/TopNavigation";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import LoadScreen from "../components/LoadScreen";

export default function Details() {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get("id");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [obs, setObs] = useState("");
  const [id, setId] = useState("");

  async function fetchStation() {
    const response = await fetch(`${apiUrl}/api/Station/${urlId}`, {
      method: "GET",
    });
    const data = await response.json();
    setName(data.data.name);
    setObs(data.data.obs);
    setId(data.data.id);
    setLoading(false);
  }

  useEffect(() => {
    fetchStation();
  }, []);

  async function onUpdateStationSubmit(name: string, obs: string, id: string) {
    const formData = { name, obs };

    const response = await fetch(`${apiUrl}/api/Station?Id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      addToast({
        title: formData.name,
        description: "Estação editada com sucesso",
      });
      navigate("/");
    } else {
      const data = await response.json();
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
        <div className="m-auto mb-4">
          <Breadcrumbs>
            <BreadcrumbItem onPress={() => navigate(-1)}>Home</BreadcrumbItem>
            <BreadcrumbItem>Station Edit</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="pt-6 w-full max-w gap-12">
          <Input
            required
            label="Nome da estação"
            labelPlacement="inside"
            name="Name"
            placeholder="Nome da estação"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Textarea
            className="mt-4"
            label="Observações"
            name="Obs"
            placeholder="Enter your description"
            value={obs}
            onChange={(event) => setObs(event.target.value)}
          />
          <Button
            className="mt-4 w-full"
            onPress={() => onUpdateStationSubmit(name, obs, id)}
            type="submit"
            variant="bordered"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
