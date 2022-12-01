import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PurchaseModal from "../components/modals/PurchaseModal";
import MultiSelect from "../components/MultiSelect";
import PurchasesTable from "../components/tables/PurchasesTable";
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
      <PurchaseModal
        info={info}
        setInfo={setInfo}
        open={open}
        setOpen={setOpen}
      />
      <Typography variant="h4" color="error" mt={4}>
        Purchases
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setInfo({});
          setOpen(true);
        }}
      >
        New Purchase
      </Button>
      {purchases?.length > 0 && (
        <>
          <MultiSelect />
          <PurchasesTable />
        </>
      )}
    </>
  );
};

export default Purchases;
