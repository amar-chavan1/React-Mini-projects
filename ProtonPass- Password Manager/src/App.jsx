import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerPage from "./pages/ManagerPage";
import PasswordsPage from "./pages/PasswordsPage";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar={false}
          limit={1}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark"
        />{" "}
        <Routes>
          <Route path="/" element={<ManagerPage />} />
          <Route path="/passwords" element={<PasswordsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
