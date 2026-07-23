
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
         
          <div className="flex-shrink-0">
            <h1 className="text-white font-bold text-xl tracking-wide">
              Invoice . Co
            </h1>
          </div>

         
          <div className="flex lg:hidden relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-purple focus:outline-none"
            >
              {isOpen ? (
                <span className="text-2xl">X</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>

           
            {isOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <Link
                  to="/bill"
                  className="block px-4 py-2 text-black hover:bg-indigo-100 font-medium transition duration-200"
                >
                  Generate invoice
                </Link>
                <Link
                  to="/InvoiceandDownload"
                  className="block px-4 py-2 text-black hover:bg-indigo-100 font-medium transition duration-200"
                >
                  Invoice & download
                </Link>
              </div>
            )}
          </div>

          
          <div className="hidden lg:flex space-x-6">
            <Link
              to="/bill"
              className="text-black hover:text-white font-medium transition duration-200"
            >
              Generate invoice
            </Link>
            <Link
              to="/InvoiceandDownload"
              className="text-black hover:text-white font-medium transition duration-200"
            >
              Invoice & download
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

