import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import { getAuthToken } from "../../utils/auth";
import UserSelect from "./UserSelect";

const categories = ["Helpful", "Teamwork", "Innovation", "Leadership"];

interface KudoFormProps {
  onKudoCreated: () => void;
}

const KudoForm = ({ onKudoCreated }: KudoFormProps) => {
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = getAuthToken();

    try {
      await api.createKudo(token!, {
        receiver,
        message,
        category,
      });
      // Reset all form states
      setReceiver("");
      setMessage("");
      setCategory(categories[0]);
      onKudoCreated();
      toast.success("Kudo sent successfully! 🎉");
    } catch (err) {
      setError("Failed to create kudo");
      toast.error("Failed to send kudo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-black">Give a Kudo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Receiver
          </label>
          <UserSelect onSelect={(userId) => setReceiver(userId)} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          type="submit"
          disabled={loading || !receiver}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:shadow-outline disabled:opacity-50 w-full"
        >
          {loading ? "Sending..." : "Send Kudo"}
        </button>
      </form>
    </div>
  );
};

export default KudoForm;
