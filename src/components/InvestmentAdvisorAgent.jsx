import React, { useState } from "react";

const InvestmentAdvisorAgent = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        symbol: "",
        query: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="mb-4">
                <label className="block text-gray-200 font-medium mb-1">Stock Symbol *</label>
                <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 text-white"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-200 font-medium mb-1">Query (Optional)</label>
                <input
                    type="text"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 text-white"
                />
            </div>

            <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition"
            >
                Submit
            </button>
        </form>
    );
};

export default InvestmentAdvisorAgent;
