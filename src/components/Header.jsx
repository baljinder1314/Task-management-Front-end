import { Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="w-full sticky top-0 z-0 bg-white border-b px-4 md:px-8 py-4 flex items-center justify-between">
      
      {/* LEFT: TITLE */}
      <div className="flex flex-col">
        <h1 className="text-lg md:text-3xl font-bold hidden sm:block">
          Task Management
        </h1>
        <p className="text-gray-500 text-sm hidden md:block">
          task and make routine
        </p>
      </div>

      {/* RIGHT: SEARCH + PROFILE */}
      <div className="flex items-center gap-3 sm:gap-5">
        
        {/* SEARCH BAR */}
        <div className="flex items-center gap-2 border rounded-md px-2 py-1.5 w-[130px] sm:w-[180px] md:w-[230px] focus-within:ring-2 ring-blue-500 transition">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm placeholder:text-gray-400"
          />
        </div>

        {/* PROFILE IMAGE */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-green-600">
          <img
            src={
              user?.avatar ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJ2n4jkyF73GhaScsOSlia-oYARZHVGzpZg&s"
            }
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
