
    import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white text-center leading-relaxed max-w-2xl">
        Welcome to the Home Page!{" "}
        <Link
          to="/bill"
          className="block sm:inline text-yellow-300 font-bold hover:text-yellow-400 mt-2 sm:mt-0"
        >
          create a new bill
        </Link>
      </p>
    </div>
  );
};

export default Home
   
