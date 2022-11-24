import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import FirmModal from "../components/modals/FirmModal";
import useStockCalls from "../hooks/useStockCalls";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";

const Firms = () => {
  const { firms } = useSelector((state) => state.stock);
  const { getFirms } = useStockCalls();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getFirms();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={3}>
        Firms
      </Typography>
      <Button variant="contained">New Firm</Button>
      <FirmModal open={open} setOpen={setOpen} />
      {firms?.length > 0 && (
        <Grid container justifyContent="center" gap={3}>
          {firms?.map((firm) => (
            <Grid item>
              <FirmCard key={firm.id} firm={firm} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Firms;
