import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';

import { auth } from "../../Firebase/firebase.init";

const Register = () => {
  const { signInWithGoogle, createUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  // const location = useLocation();

  // const validatePassword = (password) => {
  //   const hasUppercase = /[A-Z]/.test(password);
  //   const hasLowercase = /[a-z]/.test(password);
  //   const isLengthValid = password.length >= 6;

  //   if (!hasUppercase) {
  //     return "Password must have at least one uppercase letter";
  //   }
  //   if (!hasLowercase) {
  //     return "Password must have at least one lowercase letter";
  //   }
  //   if (!isLengthValid) {
  //     return "Password must be at least 6 characters long";
  //   }
  //   return "";
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photourl = form.photourl.value;
    const password = form.password.value;

    // console.log(name, email, photourl, password);

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User Created Successfully:", user);
        navigate("/");
        const created = user?.metadata?.creationTime;
        const date = new Date(created);
        const options12Hour = {
          timeZone: 'Asia/Dhaka', 
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true, 
        };
        const createdTime = new Intl.DateTimeFormat('en-US', options12Hour).format(date);

        // console.log(createdTime)
        
        const newUser ={name,email,photourl, createdAt:createdTime};
        // save new user in db
        fetch('http://localhost:5000/users',{
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
        .then(res=> res.json())
        .then(data =>{
          if(data.insertedId){
            Swal.fire({
              title: "Registration Successful!",
              text: "Welcome to our platform!",
              icon: "success", 
              confirmButtonText: "OK",
            });
            
            console.log("user created in DB",data);

          }
          
        })


      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        setPasswordError(error.message);
      });
  };
  // const passwordValidationError = validatePassword(password);

  // if (passwordValidationError) {
  //   setPasswordError(passwordValidationError);
  //   return;
  // }

  // setPasswordError("");

  // setUser(user);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate("/");
        Swal.fire({
          title: "Registration Successful!",
          text: "Welcome to our platform!",
          icon: "success", // Success আইকন দেখাবে
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error("Google Sign-In failed", error.message);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center md:my-8">
      <div className="w-11/12 max-w-md bg-white rounded-lg shadow-md p-6 border">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              required
              placeholder="Enter your name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Photo URL Field */}
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Photo URL
            </label>
            <input
              name="photourl"
              type="text"
              id="photo"
              placeholder="Enter photo URL"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                required
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && (
              <p className="text-xs text-red-500 mt-2">{passwordError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 btn bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
          >
            Register
          </button>
        </form>

        {/* Social Login */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          <span className="block w-20 border-t border-gray-300"></span>
          <span className="text-sm text-gray-500">Or Register with</span>
          <span className="block w-20 border-t border-gray-300"></span>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="flex border-2 items-center justify-center w-full py-2 mt-4 bg-transparent font-medium rounded-md hover:bg-gray-200"
        >
          <FcGoogle className="mr-2" /> Register with Google
        </button>

        {/* Redirect to Login */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
