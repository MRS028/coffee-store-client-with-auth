import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const { signInWithGoogle, userLogin, setError } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
       
        console.log(result.user);

        // Update Log in time
        const lastSignInTime = result?.user?.metadata?.lastSignInTime;

        const loginInfo = {
          email,
          lastSignInTime,
        };
        fetch(`http://localhost:5000/users`, {
          method: "PATCH",
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify(loginInfo)
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('Log in updated',data);
          });

        Swal.fire({
          title: "Login Successful!",
          text: "Welcome to our platform!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(redirectPath);
      })
      .catch((err) => {
        Swal.fire({
          title: 'Login Failed!',
          text: 'Incorrect email or password.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
        console.error("Login Error:", err.message);
        setError(err.message);
        
      });
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        navigate("/");
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome to our platform!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {

        console.error("Google Sign-In failed", error.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <Link
              to="/forgetpassword"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Log In
          </button>
        </form>
        <div className="flex items-center justify-center my-4">
          <span className="text-gray-500 text-sm">OR</span>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          <FaGoogle className="mr-2" />
          Log In with Google
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
