import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/Auth/LoginForm";
import { getAuthToken } from "../utils/auth";
import LoadingSpinner from "../components/Layout/LoadingSpinner";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <LoginForm />;
};

export default LoginPage;
