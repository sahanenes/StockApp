import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import useStockCalls from "../hooks/useStockCalls";

const Home = () => {
  const { getFirms, getSales } = useStockCalls();
  useEffect(() => {
    getFirms();
    getSales();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={3}>
        Dashboard
      </Typography>
    </Box>
  );
};

export default Home;
