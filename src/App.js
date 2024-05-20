import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Countrieslist from "./Countries/Countrieslist";
import Addcountry from "./Countries/Addcountry";
import EditCountry from "./Countries/EditCountry";
import UserLogin from "./Auth/UserLogin";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route index element={<UserLogin />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="countries" element={<Countrieslist />} />
            <Route path="add-country" element={<Addcountry />} />
            <Route path="edit-country/:id" element={<EditCountry />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
