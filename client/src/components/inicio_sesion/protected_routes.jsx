import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../../store/context";

function Protected({ children, redirectTo = "/" }) {
  const { store } = useContext(Context);
  const { token } = store;

  return token ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={redirectTo} />
  );
}

export default Protected;
