
import { Link } from "react-router-dom";
import { ScanSearch } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b bg-white py-3 px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <ScanSearch className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">NutriLens AI</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/analyze" className="text-gray-700 hover:text-primary transition-colors">
            Analyze
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
