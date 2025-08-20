import './App.css'
import Layout from './components/ui/Layout'
import LoginPage from './pages/LoginPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import AboutUs from './pages/About'
import ExploreMenu from './pages/ExploreMenu'
import UserDashboard from './pages/UserDashboard'
import UserDashBoardLayout from './components/userDashboardComp/userDashBoardLayout'
import ReservationTable from './components/userDashboardComp/ReservationTable'
import Table from './components/userDashboardComp/Table'
import Offer from './components/userDashboardComp/Offer'
import Services from './pages/Services'
import ConatctUs from './pages/ConatctUs'
import AdminLayout from './components/adminDashboard/AmdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminHeader from './components/adminDashboard/AdminHeader'
import AdminSidebar from './components/adminDashboard/AdminSidebar'
import AdminReservationTable from './components/adminDashboard/AdminReservationTable'
import AdminTableManagement from './components/adminDashboard/AdminTableManagement'
import AdminSettings from './components/adminDashboard/AdminSettings'
import {NotPageFound} from './pages/NotPageFound'
import UserSettings from './components/userDashboardComp/UserSettings'

function App() {
  const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },

  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutUs />
      },
      {
        path: '/explore',
        element: <ExploreMenu />
      },
         {
        path: '/services',
        element: <Services />
      },
      {
        path: '/contact',
        element: <ConatctUs />
      },
      {
        path: '*',
        element: <NotPageFound/>
      }
    ]
  },

  {
    path: '/',
    element: <UserDashBoardLayout />,
    children: [
      {
        path: 'dashboard',
        element:<UserDashboard/>
      },
    {
        path: 'reservation',
        element: <ReservationTable/>
      },
      {
        path: 'table',
        element: <Table/>
      },
       {
        path: 'offer',
        element: <Offer/>
      },
      {
        path: 'settings',
        element: <UserSettings/>
      },

    ]
  },

  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      {
        path: 'adminDashboard',
        element:<AdminDashboard/>
      },
       {
        path: 'admindheader',
        element:<AdminHeader/>
      },
       {
        path: 'adminsidebar',
        element:<AdminSidebar/>
      },
       {
        path: 'adminreservation',
        element:<AdminReservationTable/>
      },
       {
        path: 'admintable',
        element:<AdminTableManagement/>
      },
       {
        path: 'adminsettings',
        element:<AdminSettings/>
      },

    ]}
]);

  return (
    <>
  <RouterProvider router={router}/>
    </>
  )
}

export default App