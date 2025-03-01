import React from "react";

const features = [
  {
    icon: "ri-lightbulb-flash-line",
    title: "AI-Powered Trip Planning",
    description: "Get personalized travel itineraries based on your preferences, budget, and time constraints.",
  },
  {
    icon: "ri-money-dollar-circle-line",
    title: "Expense Estimation",
    description: "Plan your budget effectively with AI-powered cost estimations for flights, hotels, and activities.",
  },
  {
    icon: "ri-road-map-line",
    title: "Optimized Routes",
    description: "AI suggests the best travel routes, ensuring you save time and avoid unnecessary detours.",
  },
  {
    icon: "ri-flight-takeoff-line",
    title: "Flight & Transport Insights",
    description: "Receive smart transport suggestions tailored to your budget",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "24/7 Travel Assistance",
    description: "Your AI travel assistant is always available to answer queries and provide real-time updates.",
  },
];

const Features = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-12">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Key Features of <span className="text-indigo-600">Explorer’s Edge</span>
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Explore the powerful features that make your travel planning smarter, easier, and stress-free.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-lg text-center transition-transform transform hover:scale-105 duration-300 hover:shadow-xl"
            >
              <i className={`${feature.icon} text-5xl text-indigo-600 mb-4`}></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
