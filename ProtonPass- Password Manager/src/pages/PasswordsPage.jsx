import React, { useEffect, useState } from "react";
import PasswordTable from "../components/PasswordTable";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PasswordsPage = () => {
  const [passwords, setPasswords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    url: "",
    username: "",
    password: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("passwords");
    try {
      setPasswords(stored ? JSON.parse(stored) : []);
    } catch {
      setPasswords([]);
    }
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.dismiss();
    toast.success("Password copied to clipboard!");
  };
  const handleDelete = (id) => {
    let deleteAction = confirm("Please Confirm to delete the password");

    if (deleteAction) {
      const updated = passwords.filter((item) => item.id !== id);
      setPasswords(updated);
      localStorage.setItem("passwords", JSON.stringify(updated));
      toast.dismiss();
      toast.info("Password deleted!");
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = passwords.find((item) => item.id === id);
    if (!itemToEdit) return;

    setEditForm({
      url: itemToEdit.url,
      username: itemToEdit.username,
      password: itemToEdit.password,
    });
    setEditId(id);
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEditedPassword = () => {
    if (
      !editForm.url.trim() ||
      !editForm.username.trim() ||
      !editForm.password.trim()
    ) {
      toast.dismiss();
      toast.error("Please fill in all fields!");
      return;
    }
    const updated = passwords.map((item) =>
      item.id === editId ? { ...editForm, id: editId } : item
    );
    setPasswords(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    toast.dismiss();
    toast.success("Password updated!");
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mt-30 text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400">
          Your Saved Passwords
        </h1>
        <Link
          to="/"
          className="text-sm text-blue-400 hover:text-blue-500 underline mt-2 inline-block"
        >
          ← Back to Manager
        </Link>
      </div>
      <PasswordTable
        passwords={passwords}
        onDelete={handleDelete}
        onCopy={handleCopy}
        onEdit={handleEdit}
      />

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-gray-900 text-white rounded-xl shadow-xl p-6 sm:p-8 mx-4 sm:mx-0 relative">
            <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">
              Edit Password
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-300 block mb-1">URL</label>
                <input
                  type="text"
                  name="url"
                  value={editForm.url}
                  onChange={handleEditFormChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleEditFormChange}
                  placeholder="your_email@example.com"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  value={editForm.password}
                  onChange={handleEditFormChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedPassword}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
              title="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordsPage;
