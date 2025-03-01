import React from "react";

const About = () => {
  return (
    <>
      <div className="bg-gray-100 pt-20  min-h-screen">
        {/* Hero Section */}
        <div className="bg-indigo-600 text-white pt-6 p-6 text-center">
          <h1 className="text-4xl font-bold mb-2">About Our AI Trip Planner</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Experience effortless travel planning with our AI-powered assistant. 
            Get customized itineraries, explore hidden gems, and optimize your trip based on your preferences—all in seconds.
          </p>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto p-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Why Choose Our AI Trip Planner?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 bg-white shadow-lg rounded-lg text-center cursor-pointer transition-transform transform hover:shadow-lg hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2">Personalized Itineraries</h3>
              <p className="text-gray-600">
                Get tailor-made travel plans based on your interests, budget, and duration.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-white shadow-lg rounded-lg text-center cursor-pointer transition-transform transform hover:shadow-lg hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h3>
              <p className="text-gray-600">
                Discover the best attractions, restaurants, and activities curated by AI.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-white shadow-lg rounded-lg text-center cursor-pointer transition-transform transform hover:shadow-lg hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2">Seamless Travel Planning</h3>
              <p className="text-gray-600">
                Plan, book, and navigate your journey with ease—all in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-200 py-12">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold mb-6">Meet the Team</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Our dedicated team of travel enthusiasts, developers, and AI experts built this platform 
              to make trip planning stress-free. We believe that technology can unlock the world's most incredible experiences.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
