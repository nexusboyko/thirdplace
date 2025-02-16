import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import Room from "./Room.tsx";
import "./index.css";
import RoomsList from "./RoomsList.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
    >
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="/places" element={<RoomsList />} />

          <Route path="/places/p/:id" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
