import React, { useState } from "react";

const MedicalResearcherAgent = ({ onSubmit }) => {
    const [term, setTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit({ term });
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-black to-purple-900 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <div className="space-y-6">
                <div className="mb-6">
                    <label className="block text-gray-200 font-semibold mb-2">Medical Term *</label>
                    <input
                        type="text"
                        name="term"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        className="w-full px-5 py-3 bg-gray-800 text-white border-none rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none placeholder-gray-400 transition"
                        placeholder="Enter medical term"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300 hover:bg-purple-600 ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                            </svg>
                            Loading...
                        </div>
                    ) : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default MedicalResearcherAgent;
