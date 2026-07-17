
    import React from "react";
    import { Link } from "react-router-dom";

const Home = () => {
  return (
     <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <p className="text-3xl text-white text-center">
        Welcome to the Home Page!{" "}
        <Link to="/bill" className="text-yellow-300 font-bold hover:text-yellow-400">
          create a new bill
        </Link>
      </p>
    </div>
  );
};

export default Home;
   
