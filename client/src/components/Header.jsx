import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <header className="w-full p-4 bg-blue-600 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        {isAdmin ? "Admin Dashboard" : "Smart City Monitoring"}
      </h1>

      <Link
        to={isAdmin ? "/" : "/admin"}
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
      >
        {isAdmin ? "Go to Client Dashboard" : "Go to Admin Dashboard"}
      </Link>
    </header>
  );
};

export default Header;
