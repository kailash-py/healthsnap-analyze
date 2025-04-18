
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-white py-6 px-4 md:px-6">
      <div className="container mx-auto text-center">
        <p className="text-gray-600 flex items-center justify-center gap-1">
          Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by NutriLens AI
        </p>
        <p className="text-sm text-gray-500 mt-2">
          © {new Date().getFullYear()} NutriLens AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
