import { Routes, Route } from "react-router";
import App from "@/App";
import Start from "@/features/start";
import FishPond from "@/features/fish-pond";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/start" element={<Start />} />
      <Route path="/fish-pond" element={<FishPond />} />
    </Routes>
  );
}
