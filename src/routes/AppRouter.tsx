import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "@organisms/Layout";
import Home from "@pages/Home";
import ErrorPage from "@pages/ErrorPage";
import React, { Suspense, useEffect } from "react";
import LoadingSpinner from "@molecules/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "src/Store/userAthe";
import { AppDispatch } from "src/Store";
import Cookies from "js-cookie";

const Login = React.lazy(() => import("@pages/Login/Main"));
const SignUp = React.lazy(() => import("@pages/SignUp/Main"));
const HomeLogin = React.lazy(() => import("@pages/HomeLogin/Main"));
const MeterReading = React.lazy(() => import("@pages/MeterReading/Main"));

const AppRouter = () => {
  const isLogIn = useSelector((state: any) => state.auth.isLogIn);
  const isAuthChecked = useSelector((state: any) => state.auth.isAuthChecked);
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = Cookies.get("access_token");

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserProfile(accessToken));
    } else {
      // If no token, auth check is complete and user is not logged in
      dispatch({ type: "auth/setIsLogIn", payload: false });
      dispatch({ type: "auth/setIsAuthChecked", payload: false });
    }
  }, [dispatch, accessToken]);

  // Wait for auth check to complete before rendering routes
  if (isAuthChecked) {
    return <LoadingSpinner />;
  }

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    console.log("ProtectedRoute - isAuthChecked:", isAuthChecked, "isLogIn:", isLogIn);
    if (!isLogIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "home-login",
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute>
                <HomeLogin />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "meter-reading",
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute>
                <MeterReading />
              </ProtectedRoute>
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "login",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "Sign-up",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <SignUp />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;