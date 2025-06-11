import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-3 px-4 shadow-md">
      <div className="logo flex items-center">
        <FaCheckCircle className="text-2xl mr-2" />
        <span className="font-bold text-xl">ToReact</span>
      </div>
      <ul className="flex gap-8 items-center">
        <li className="cursor-pointer hover:text-indigo-200 transition-all">Home</li>
        <li className="cursor-pointer hover:text-indigo-200 transition-all">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
