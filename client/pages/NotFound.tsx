import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-danger/20 to-red-100 rounded-2xl mb-8">
            <AlertTriangle className="w-10 h-10 text-danger" />
          </div>

          <h1 className="text-7xl sm:text-8xl font-black text-foreground mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            The page you're looking for doesn't exist. It might have been moved
            or deleted.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all text-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
