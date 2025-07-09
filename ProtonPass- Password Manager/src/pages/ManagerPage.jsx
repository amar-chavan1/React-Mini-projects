import React from "react";
import Manager from "../components/Manager";
import { Link } from "react-router-dom";

const ManagerPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Manager />
      <div className="text-center mt-6">
        <Link to="/passwords" className="text-blue-400 hover:text-blue-500 underline">
          🔒 View Saved Passwords
        </Link>
      </div>
    </div>
  );
};

export default ManagerPage;
