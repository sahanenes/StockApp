import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import useSortColumn from "../../hooks/useSortColumn";
import useStockCalls from "../../hooks/useStockCalls";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  arrowStyle,
  btnHoverStyle,
  flexCenter,
} from "../../styles/globalStyle";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const PurchasesTable = ({
  setOpen,
  setInfo,
  selectedProducts,
  selectedBrands,
}) => {
  const deletePurchase = useStockCalls();
  const { purchases } = useSelector((state) => state.stock);

  const columnObj = {
    created: 1,
    quantity: 1,
    price_total: 1,
    firm: 1,
    price: 1,
    brand: 1,
    product: 1,
  };

  const { sortedData, handleSort, column } = useSortColumn(
    purchases,
    columnObj
  );
  const isBrandSelected = (item) =>
    selectedBrands.includes(item.brand) || selectedBrands.length === 0;

  const isProductSelected = (item) =>
    selectedProducts.includes(item.product) || selectedProducts.length === 0;

  return (
    <TableContainer component={Paper} elevation={10} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Box sx={arrowStyle} onClick={() => handleSort("created")}>
                <Typography variant="body" noWrap>
                  Date
                </Typography>
                {column.created === 1 && <UpgradeIcon />}
                {column.created !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("firm")}>
                <Typography variant="body" noWrap>
                  Firm Name
                </Typography>
                {column.firm === 1 && <UpgradeIcon />}
                {column.firm !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("brand")}>
                <Typography variant="body" noWrap>
                  Brand Name
                </Typography>
                {column.brand === 1 && <UpgradeIcon />}
                {column.brand !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("product")}>
                <Typography variant="body" noWrap>
                  Product Name
                </Typography>
                {column.product === 1 && <UpgradeIcon />}
                {column.product !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={arrowStyle} onClick={() => handleSort("quantity")}>
                <Typography variant="body" noWrap>
                  Quantity
                </Typography>
                {column.quantity === 1 && <UpgradeIcon />}
                {column.quantity !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>

            <TableCell>
              <Box sx={arrowStyle} onClick={() => handleSort("price")}>
                <Typography variant="body" noWrap>
                  Amount
                </Typography>
                {column.price === 1 && <UpgradeIcon />}
                {column.price !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={arrowStyle} onClick={() => handleSort("price_total")}>
                <Typography variant="body" noWrap>
                  Total Amount
                </Typography>
                {column.price_total === 1 && <UpgradeIcon />}
                {column.price_total !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">Operation</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedData
            ?.filter((item) => isBrandSelected(item))
            .filter((item) => isProductSelected(item))
            .map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{item.createds}</TableCell>
                <TableCell align="center">{item.category[0]?.name}</TableCell>
                <TableCell align="center">{item.firm}</TableCell>
                <TableCell align="center">{item.brand}</TableCell>
                <TableCell align="center">{item.product}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">{`$${item.price}`}</TableCell>
                <TableCell align="center">{`$${item.price_total}`}</TableCell>
                <TableCell>
                  <Box sx={flexCenter}>
                    <BorderColorIcon
                      sx={btnHoverStyle}
                      onClick={() => {
                        setInfo(item);
                        setOpen(true);
                      }}
                    />

                    <DeleteForeverIcon
                      onClick={() => deletePurchase(item.id)}
                      sx={btnHoverStyle}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchasesTable;
