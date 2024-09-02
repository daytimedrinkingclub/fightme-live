import React, { useState } from 'react';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  isOpen: boolean;
}

export function ApiKeyInput({ onApiKeySubmit, isOpen }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApiKeySubmit(apiKey);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-teal-600">Enter Your Anthropic API Key</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Anthropic API key"
            className="w-full p-2 border border-teal-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          <button 
            type="submit" 
            className="w-full px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-2">
          Your API key will be stored securely in your browser&apos;s local storage.
        </p>
      </div>
    </div>
  );
}