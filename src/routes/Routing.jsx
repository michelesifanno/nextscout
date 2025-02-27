import { createBrowserRouter } from "react-router-dom";
import Root from '../pages/Root';
import Home from "../pages/Home";
import ProtectedRoute from "../components/general/ProtectedRoute";
import ScrollToTop from "../components/ScrollToTop";

import NotFoundRoute from "../pages/NotFoundRoute";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import SignPage from "../pages/SignPage";
import Welcome from "../pages/Welcome";
import Player from "../pages/Player";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <>
    <ScrollToTop />
    <Root />
    </>
    ),
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/player/:slug",
        element: <Player />,
      },
    ],
  },
  // Proteggi la rotta di Welcome
  {
    path: "/",
    element: <ProtectedRoute />, // Avvolgi la rotta protetta con ProtectedRoute
    children: [
      {
        path: "/welcome",  // Mantieni lo stesso percorso per il componente Welcome
        element: <Welcome />
      },
    ],
  },
  // Le rotte di login e signup non sono protette
  {
    path: "/",
    element: <SignPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*", // Questa rotta cattura tutte le rotte non trovate
    element: <NotFoundRoute />
  }
]);

export default router;
