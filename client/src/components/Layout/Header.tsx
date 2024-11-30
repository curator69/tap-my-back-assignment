import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getUser, logout } from "../../utils/auth";
import { User } from "../../types";

export const Header = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setCurrentUser(getUser());
  }, [router.pathname]);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white text-xl font-bold">KudoSpot</h1>
          </div>
          {currentUser && (
            <div className="flex items-center">
              <span className="text-white mr-4">{currentUser.name}</span>
              <button
                onClick={handleLogout}
                className="bg-indigo-700 px-3 py-1 rounded-md text-sm font-medium text-white hover:bg-indigo-800"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
