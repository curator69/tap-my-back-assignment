import { useEffect, useState } from "react";
import { Kudo } from "../../types";
import { api } from "../../utils/api";
import { getAuthToken } from "../../utils/auth";
import KudoCard from "./KudoCard";
import LoadingSpinner from "../Layout/LoadingSpinner";
import KudoFilter from "./KudoFilter";

const ITEMS_PER_PAGE = 5;

const KudoList = () => {
  const [kudos, setKudos] = useState<Kudo[]>([]);
  const [filteredKudos, setFilteredKudos] = useState<Kudo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchKudos = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await api.getKudos(token!);
      const data = Array.isArray(response) ? response : [];
      setKudos(data);
      setFilteredKudos(data);
    } catch (error) {
      setError("Failed to fetch kudos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKudos();
  }, []);

  const handleFilterChange = ({
    category,
    dateRange,
  }: {
    category: string;
    dateRange: string;
  }) => {
    let filtered = [...kudos];

    if (category !== "all") {
      filtered = filtered.filter((kudo) => kudo.category === category);
    }

    if (dateRange !== "all") {
      const now = new Date();
      filtered = filtered.filter((kudo) => {
        const kudoDate = new Date(kudo.createdAt);
        switch (dateRange) {
          case "today":
            return kudoDate.toDateString() === now.toDateString();
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return kudoDate >= weekAgo;
          case "month":
            return (
              kudoDate.getMonth() === now.getMonth() &&
              kudoDate.getFullYear() === now.getFullYear()
            );
          default:
            return true;
        }
      });
    }

    setFilteredKudos(filtered);
    setCurrentPage(1);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  const totalPages = Math.ceil(filteredKudos.length / ITEMS_PER_PAGE);
  const paginatedKudos = filteredKudos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Kudos</h2>
      <KudoFilter onFilterChange={handleFilterChange} />

      {filteredKudos.length === 0 ? (
        <p className="text-center text-gray-500">No kudos found</p>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedKudos.map((kudo) => (
              <KudoCard key={kudo._id} kudo={kudo} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default KudoList;
