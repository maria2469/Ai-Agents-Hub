// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

export const crewList = [
  { name: "financial reporter", path: "/financial-report", description: "Provides financial analysis and reports based on stock symbols." },
  { name: "investment advisor", path: "/investment-advisor", description: "Offers investment strategies and portfolio recommendations." },
  { name: "financial query answerer", path: "/financial-query", description: "Answers financial queries related to stocks and markets." },
  { name: "trending posts searcher", path: "/post-search", description: "Finds and analyzes the latest news on specified topics." },
  { name: "news reporting analyst", path: "/news-reporting", description: "Generates structured news reports on given topics." },
  { name: "medical researcher", path: "/medical-research", description: "Finds medical research papers based on keywords." },
];

const HomePage = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center p-6 bg-cover bg-center relative"
    style={{ backgroundImage: "url('/images/bgImage.jpeg')" }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-purple-900/70"></div>

    <h1 className="text-4xl font-extrabold text-white mb-4 relative z-10 animate-fade-in">InsightMate</h1>
    <p className="text-white mb-6 text-lg relative z-10 animate-fade-in">
      Unlock the power of AI to tackle real-world challenges — from enhancing financial strategies to accelerating medical research, our AI crews are designed to help you achieve impactful, data-driven decisions faster.
    </p>
    <p className="text-white mb-6 text-lg relative z-10">
      Whether you're in finance, healthcare, or media, choose an AI crew to streamline your workflow and drive innovation in your industry.
    </p>

    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 relative z-10">
      {crewList.map(({ name, path, description }) => (
        <div
          key={name}
          className="bg-gradient-to-br from-gray-900 to-purple-800 p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-lg flex flex-col items-center animate-slide-in transition-all"
        >
          <h2 className="text-2xl font-semibold text-white mb-2">{name}</h2>
          <p className="text-gray-300 text-sm mb-4 text-center">{description}</p>
          <Link
            to={path}
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded-lg transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-600"
            aria-label={`Get started with ${name}`}
          >
            Get Started
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default HomePage;
