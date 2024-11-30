import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuthToken } from "../utils/auth";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
};

export default HomePage;
