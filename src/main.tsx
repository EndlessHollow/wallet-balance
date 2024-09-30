import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { Dashboard } from "@/dashboard";
import { TatumProvider } from "./use-tatum";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TatumProvider>
      <main className="bg-muted w-full min-h-screen">
        <Dashboard />
      </main>
    </TatumProvider>
  </StrictMode>,
);
