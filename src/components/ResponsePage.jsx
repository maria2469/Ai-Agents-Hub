import React, { useState } from "react";
import FinancialQueryAnswerAgent from "./FinancialQueryAnswerAgent";
import InvestmentAdvisorAgent from "./InvestmentAdvisorAgent";
import NewsResearcherAgent from "./NewsResearcherAgent";
import NewsReportingAnalystAgent from "./NewsReportingAnalystAgent";
// import MedicalResearcherAgent from "./MedicalResearcherAgent";
import FinancialReporterAgent from "./FinancialReporterAgent";

const ResponsePage = ({ crew }) => {
  const [formData, setFormData] = useState({});
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);

    // Remove retmax from the data
    const requestData = {
      crew_name: crew.name,
      inputs: {
        symbol: data.symbol,
        query: data.query,
        topic: data.topic,
      },
    };

    console.log("Request Data:", requestData);  // Log the request data

    let rawOutput = '';

    try {
      const apiUrl = "https://unifiedagents-production-a542.up.railway.app/execute_crew/";
      console.log("Sending request to:", apiUrl);  // Log the API URL

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Error fetching data from the API");
      }

      const responseData = await response.json();
      console.log("Raw Response Data:", responseData);  // Log the raw response

      rawOutput = responseData?.output?.raw || "No raw output available";

      // Try parsing if it's JSON
      let parsedOutput = rawOutput;
      try {
        parsedOutput = JSON.parse(rawOutput); // Try parsing if it's JSON
        console.log("Parsed Output:", parsedOutput);  // Log parsed output
      } catch (error) {
        console.error("Error parsing response:", error);
      }

      setResponses((prevResponses) => [
        ...prevResponses,
        { data: requestData, response: parsedOutput },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setResponses((prevResponses) => [
        ...prevResponses,
        { data: requestData, response: "Failed to fetch response from the API" },
      ]);
    } finally {
      setLoading(false);
    }
  };


  const renderAgentForm = () => {
    console.log("Rendering form for crew:", crew.name);  // Log which agent form is being rendered

    if (crew.name === "financial reporter") {
      return <FinancialReporterAgent onSubmit={handleSubmit} />;
    }

    if (crew.name === "investment advisor") {
      return <InvestmentAdvisorAgent onSubmit={handleSubmit} />;
    }

    if (crew.name === "financial query answerer") {
      return <FinancialQueryAnswerAgent onSubmit={handleSubmit} />;
    }
    if (crew.name === "news researcher") {
      return <NewsResearcherAgent onSubmit={handleSubmit} />;
    }
    if (crew.name === "news reporting analyst") {
      return <NewsReportingAnalystAgent onSubmit={handleSubmit} />;
    }
    // if (crew.name === "medical researcher") {
    //   return <MedicalResearcherAgent onSubmit={handleSubmit} />;
    // }

    return null;
  };

  const renderResponseContent = (response) => {
    let parsedResponse = response;

    // Attempt to parse if response is a JSON string
    if (typeof response === "string") {
      try {
        parsedResponse = JSON.parse(response);
      } catch (error) {
        console.error("Error parsing response:", error);
      }
    }

    // If parsedResponse is an array, render it properly
    if (Array.isArray(parsedResponse)) {
      return (
        <div>
          {parsedResponse.map((article, index) => (
            <div
              key={index}
              className="mt-6 p-4 bg-gradient-to-br from-gray-900 via-purple-800 to-black rounded-lg shadow-md"
            >
              <a href={article.url} className="text-blue-400" target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              <p className="text-gray-300">{article.snippet}</p>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="mt-4 rounded-lg w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      );
    }

    // If it's plain text or any other format, display as-is
    return (
      <div>
        <p className="text-gray-300">{parsedResponse}</p>
      </div>
    );
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-purple-800 to-black">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-3xl bg-white/10 p-8 rounded-xl shadow-xl backdrop-blur-lg border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-4">{crew.name}</h1>
          <p className="text-gray-300 mb-6">{crew.description}</p>

          {renderAgentForm()}

          <div className="mt-12">
            <h2 className="text-3xl text-white mb-6">Responses</h2>
            <div className="space-y-6">
              {responses.length === 0 ? (
                <p className="text-gray-400">No responses yet. Submit a query to get started!</p>
              ) : (
                responses.map((item, index) => (
                  <div
                    key={index}
                    className="mt-6 p-4 bg-gradient-to-br from-gray-900 via-purple-800 to-black rounded-lg shadow-md w-full"
                  >
                    <h3 className="text-xl text-white font-semibold mb-2">Response:</h3>
                    {renderResponseContent(item.response)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsePage;
