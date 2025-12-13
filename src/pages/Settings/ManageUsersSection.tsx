import React from "react";
import { Users, Info, Edit, Trash2 } from "lucide-react";
import DataTable, { ColumnDefinition } from "../../components/common/DataTable";

// --- Define the specific data structure for a User ---
interface User {
  emailID: string;
  role: string;
  isCurrentUser: boolean;
}

// --- Sample Data ---
const userData: User[] = [
  {
    emailID: "kumarsuresh2597@gmail.com",
    role: "Engineer",
    isCurrentUser: true,
  },
  { emailID: "info@zlliq.com", role: "Postmaster", isCurrentUser: false },
];
// -------------------

const ManageUsersSection: React.FC = () => {
  // 1. Define the Columns
  const columns: ColumnDefinition<User>[] = [
    {
      key: "emailID",
      header: "Email ID",
      render: (user) => (
        <span id={`current-user-aria-${user.emailID}`}>
          {user.emailID}
          {user.isCurrentUser && (
            <strong className="ml-1 text-gray-600 dark:text-gray-400">
              {" "}
              (Me)
            </strong>
          )}
        </span>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user) => (
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium w-fit ${getRoleClass(
            user.role
          )}`}
        >
          <span id={`current-user-role-aria-${user.emailID}`}>{user.role}</span>
          <button
            data-atm="role_info"
            aria-label={`View ${user.role} details`}
            className="text-current opacity-70 hover:opacity-100"
          >
            <Info size={14} aria-hidden="true" />
          </button>
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      // The actions column is only rendered if the user is NOT the current user
      render: (user) =>
        !user.isCurrentUser ? (
          <div className="flex justify-end gap-3 text-gray-500 dark:text-gray-400">
            <button
              title="Edit User"
              className="hover:text-blue-500 dark:hover:text-blue-400"
            >
              <Edit size={16} />
            </button>
            <button
              title="Delete User"
              className="hover:text-red-500 dark:hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : null,
    },
  ];

  // Helper function to dynamically get role style (moved from DataTable for clarity)
  const getRoleClass = (role: string) => {
    switch (role.toLowerCase()) {
      case "engineer":
        return "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30";
      case "postmaster":
        return "text-red-600 bg-red-50 dark:bg-red-900/30";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-700/30";
    }
  };

  return (
    <div
      role="tabpanel"
      id="panel:«raq»-0"
      aria-labelledby="tab:«raq»-0"
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <Users size={20} /> Manage Users
      </h2>

      <p className="text-gray-600 dark:text-gray-300">
        Control which team members have access to this domain's sending
        capabilities and manage their roles and permissions.
      </p>

      <div className="flex justify-between items-center pb-4 border-b dark:border-gray-700">
        <span className="font-medium text-gray-700 dark:text-gray-200">
          Current Users: {userData.length}
        </span>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150">
          Invite New User
        </button>
      </div>

      {/* Calling the reusable DataTable component */}
      <DataTable data={userData} columns={columns} ariaLabel="Manage Users" />

      <div className="mt-4 space-y-3 pt-4 border-t dark:border-gray-700">
        <div className="flex justify-between items-center p-3 rounded-lg dark:text-gray-200">
          <span className="font-medium">Role Management</span>
          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
            View/Edit Roles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersSection;
