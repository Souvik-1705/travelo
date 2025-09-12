import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token, guest } = useSelector((state) => state.auth);

  
  return token || guest ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
