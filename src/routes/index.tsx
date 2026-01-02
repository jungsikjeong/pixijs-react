import App from "@/App";
import GlobalLayout from "@/components/layout/global-layout";
import FishPond from "@/features/fish-pond";
import Start from "@/features/start";
import Train from "@/features/train";
import { Route, Routes } from "react-router";

export default function Router() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/start" element={<Start />} />
        <Route path="/fish-pond" element={<FishPond />} />
        <Route path="/train" element={<Train />} />
      </Route>
    </Routes>
  );
}
