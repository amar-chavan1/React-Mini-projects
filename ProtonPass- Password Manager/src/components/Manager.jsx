import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, User, Link2 } from "lucide-react";
import { toast } from "react-toastify";


const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", url: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("passwords");
    try {
      setPasswordArray(stored ? JSON.parse(stored) : []);
    } catch {
      setPasswordArray([]);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = (e) => {
  e.preventDefault();


  if (!form.url.trim() || !form.username.trim() || !form.password.trim()) {
    toast.dismiss();
    toast.error("Please fill in all fields!");
    return;
  }

  const newEntry = { ...form, id: crypto.randomUUID() };
  const updatedArray = [...passwordArray, newEntry];
  setPasswordArray(updatedArray);
  localStorage.setItem("passwords", JSON.stringify(updatedArray));
  setForm({ username: "", url: "", password: "" });

  toast.dismiss(); 
  toast.success("Password saved!");
};


  return (
    <form
      onSubmit={savePassword}
      className="mt-30 w-full max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-blue-400 flex items-center justify-center gap-2">
        Add Password 
      </h2>

      <div>
        <label className="text-sm text-gray-300">
          <Link2 size={16} className="inline mr-1 text-gray-400" />
          URL
        </label>
        <input
          type="text"
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="https://example.com"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md mt-1 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="text-sm text-gray-300">
            <User size={16} className="inline mr-1 text-gray-400" />
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="your_email@example.com"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md mt-1 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 relative">
          <label className="text-sm text-gray-300">
            <Lock size={16} className="inline mr-1 text-gray-400" />
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md mt-1 placeholder-gray-400 pr-10 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-blue-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-transparent border border-blue-600 text-blue-400 font-bold py-3 px-4 rounded-md shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:text-white hover:shadow-xl hover:shadow-blue-500/50 transition duration-300 ease-in-out"
      >
        <Lock size={20} className="inline mr-2" />
        Add Password
      </button>
    </form>
  );
};

export default Manager;
