import { useState } from 'react';

export default function InputForm({ setRoastData, setLoading }: { setRoastData: (data: { roast: string, name: string, avatar_url: string }) => void, setLoading: (loading: boolean) => void }) {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const apiKey = localStorage.getItem('anthropicApiKey');
    const response = await fetch(`/api/roast?username=${username}&apiKey=${apiKey}`);
    const data = await response.json();
    console.log(data); // Log the response for debugging
    setRoastData(data); // Display the roast
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-8">
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        >
          Roast Me
        </button>
      </div>
    </form>
  );
}