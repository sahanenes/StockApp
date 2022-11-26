import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { amber, indigo, pink } from "@mui/material/colors";

const KpiCards = () => {
  const data = [
    {
      title: "Sales",
      metric: "$0",
      icon: <MonetizationOnIcon />,
      color: indigo[900],
      bgColor: indigo[300],
    },
    {
      title: "Profit",
      metric: "$0",
      icon: <PaymentsIcon />,
      color: pink[900],
      bgColor: pink[300],
    },
    {
      title: "Purchases",
      metric: "$0",
      icon: <ShoppingCartIcon />,
      color: amber[900],
      bgColor: amber[300],
    },
  ];
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {data.map((item) => (
        <Grid item key={item.title}>
          <Paper>
            <Box>
              <Avatar>{item.icon}</Avatar>
            </Box>
            <Box>
              <Typography>{item.title}</Typography>
              <Typography>{item.metric}</Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default KpiCards;
