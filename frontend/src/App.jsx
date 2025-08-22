import "./App.css";
import Layout from "./components/ui/Layout";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/About";
import ExploreMenu from "./pages/ExploreMenu";
import UserDashboard from "./pages/UserDashboard";
import UserDashBoardLayout from "./components/userDashboardComp/userDashBoardLayout";
import ReservationTable from "./components/userDashboardComp/ReservationTable";
import Table from "./components/userDashboardComp/Table";
import Offer from "./components/userDashboardComp/Offer";
import Services from "./pages/Services";
import ConatctUs from "./pages/ConatctUs";
import AdminLayout from "./components/adminDashboard/AmdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHeader from "./components/adminDashboard/AdminHeader";
import AdminSidebar from "./components/adminDashboard/AdminSidebar";
import AdminReservationTable from "./components/adminDashboard/AdminReservationTable";
import AdminTableManagement from "./components/adminDashboard/AdminTableManagement";
import AdminSettings from "./components/adminDashboard/AdminSettings";
import { NotPageFound } from "./pages/NotPageFound";
import UserSettings from "./components/userDashboardComp/UserSettings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/explore",
          element: <ExploreMenu />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/contact",
          element: <ConatctUs />,
        },
        {
          path: "*",
          element: <NotPageFound />,
        },
      ],
    },

    {
      path: "/",
      element: <UserDashBoardLayout />,
      children: [
        {
          path: "dashboard",
          element: (
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "reservation",
          element: (
            <ProtectedRoute>
              <ReservationTable />
            </ProtectedRoute>
          ),
        },
        {
          path: "table",
          element: (
            <ProtectedRoute>
              <Table />
            </ProtectedRoute>
          ),
        },
        {
          path: "offer",
          element: (
            <ProtectedRoute>
              <Offer />
            </ProtectedRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          ),
        },
      ],
    },

    // for admin Layout.....

    {
      path: "/",
      element: <AdminLayout />,
      children: [
        {
          path: "adminDashboard",
          element: (
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "admindheader",
          element: (
            <ProtectedRoute role="admin">
              <AdminHeader />
            </ProtectedRoute>
          ),
        },
        {
          path: "adminsidebar",
          element: (
            <ProtectedRoute role="admin">
              <AdminSidebar />
            </ProtectedRoute>
          ),
        },
        {
          path: "adminreservation",
          element: (
            <ProtectedRoute role="admin">
              <AdminReservationTable />
            </ProtectedRoute>
          ),
        },
        {
          path: "admintable",
          element: (
            <ProtectedRoute role="admin">
              <AdminTableManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: "adminsettings",
          element: (
            <ProtectedRoute role="admin">
              <AdminSettings />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
