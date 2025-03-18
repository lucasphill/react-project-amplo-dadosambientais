import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AirQuality, AirQualityLog } from "../airquality/columns";

interface AirQualityTableProps {
  airQualityLogs: AirQuality[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AirQualityChart({ airQualityLogs }: AirQualityTableProps) {
  const arrayDeDados = airQualityLogs.map((item) => item.data);
  const arrayDeDatas = airQualityLogs.map((item) => item.insertTimeStamp);

  const valoresSeparados: { [key: string]: [] } = {};

  // Coletando todas as chaves únicas
  arrayDeDados.forEach((obj) => {
    Object.keys(obj).forEach((chave) => {
      if (!valoresSeparados[chave]) {
        valoresSeparados[chave] = [];
      }
    });
  });

  // Adiciona os valores das chaves
  // arrayDeDados: //(13) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…
  // obj: //{Ozonio: 54, DioxidoDeEnxofre: 2, MonoxidoDeCarbono: 4, OxidosDeNitrogenio: 3, DioxidoDeNitrogenio: 8...}
  // valoresSeparados: //DioxidoDeEnxofre: (13) [8.49, 8, 8, 4, 0, 4, 4, 618, 618, 618, 618, 618, 2
  arrayDeDados.forEach((obj: AirQualityLog) => {
    Object.keys(valoresSeparados).forEach((chave) => {
      if (chave in obj) {
        const valor = obj[chave as keyof AirQualityLog]; // Faz o cast para a chave correta
        (valoresSeparados[chave] as (number | null)[]).push(valor ?? null); // Adiciona o valor ao array correspondente
      } else {
        // console.warn(`A chave "${chave}" não existe no objeto.`);
      }
    });
  });

  const dataForChart = {
    labels: arrayDeDatas.map((item) => item),
    datasets: Object.keys(valoresSeparados).map((chave, index) => ({
      label: chave, // Nome da chave como rótulo
      data: valoresSeparados[chave], // Lista de valores correspondente à chave
      borderColor: `hsl(${(index * 50) % 360}, 70%, 50%)`, // Gera cores dinâmicas para diferenciar as linhas
      fill: false,
    })),
  };

  return (
    <>
      <div className="text-2xl mb-12">
        <Line data={dataForChart} />
      </div>
    </>
  );
}

export default AirQualityChart;
