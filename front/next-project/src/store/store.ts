import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsSlice";
import usersReducer from "./reducers/usersSlice";
import reviewsReducer from "./reducers/reviewsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    /* reviews: reviewsReducer, */
    /* users: usersReducer, */
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

/* PRIORIDAD: CRUD DE PRODUCT */
/* terminar crud de users y reviews */
