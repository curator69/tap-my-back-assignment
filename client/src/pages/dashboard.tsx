import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import KudoForm from "../components/Kudos/KudoForm";
import KudoList from "../components/Kudos/KudoList";
import { getAuthToken } from "../utils/auth";
import LoadingSpinner from "../components/Layout/LoadingSpinner";

const DashboardPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
      return;
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleKudoCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <KudoForm onKudoCreated={handleKudoCreated} />
      <KudoList key={refreshKey} />
    </div>
  );
};

export default DashboardPage;
