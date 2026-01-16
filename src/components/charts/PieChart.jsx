import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Typography, Box } from "@mui/material";

const PieChart = ({ title, data }) => {
  const options = {
    chart: { type: "pie" },
    title: { text: title },
    series: [
      {
        name: "Total",
        data,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <>
      {Array.isArray(data) && data.length > 0 ? (
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

export default PieChart;
