import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = { token: true };
  const data = localStorage.getItem("token");


  return data ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoute;
