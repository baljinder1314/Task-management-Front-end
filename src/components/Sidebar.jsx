import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  BadgePlus,
  CircleFadingArrowUp,
  Trash,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    { to: "/all-tasks", label: "Tasks", icon: <Home size={18} /> },
    { to: "/create", label: "Create", icon: <BadgePlus size={18} /> },
    { to: "/update", label: "Update", icon: <CircleFadingArrowUp size={18} /> },
    { to: "/delete", label: "Delete", icon: <Trash size={18} /> },
  ];

  const handleLogout = async () => {
    const res = await dispatch(logOut());
    if (res.payload.success) navigate("/login");
  };

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b px-4 py-3 sticky top-0 z-30">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold">TaskFlow</h1>

        <div className="w-[36px]" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen md:sticky md:top-0 bg-white border-r p-6 z-10">
        <h2 className="text-2xl font-bold mb-8">TaskFlow</h2>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left text-red-600"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <aside className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-md p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">TaskFlow</h2>

              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t pt-4">
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left text-red-600"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
