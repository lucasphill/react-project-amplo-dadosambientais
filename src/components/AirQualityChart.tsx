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
import { object } from "framer-motion/client";

interface AirQualityTableProps {
  airQualityLogs: object[];
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

  const valoresSeparados = {};

  // Coletando todas as chaves únicas
  arrayDeDados.forEach((obj) => {
    Object.keys(obj).forEach((chave) => {
      if (!valoresSeparados[chave]) {
        valoresSeparados[chave] = [];
      }
    });
  });

  // Adiciona os valores das chaves
  arrayDeDados.forEach((obj) => {
    Object.keys(valoresSeparados).forEach((chave) => {
      valoresSeparados[chave].push(obj[chave] ?? null); // Se a chave não existir no objeto, adiciona `null`
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
