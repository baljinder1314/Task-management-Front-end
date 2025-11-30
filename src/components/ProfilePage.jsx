import { useDispatch, useSelector } from "react-redux";
import { LogOut, Edit3, Mail, User, Calendar } from "lucide-react";
import { logOut } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await dispatch(logOut());
    if (res.payload.success) navigate("/login");
  };

  console.log(user)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* CARD */}
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10">
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* AVATAR */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-md">
            <img
              src={
                user?.avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJ2n4jkyF73GhaScsOSlia-oYARZHVGzpZg&s"
              }
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* USER INFO */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.data.user?.username || "User Name"}</h1>

            <p className="text-gray-500 mt-1 flex items-center justify-center md:justify-start gap-2">
              <Mail size={18} /> {user.data.user?.email}
            </p>

            <p className="text-gray-500 mt-1 flex items-center justify-center md:justify-start gap-2">
              <Calendar size={18} /> Joined: {user.data.user?.createdAt?.split("T")[0]}
            </p>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                <Edit3 size={18} />
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* USER DETAILS SECTION */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <h3 className="text-gray-500 text-sm">Full Name</h3>
              <p className="font-semibold text-lg mt-1">{user.data.user?.username}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <h3 className="text-gray-500 text-sm">Email Address</h3>
              <p className="font-semibold text-lg mt-1 text-wrap">{user.data.user?.email}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <h3 className="text-gray-500 text-sm">Role</h3>
              <p className="font-semibold text-lg mt-1">
                {user.data.user?.role || "User"}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <h3 className="text-gray-500 text-sm">Account Status</h3>
              <p className="font-semibold text-green-600 text-lg mt-1">
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
