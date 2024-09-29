import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { Dashboard } from "@/dashboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="bg-muted w-full min-h-screen">
      <Dashboard />
    </main>
  </StrictMode>,
);
