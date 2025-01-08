// rrd
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// layouts
import MainLayout from "./layouts/MainLayout";
// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
// actions
import { action as CreateAction } from "./pages/Create";
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { login, authReadyAct } from "./app/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((store) => store.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
          action: CreateAction,
        },
        {
          path: "/settings",
          element: <Settings />,
          action: CreateAction,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(authReadyAct());
    });
  }, []);
  return <> {authReady && <RouterProvider router={routes} />}</>;
}

export default App;
