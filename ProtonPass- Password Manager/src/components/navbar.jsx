import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for toggle icon

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
                    w-11/12 sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 
                    bg-gray-800/80 backdrop-blur-md border border-gray-700 
                    shadow-xl rounded-full px-6 py-3 
                    flex items-center justify-between font-poppins"
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-white text-xl font-bold no-underline"
      >
        <img
          src="/ProtonPass.png"
          alt="Logo"
          className="w-9 h-9 rounded-full"
        />
        <span>ProtonPass</span>
      </Link>

      <button onClick={() => setOpen(!open)} className="md:hidden text-white">
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/"
          className="text-gray-300 hover:text-blue-400 text-lg font-medium"
        >
          Home
        </Link>
        <Link
          to="/passwords"
          className="text-gray-300 hover:text-blue-400 text-lg font-medium"
        >
          MyPasswords
        </Link>
      </div>
      {open && (
        <div
          className="md:hidden fixed top-[70px] left-1/2 -translate-x-1/2 z-40 
                  w-11/12 sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 
                  bg-gray-800/90 backdrop-blur-md border border-gray-700 
                  rounded-xl shadow-md py-4 px-6 flex flex-col gap-4"
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-blue-400 text-lg font-medium"
          >
            Home
          </Link>
          <Link
            to="/passwords"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-blue-400 text-lg font-medium"
          >
            MyPasswords
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
