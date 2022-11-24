import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { btnHoverStyle, flexCenter } from "../styles/globalStyle";
import useStockCalls from "../hooks/useStockCalls";

export default function FirmCard({ firm }) {
  const { deleteFirm } = useStockCalls();
  return (
    <Card
      elevation={10}
      sx={{
        p: 2,
        maxWidth: "300px",
        maxHeight: "420px",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        alt="firm-image"
        height="325"
        width="250"
        image={firm?.image}
        sx={{ p: 1, objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {firm.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {firm.address}
        </Typography>
      </CardContent>
      <CardActions sx={flexCenter}>
        <EditIcon sx={btnHoverStyle} />
        <DeleteOutlineIcon
          sx={btnHoverStyle}
          onClick={() => deleteFirm(firm?.id)}
        />
      </CardActions>
    </Card>
  );
}
