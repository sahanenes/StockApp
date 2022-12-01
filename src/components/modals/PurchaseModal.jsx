import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useStockCalls from "../../hooks/useStockCalls";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PurchaseModal({ open, setOpen, info, setInfo }) {
  const navigate = useNavigate();
  const { products, brands, firms } = useSelector((state) => state.stock);
  const { postPurchase, putPurchase } = useStockCalls();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (info.id) {
      putPurchase(info);
    } else {
      postPurchase(info);
    }

    setOpen(false);
    setInfo({});
    console.log(info);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: Number(value),
    });
  };
  console.log(products);
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setInfo({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={flexColumn} component={"form"} onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <InputLabel variant="outlined" id="firm-select-label">
                Firm
              </InputLabel>
              <Select
                labelId="firm-select-label"
                label="Firm"
                name="firm_id"
                value={info?.firm_id || ""}
                onChange={handleChange}
                required
              >
                <MenuItem
                  sx={{
                    background: "linear-gradient(45deg, blue, red);",
                    borderRadius: "10px",
                    color: "white",
                  }}
                  onClick={() => navigate("/stock/firms")}
                >
                  Add New Firm
                </MenuItem>
                <hr />
                {firms?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel variant="outlined" id="brand-select">
                Brands
              </InputLabel>
              <Select
                labelId="brand-select"
                label="Brand"
                id="brand-select"
                name="brand_id"
                value={info?.brand_id || ""}
                onChange={handleChange}
                required
              >
                <MenuItem
                  sx={{
                    background: "linear-gradient(45deg, blue, red);",
                    borderRadius: "10px",
                    color: "white",
                  }}
                  onClick={() => navigate("/stock/brands")}
                >
                  Add New Brand
                </MenuItem>
                <hr />
                {brands?.map((brand) => {
                  return (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel variant="outlined" id="product-select-label">
                Product
              </InputLabel>
              <Select
                labelId="product-select-label"
                label="Product"
                id="product-select"
                name="product_id"
                value={info?.product_id || ""}
                onChange={handleChange}
                required
              >
                <MenuItem
                  sx={{
                    background: "linear-gradient(45deg, blue, red);",
                    borderRadius: "10px",
                    color: "white",
                  }}
                  onClick={() => navigate("/stock/products")}
                >
                  Add New Product
                </MenuItem>
                <hr />
                {products?.map((product) => {
                  return (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              label="Quantity"
              name="quantity"
              id="quantity"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
              value={info?.quantity || ""}
              onChange={handleChange}
              required
            />
            <TextField
              label="Price"
              name="price"
              id="price"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
              value={info?.price || ""}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" size="large">
              {info?.id ? "Update Purchase" : "Add New Product"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
