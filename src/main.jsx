import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import AddCoffee from "./components/AddCoffee.jsx";
import UpdateCoffee from "./components/UpdateCoffee.jsx";
import App from "./App.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login-Register/Login.jsx";
import Register from "./components/Login-Register/Register.jsx";
import ForgetPassword from "./components/Login-Register/ForgetPassword.jsx";
import ErrorPage from "./components/Home/ErrorPage.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import Users from "./components/Users/Users.jsx";
import PrivateRoute from "./Privateroute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // {
      //   path: "",
      //   element: <Navigate to="/coffee" />,
      // },
      {
        path: "/",
        element: <App />,
        loader: () => fetch("http://localhost:5000/coffee"),
      },
      {
        path: "/updateCoffee/:id", // Dynamic route with id
        element: <UpdateCoffee />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/coffee/${params.id}`), // Pass id to fetch specific coffee
      },
      {
        path: "/addCoffee",
        element: <PrivateRoute> <AddCoffee /></PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: '/users',
        element: <PrivateRoute> <Users></Users> </PrivateRoute>,
        loader: () =>fetch('http://localhost:5000/users'),
      },
      {
        path: "/forgetpassword",
        element: <ForgetPassword />,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
