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
import { CardHeader } from "@mui/material";

export default function FirmCard({ firm, setInfo, setOpen }) {
  const { deleteFirm } = useStockCalls();
  return (
    <Card
      elevation={10}
      sx={{
        p: 2,
        maxWidth: "300px",
        maxHeight: "480px",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader title={firm?.name} subheader={firm?.address} />
      <CardMedia
        height="325"
        width="250"
        image={firm?.image}
        sx={{ p: 1, objectFit: "contain" }}
        component="img"
        alt="firm-img"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Phone: {firm?.phone}
        </Typography>
      </CardContent>
      <CardActions sx={flexCenter}>
        <EditIcon
          sx={btnHoverStyle}
          onClick={() => {
            setOpen(true);
            setInfo(firm);
          }}
        />
        <DeleteOutlineIcon
          sx={btnHoverStyle}
          onClick={() => deleteFirm(firm?.id)}
        />
      </CardActions>
    </Card>
  );
}
