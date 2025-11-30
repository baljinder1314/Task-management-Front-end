import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";

export default function Header() {
  const [search, setSearchText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    dispatch(setSearch(value)); // 👈 send to redux
  };

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
            onChange={handleSearch}
            className="w-full outline-none text-sm placeholder:text-gray-400"
          />
        </div>

        {/* PROFILE IMAGE */}
        <Link
          to={"/profile"}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-green-600"
        >
          <img
            src={
              user?.avatar ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJ2n4jkyF73GhaScsOSlia-oYARZHVGzpZg&s"
            }
            alt="profile"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
