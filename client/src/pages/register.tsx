import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RegisterForm from "../components/Auth/RegisterForm";
import { getAuthToken } from "../utils/auth";
import LoadingSpinner from "../components/Layout/LoadingSpinner";

const RegisterPage = () => {
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

  return <RegisterForm />;
};

export default RegisterPage;
