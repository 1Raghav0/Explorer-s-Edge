

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase"; 
import { onAuthStateChanged } from "firebase/auth";

const HeroSection = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleStartJourney = () => {
    if (user) {
      navigate("/tripassistant"); // Redirect to trip assistant if logged in
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <div className="bg-indigo-50 p-20 min-h-screen flex items-center justify-center">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto text-center p-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Plan Your Dream Trip with AI-Powered Precision
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Experience stress-free travel planning with our intelligent AI assistant.
            Get personalized itineraries, discover hidden gems, and make unforgettable memories—effortlessly.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={handleStartJourney}
              className="bg-indigo-600 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-indigo-700"
            >
              Start Your Journey
            </button>
            <Link
              to="/tripassistant"
              className="bg-white text-indigo-600 py-3 px-6 rounded-md text-lg font-medium hover:bg-indigo-50 border border-indigo-600"
            >
              Explore AI-Powered Planning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

