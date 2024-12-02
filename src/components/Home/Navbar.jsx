import React, { useContext } from "react";
import { FaHome, FaCoffee, FaPlus, FaEdit, FaEnvelope, FaUserCircle, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { HiOutlineUsers } from "react-icons/hi";

const Navbar = () => {
  const {userLogOut,user} = useContext(AuthContext);


  // console.log(user);
  const handleLogOut = () => {
    userLogOut()
      .then(() => {
        setTimeout(() => {
          toast.success("Successfully logged out!", {
            autoClose: 1500, 
          });
        }, 500);
        
      })
      .catch((error) => {
        toast.error("Failed to log out. Please try again.");
        console.error(error);
      });
  };


  const links = (
<>
  <li>
    <NavLink to="/">
      <p className="flex items-center gap-2">
        <FaHome />
        Home
      </p>
    </NavLink>
  </li>
  <li>
    <NavLink to="/addcoffee">
      <p className="flex items-center gap-2">
        <FaPlus />
        Add Coffee
      </p>
    </NavLink>
  </li>
  <li>
    <NavLink to="/users">
      <p className="flex items-center gap-2">
      <HiOutlineUsers />
       Users
      </p>
    </NavLink>
  </li>
  
  {/* 
  <li>
    <NavLink to="/updateCoffee">
      <p className="flex items-center gap-2">
        <FaEdit />
        Update Coffee
      </p>
    </NavLink>
  </li>
  
  <li>
    <NavLink to="/profile">
      <p className="flex items-center gap-2">
        <FaUserCircle />
        Profile
      </p>
    </NavLink>
  </li>
  <li>
    <NavLink to="/logout">
      <p className="flex items-center gap-2">
        <FaSignOutAlt />
        Logout
      </p>
    </NavLink>
  </li> */}
</>

  );
  return (
    <div className="navbar w-11/12 mx-auto  ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* Link-1 */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to='/coffee' className="btn btn-ghost text-xl">Coffee House</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* link-2 */}
        <ul className="menu menu-horizontal px-1 gap-2">
        {links}
            
        </ul>
      </div>
      <div className="navbar-end gap-2 ">
        {
          user && user?.email ? (
            <div className="flex space-x-2">
            <p className=" font-semibold text-xl py-2">
              {user && user.email}
            </p>
            <div className="py-1">
              <img
                className="w-10 h-10 rounded-full "
                src={user?.photoURL}
                alt=""
              />
            </div>
            <button
              onClick={handleLogOut}
              className="btn bg-red-500 hover:bg-red-700 font-semibold text-white "
            >
              Log out <IoIosLogOut size={18} />
            </button>
          </div>
          ): (
           <>
           <Link to="/login" className="btn bg-green-500 border"> <IoIosLogIn size={16} />
          Log In
        </Link>
        <Link to="/register" className="btn bg-green-500 hidden md:flex"> <FaUserPlus size={20} />
          Register
        </Link>
           </>
          
           

          )
        }
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
