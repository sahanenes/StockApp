import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import Charts from "../components/Charts";
import KpiCards from "../components/KpiCards";
import useStockCalls from "../hooks/useStockCalls";

const Home = () => {
  const { getSales } = useStockCalls();
  useEffect(() => {
    getSales();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={3}>
        Dashboard
      </Typography>
      <KpiCards />
      <Charts />
    </Box>
  );
};

export default Home;
