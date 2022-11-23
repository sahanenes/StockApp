import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";

const Firms = () => {
  const { firms } = useSelector((state) => state.stock);
  const { getFirms } = useStockCalls();
  useEffect(() => {
    getFirms();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={3}>
        Firms
      </Typography>
      <Button variant="contained">New Firm</Button>
      {firms?.firms.length > 0 && (
        <Grid container>
          {firms?.map((firm) => (
            <Grid item></Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Firms;
