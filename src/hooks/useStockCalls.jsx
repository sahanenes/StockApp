import { useDispatch } from "react-redux";
// import { axiosWithToken } from "../service/axiosInstance";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";
//! get callss
const useStockCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();
  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const getFirms = () => getStockData("firms");
  const getSales = () => getStockData("sales");
  //! delete calls
  const deleteStockData = async (url, id) => {
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      toastSuccessNotify(`${url} deleted`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} cannot be deleted`);
    }
  };

  const deleteFirm = (id) => deleteStockData("firms", id);

  // ! post calls
  const postStockData = async (url, info) => {
    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} added`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} cannot be added`);
    }
  };

  const postFirm = (info) => postStockData("firms", info);

  // !put calls
  const putStockData = async (url, info) => {
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} updated`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} cannot be updated`);
    }
  };

  const putFirm = (info) => putStockData("firms", info);

  return { getFirms, getSales, deleteFirm, postFirm, putFirm };
};

export default useStockCalls;
