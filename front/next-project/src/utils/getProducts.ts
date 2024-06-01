import { IProduct } from "@/interfaces/interfaz";
import axios from "axios";

export const fetchProducts = async (setProducts: any) => {
    try {
      const res = await axios.get("http://localhost:3001/products");
      setProducts(res)
      console.log("res del fetch", res);
    } catch (err) {
      console.error(err);
    }
  };