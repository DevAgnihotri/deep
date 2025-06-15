import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <img src="/logo.png" alt="Mindhaven Logo" className="w-16 h-16 object-contain mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! This Mindhaven page doesn't exist</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Mindhaven Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
