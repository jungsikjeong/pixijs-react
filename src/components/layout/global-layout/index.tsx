import { Outlet } from "react-router";
import { MainNav } from "../nav";

export default function GlobalLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <MainNav />
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
