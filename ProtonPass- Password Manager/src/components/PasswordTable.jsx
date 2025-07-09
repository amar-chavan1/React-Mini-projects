import React from "react";
import { Pencil, Trash2, Copy } from "lucide-react";

const PasswordTable = ({ passwords, onEdit, onDelete, onCopy }) => {
  if (passwords.length === 0) {
    return <p className="text-center text-gray-400">No passwords saved yet.</p>;
  }

  return (
    <div className="mt-10 w-full max-w-5xl mx-auto rounded-lg border border-gray-700 shadow-lg overflow-hidden">
      <table className="w-full table-fixed divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/3">
              URL
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/4">
              Username
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/4">
              Password
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {passwords.map((item) => (
            <tr key={item.id} className="hover:bg-gray-700 transition duration-150 ease-in-out">
              <td className="px-4 py-4 text-sm text-blue-300 truncate max-w-[200px]">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline block overflow-hidden whitespace-nowrap text-ellipsis"
                  title={item.url}
                >
                  {item.url}
                </a>
              </td>
              <td className="px-4 py-4 text-sm text-gray-200 whitespace-nowrap">
                {item.username}
              </td>
              <td className="px-4 py-4 text-sm text-gray-200 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span>{"*".repeat(item.password.length)}</span>
                  <button onClick={() => onCopy(item.password)} title="Copy" className="text-gray-400 hover:text-blue-400">
                    <Copy size={16} />
                  </button>
                </div>
              </td>
              <td className="px-2 py-2 text-sm text-left whitespace-nowrap">
                <div className="flex  gap-2">
                  <button onClick={() => onEdit(item.id)} title="Edit" className="text-blue-400 hover:text-blue-500">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => onDelete(item.id)} title="Delete" className="text-red-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PasswordTable;
