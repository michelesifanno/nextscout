import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import AppLayout from "../../layout/AppLayout";

function ProtectedRoute() {
  const { session } = useContext(AppContext);
  if (!session) {
    return <Navigate to="/"/>
  } 
  return (
    <AppLayout />
  )
}

export default ProtectedRoute;