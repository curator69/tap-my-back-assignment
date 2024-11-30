import { useState, useEffect } from "react";
import { User } from "../../types";
import { api } from "../../utils/api";
import { getAuthToken } from "../../utils/auth";
import LoadingSpinner from "../Layout/LoadingSpinner";

interface UserSelectProps {
  onSelect: (userId: string) => void;
}

const UserSelect = ({ onSelect }: UserSelectProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;

        const data = await api.getUsers(token);
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="">Select a user</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name} - {user.department}
        </option>
      ))}
    </select>
  );
};

export default UserSelect;
