import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PurchaseModal from "../components/modals/PurchaseModal";
import useStockCalls from "../hooks/useStockCalls";

const Purchases = () => {
  const { purchases } = useSelector((state) => state.stock);
  const {
    getPurchases,
    getFirms,
    getBrands,
    getCategories,
    getSales,
    getProducts,
  } = useStockCalls();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getBrands();
    getFirms();
    getCategories();
    getSales();
    getPurchases();
    getProducts();
  }, []);

  return (
    <>
      <PurchaseModal />
      <Typography variant="h4" color="error" mt={4}>
        Purchases
      </Typography>
    </>
  );
};

export default Purchases;
