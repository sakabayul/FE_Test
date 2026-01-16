import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Typography, Box } from "@mui/material";

const BarChart = ({ title, data }) => {
  const options = {
    chart: { type: "column" },
    title: { text: title },
    xAxis: { categories: data.categories },
    yAxis: { title: { text: "Jumlah Lalin" } },
    series: [
      {
        name: "Total",
        data: data.series,
      },
    ],
    credits: {
      enabled: false,
    },
  };
  console.log("BarChart data:", data);
  return (
    <>
      {data.categories.length > 0 && data.series.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={200}
        >
          <Typography variant="body2" color="text.secondary">
            Data {title} tidak tersedia!
          </Typography>
        </Box>
      )}
    </>
  );
};

export default BarChart;
