import React, { useState } from "react";
// Importing agent components for different types of crew
import FinancialQueryAnswerAgent from "./FinancialQueryAnswerAgent";
import InvestmentAdvisorAgent from "./InvestmentAdvisorAgent";
import NewsReportingAnalystAgent from "./NewsReportingAnalystAgent";
import MedicalResearcherAgent from "./MedicalResearcherAgent";
import FinancialReporterAgent from "./FinancialReporterAgent";
import TrendingPostAgent from "./TrendingPostAgent";

const ResponsePage = ({ crew }) => {
  // State for storing responses and loading status
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle form submission and make API call to fetch data
  const handleSubmit = async (data) => {
    setLoading(true); // Set loading state to true while awaiting API response

    // Prepare the request data with crew name and form inputs
    const requestData = {
      crew_name: crew.name,
      inputs: data,
    };

    try {
      // API call to fetch data based on the crew type
      const response = await fetch("https://unifiedagents-production-a542.up.railway.app/execute_crew/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      // Check if the response is successful
      if (!response.ok) throw new Error("Error fetching data from the API");

      // Parse the response data
      const responseData = await response.json();
      const formattedOutput = formatResponse(responseData?.output?.raw);

      // Add the response to the state
      setResponses((prevResponses) => [...prevResponses, { data: requestData, response: formattedOutput }]);
    } catch (error) {
      console.error("Error:", error);
      // In case of error, set a failure message in the response
      setResponses((prevResponses) => [
        ...prevResponses,
        { data: requestData, response: "Failed to fetch response from the API" },
      ]);
    } finally {
      setLoading(false); // Set loading state to false once the API call is complete
    }
  };

  // Function to format raw API output (parse JSON if needed)
  const formatResponse = (rawOutput) => {
    try {
      return typeof rawOutput === "string" ? JSON.parse(rawOutput) : rawOutput;
    } catch {
      return rawOutput; // Return raw output if parsing fails
    }
  };

  // Dynamically select the correct agent component based on crew name
  const AgentForm = {
    "financial reporter": FinancialReporterAgent,
    "investment advisor": InvestmentAdvisorAgent,
    "financial query answerer": FinancialQueryAnswerAgent,
    "trending posts searcher": TrendingPostAgent,
    "news reporting analyst": NewsReportingAnalystAgent,
    "medical researcher": MedicalResearcherAgent,
  }[crew.name.toLowerCase()] || null; // Default to null if no match found

  // Function to render the response content in a structured way
  const renderResponseContent = (response) => {
    try {
      // Try parsing the response as JSON to render structured data (e.g., articles)
      const parsedResponse = JSON.parse(response);
      return parsedResponse.map((article, index) => (
        <div key={index} className="mt-6 p-4 bg-gradient-to-br from-gray-900 via-purple-800 to-black rounded-lg shadow-md w-full">
          <h3 className="text-xl text-white font-semibold mb-2">{article.title}</h3>
          <p className="text-gray-300 mb-2">{article.summary}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            Read more
          </a>
          {article.image && <img src={article.image} alt={article.title} className="w-full h-auto rounded-md mt-4" />}
        </div>
      ));
    } catch {
      // If parsing fails, return the raw response as a fallback
      return <pre className="text-gray-300 whitespace-pre-wrap break-words bg-gray-800 p-4 rounded-md">{response}</pre>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-purple-800 to-black">
      {/* Main container for the page */}
      <div className="w-full max-w-3xl bg-white/10 p-8 rounded-xl shadow-xl backdrop-blur-lg border border-white/20">
        {/* Display crew name and description */}
        <h1 className="text-3xl font-bold text-white mb-4">{crew.name}</h1>
        <p className="text-gray-300 mb-6">{crew.description}</p>

        {/* Render the corresponding agent form based on crew name */}
        {AgentForm && <AgentForm onSubmit={handleSubmit} />}

        <div className="mt-12">
          <h2 className="text-3xl text-white mb-6">Responses</h2>
          <div className="space-y-6">
            {/* If no responses, display a prompt */}
            {responses.length === 0 ? (
              <p className="text-gray-400">No responses yet. Submit a query to get started!</p>
            ) : (
              // Display each response from the state
              responses.map((item, index) => (
                <div key={index} className="mt-6 p-4 bg-gradient-to-br from-gray-900 via-purple-800 to-black rounded-lg shadow-md w-full">
                  <h3 className="text-xl text-white font-semibold mb-2">Response:</h3>
                  {renderResponseContent(item.response)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsePage;
