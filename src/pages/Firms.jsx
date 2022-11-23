import { useEffect } from "react";
import useStockCalls from "../hooks/useStockCalls";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";

const Firms = () => {
  const { getFirms, getSales } = useStockCalls();
  useEffect(() => {
    getFirms();
    getSales();
  }, []);

  return <div>Firms</div>;
};

export default Firms;
