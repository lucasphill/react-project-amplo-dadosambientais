import { addToast, Button, Input, Textarea } from "@heroui/react";
import TopNavigation from "../components/TopNavigation";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function Details() {
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get("id");

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [obs, setObs] = useState("");
  const [id, setId] = useState("");

  async function fetchStation() {
    const response = await fetch(`http://loadlens:8080/api/Station/${urlId}`, {
      method: "GET",
    });
    const data = await response.json();
    setName(data.data.name);
    setObs(data.data.obs);
    setId(data.data.id);
    console.log(data.data);
  }

  useEffect(() => {
    fetchStation();
  }, []);

  async function onUpdateStationSubmit(name: string, obs: string, id: string) {
    const formData = { name, obs };

    const response = await fetch(`http://loadlens:8080/api/Station?Id=${id}`, {
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
      console.log(data);
      addToast({
        title: data.message,
      });
    }
  }

  return (
    <>
      <TopNavigation></TopNavigation>
      <div className="p-8 m-auto max-w-[1024px] bg-foreground-900 rounded-[8px] mt-8">
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
