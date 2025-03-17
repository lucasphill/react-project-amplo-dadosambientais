import { useState } from "react";
import { Button, Input, Textarea } from "@heroui/react";

interface StationFormsProps {
  onAddStationSubmit: (name: string, obs: string) => void;
}

function StationForm(props: StationFormsProps) {
  const [name, setName] = useState("");
  const [obs, setObs] = useState("");

  return (
    <>
      <div className="text-2xl">
        <h1>Insert new station</h1>
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
          className="mt-4"
          onPress={() => props.onAddStationSubmit(name, obs)}
          type="submit"
          variant="bordered"
        >
          Adicionar
        </Button>
      </div>
    </>
  );
}

export default StationForm;
