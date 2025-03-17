import { useState } from "react";
import { Button, Input } from "@heroui/react";

interface AirqualityFormsProps {
  onAddLogSubmit: (data: object, obs: string) => void;
}

function AirQualityForm(props: AirqualityFormsProps) {
  const [obs, setObs] = useState("");

  const [ParticulasInalaveis2, setParticulasInalaveis2] = useState("");
  const [ParticulasInalaveis10, setParticulasInalaveis10] = useState("");
  const [ParticulasTotaisEmSuspensao, setParticulasTotaisEmSuspensao] =
    useState("");
  const [DioxidoDeEnxofre, setDioxidoDeEnxofre] = useState("");
  const [MonoxidoDeCarbono, setMonoxidoDeCarbono] = useState("");
  const [DioxidoDeNitrogenio, setDioxidoDeNitrogenio] = useState("");
  const [MonoxidoDeNitrogenio, setMonoxidoDeNitrogenio] = useState("");
  const [OxidosDeNitrogenio, setOxidosDeNitrogenio] = useState("");
  const [Ozonio, setOzonio] = useState("");

  return (
    <>
      <div className="text-2xl">
        <h1>Insert new air quality log</h1>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 mt-4">
          <Input
            label="Partículas Inalaveis < 10µm (µg/m³)"
            labelPlacement="inside"
            name="ParticulasInalaveis10"
            type="number"
            onChange={(event) => setParticulasInalaveis10(event.target.value)}
          />
          <Input
            label="Partículas Inalaveis < 2µm (µg/m³)"
            labelPlacement="inside"
            name="ParticulasInalaveis2"
            type="number"
            onChange={(event) => setParticulasInalaveis2(event.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2">
          <Input
            label="Partículas totais em suspensao (µg/m³)"
            labelPlacement="inside"
            name="ParticulasTotaisEmSuspensao"
            type="number"
            onChange={(event) =>
              setParticulasTotaisEmSuspensao(event.target.value)
            }
          />
          <Input
            label="Dióxido de enxofre (µg/m³)"
            labelPlacement="inside"
            name="DioxidoDeEnxofre"
            type="number"
            onChange={(event) => setDioxidoDeEnxofre(event.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2">
          <Input
            label="Monóxido de carbono (µg/m³)"
            labelPlacement="inside"
            name="MonoxidoDeCarbono"
            type="number"
            onChange={(event) => setMonoxidoDeCarbono(event.target.value)}
          />
          <Input
            label="Dióxido de nitrogênio (µg/m³)"
            labelPlacement="inside"
            name="DioxidoDeNitrogenio"
            type="number"
            onChange={(event) => setDioxidoDeNitrogenio(event.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2">
          <Input
            label="Monóxido de nitrogênio (µg/m³)"
            labelPlacement="inside"
            name="MonoxidoDeNitrogenio"
            type="number"
            onChange={(event) => setMonoxidoDeNitrogenio(event.target.value)}
          />
          <Input
            label="Óxidos de nitrogênio (µg/m³)"
            labelPlacement="inside"
            name="OxidosDeNitrogenio"
            type="number"
            onChange={(event) => setOxidosDeNitrogenio(event.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2">
          <Input
            label="Ozônio (µg/m³)"
            labelPlacement="inside"
            name="Ozonio"
            type="number"
            onChange={(event) => setOzonio(event.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2">
          <Input
            label="Notes"
            name="Obs"
            placeholder="Enter your description"
            value={obs}
            onChange={(event) => setObs(event.target.value)}
          />
        </div>
        <Button
          onPress={() => {
            const logData = {
              partículasInalaveis2: ParticulasInalaveis2,
              particulasInalaveis10: ParticulasInalaveis10,
              partículasTotaisEmSuspensao: ParticulasTotaisEmSuspensao,
              dioxidoDeEnxofre: DioxidoDeEnxofre,
              monoxidoDeCarbono: MonoxidoDeCarbono,
              dioxidoDeNitrogenio: DioxidoDeNitrogenio,
              monoxidoDeNitrogenio: MonoxidoDeNitrogenio,
              oxidosDeNitrogenio: OxidosDeNitrogenio,
              ozonio: Ozonio,
            };

            props.onAddLogSubmit(logData, obs);
            console.log("Enviando JSON:", JSON.stringify(logData, null, 2));
          }}
          type="submit"
          variant="bordered"
        >
          Adicionar
        </Button>
      </div>
    </>
  );
}

export default AirQualityForm;
