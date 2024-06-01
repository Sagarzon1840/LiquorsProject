import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store/store";
import axios from "axios";

export interface Product {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  category: string;
  abv: number;
  brand: string;
  country: string;
  size: string;
  userId: string;
}

interface ProductsState {
  data: Product[];
}

const initialState: ProductsState = {
  data: [],
};

/* este es el crud redux de products */
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProducts(state, action: PayloadAction<Product>) {
      state.data.push(action.payload);
    },
    readProducts(state, action: PayloadAction<Product[]>) {
      state.data = state.data.concat(action.payload);
    },

    updateProducts(state, action) {},
    deleteProducts(state, action) {},
  },
});

export const { createProducts, readProducts, updateProducts, deleteProducts } =
  productsSlice.actions;

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get<Product[]>("https://fakestoreapi.com/products");
    dispatch(readProducts(res.data));
  } catch (err) {
    console.error(err);
  }
};

export default productsSlice.reducer;
/* 

API NUEVA https://fakestoreapi.com/products -------------------------------------
*/

/* { ESTE ES EL OBJETO QUE VENDRÁ DEL BACKEND
    "id": "e38b90dd-a8ca-46b5-a51a-f0ad3a456cb1",
    "name": "Whisky Johnnie Walker Black Label",
    "description": "Whisky escocés de mezcla de 12 años, suave y con sabor a vainilla y frutas.",
    "imgUrl": "https://example.com/default_whisky_image.jpg",
    "category": "Whisky",
    "abv": 40,
    "brand": "Johnnie Walker",
    "country": "Escocia",
    "size": "750ml",
    "userId": "533317f7-bf81-41cb-82f4-fc92fe6e0a8f"
  }, */
