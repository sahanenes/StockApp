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
  console.log(purchases);
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
          <MultiSelect
            data1={purchases}
            data2={purchases}
            key1="brand"
            key2="product"
            firstNames={selectedBrands}
            setFirstNames={setSelectedBrands}
            setSecondNames={setSelectedProducts}
          />
          <PurchasesTable
            setOpen={setOpen}
            setInfo={setInfo}
            selectedProducts={selectedProducts}
            selectedBrands={selectedBrands}
          />
        </>
      )}
    </>
  );
};

export default Purchases;
