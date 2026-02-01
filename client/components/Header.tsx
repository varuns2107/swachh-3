import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-foreground">
                Swachh Saathi
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                Delhi Sustainability
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2 sm:gap-8">
            <Link
              to="/"
              className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors hidden sm:inline"
            >
              Home
            </Link>
            <Link
              to="/report"
              className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors hidden sm:inline"
            >
              Report Issue
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors hidden sm:inline"
            >
              Track Status
            </Link>
            <a
              href="tel:112"
              className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors hidden sm:inline"
            >
              Emergency: 112
            </a>
            <Link
              to="/report"
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl transition-all text-sm shadow-md"
            >
              Report Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
