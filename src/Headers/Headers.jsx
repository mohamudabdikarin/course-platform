import React from "react";
import { Link } from "react-router";
export const Headers = () => {
  return (
    <>
      <div className="flex justify-around bg-white shadow-md p-4 fixed top-0 w-full z-10">
        <Link to="/" className="text-blue-600">
          Home
        </Link>
        <Link to="/Login" className="text-blue-600">
         <button> Login</button>
        </Link>
        <Link to="/SignUp" className="text-white bg-blue-500 px-3 py-1 rounded-r-md">
          <button> SignUp</button>
        </Link>
      </div>
    </>
  );
};
export default Headers;
