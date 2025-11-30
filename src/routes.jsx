import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Signup from "./pages/Signup.jsx";
import LoggedIn from "./pages/LoggedIn.jsx";
import { Navigate } from "react-router-dom";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import ProfilePage from "./components/ProfilePage.jsx";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
const router = createBrowserRouter([
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <LoggedIn /> },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true, // ← default visible route
        element: <Navigate to="/all-tasks" replace />,
      },

      { path: "create", element: <TaskForm /> },
      { path: "all-tasks", element: <TaskList /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
]);

export default router;
