import React, { useState } from "react";

const FinancialQueryAnswerAgent = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        symbol: "",
        query: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Call the onSubmit function passed via props
        await onSubmit(formData);

        setLoading(false); // End loading
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-black to-purple-900 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
        >
            <div className="space-y-6">
                <div className="mb-6">
                    <label className="block text-gray-200 font-semibold mb-2">Stock Symbol *</label>
                    <div className="border border-white/20 rounded-lg">
                        <input
                            type="text"
                            name="symbol"
                            value={formData.symbol}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-gray-800 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-500 placeholder-gray-400 transition duration-300"
                            placeholder="Enter Stock Symbol"
                            required
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-200 font-semibold mb-2">Query *</label>
                    <div className="border border-white/20 rounded-lg">
                        <input
                            type="text"
                            name="query"
                            value={formData.query}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-gray-800 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-500 placeholder-gray-400 transition duration-300"
                            placeholder="Enter your query"
                            required
                        />
                    </div>
                </div>

                <div className="relative">
                    <button
                        type="submit"
                        className={`w-full bg-purple-700 text-white font-semibold py-3 rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                                    ></path>
                                </svg>
                                Loading...
                            </div>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FinancialQueryAnswerAgent;
