
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
         
          <div className="flex-shrink-0">
            <h1 className="text-white font-bold text-xl tracking-wide">
              Invoice . Co
            </h1>
          </div>

        
          <div className="flex space-x-6">
           <Link to="/bill" className="text-black hover:text-white-200 font-medium transition duration-200">Generate invoice</Link>
            <Link to="/InvoiceandDownload" className="text-black hover:text-white-200 font-medium transition duration-200">Invoice&download</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


