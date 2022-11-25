import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

import useStockCalls from "../hooks/useStockCalls";
import { arrowStyle, btnHoverStyle, flexCenter } from "../styles/globalStyle";
import useSortColumn from "../hooks/useSortColumn";
import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";

const Products = () => {
  const { products, brands } = useSelector((state) => state.stock);
  const { getBrands, getCategories, getProducts } = useStockCalls();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });
  const [selectedBrands, setSelectedBrands] = useState([]);
  useEffect(() => {
    getBrands();
    getCategories();
    getProducts();
  }, []);
  const columnObj = {
    brand: 1,
    name: 1,
    stock: 1,
  };
  const { handleSort, sortedData, column } = useSortColumn(products, columnObj);

  const isBrandSelected = (item) =>
    selectedBrands?.includes(item.brand) || selectedBrands.length === 0;

  return (
    <Box>
      <Typography variant="h4" color="error" mb={3}>
        Products
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Product
      </Button>
      <MultiSelectBox
        handleSelect={(item) => setSelectedBrands(item)}
        placeholder="Select Brand"
      >
        {brands?.map((item) => (
          <MultiSelectBoxItem
            key={item.name}
            value={item.name}
            text={item.name}
          />
        ))}
      </MultiSelectBox>
      {/* <ProductModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} /> */}
      {sortedData?.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">*</TableCell>
                <TableCell align="center">Categories</TableCell>
                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("brand", "text")}
                  >
                    <div>Brand</div>
                    {column.brand === 1 && <UpgradeIcon />}
                    {column.brand !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("name", "text")}
                  >
                    <div>Name</div>
                    {column.name === 1 && <UpgradeIcon />}
                    {column.name !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("stock", "number")}
                  >
                    <div>Stock</div>
                    {column.stock === 1 && <UpgradeIcon />}
                    {column.stock !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                ?.filter((item) => isBrandSelected(item))
                .map((product, index) => (
                  <TableRow
                    key={product.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{product.category}</TableCell>
                    <TableCell align="center">{product.brand}</TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{product.stock}</TableCell>
                    <TableCell align="center">
                      <DeleteIcon sx={btnHoverStyle} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;
