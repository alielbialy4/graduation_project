// import react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import pages
import Layout from "@organisms/Layout";
import Home from "@pages/Home";
import ErrorPage from "@pages/ErrorPage";
import React, { Suspense } from "react";
import LoadingSpinner from "@molecules/LoadingSpinner";

const Login = React.lazy(() => import("@pages/Login/Main"));
const SignUp = React.lazy(() => import("@pages/SignUp/Main"));
const HomeLogin = React.lazy(() => import("@pages/HomeLogin/Main"));
const MeterReading = React.lazy(() => import("@pages/MeterReading/Main"));

const AppRouter = () => {
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
              <HomeLogin />
            </Suspense>
          )
        },
        {
          path: "meter-reading",
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <MeterReading />
            </Suspense>
          )
        },
      ],
    },
    {
      path: "login",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
      )
    },
    {
      path: "Sign-up",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <SignUp />
        </Suspense>
      )
    }
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
