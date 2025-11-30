import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:flex">
        {/* Sidebar (mobile + desktop handled inside the component) */}
        <Sidebar />

        {/* Main */}
        <main className="flex-1 min-h-screen">
          <Header />
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-[1200px] mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
