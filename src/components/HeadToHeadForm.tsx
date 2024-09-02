import { useState } from 'react';

export default function HeadToHeadForm({ setComparisonData }: { setComparisonData: (data: any) => void }) {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`/api/headtohead?username1=${username1}&username2=${username2}`);
    const data = await response.json();
    setComparisonData(data);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-8">
      <div className="flex flex-col mb-4">
        <input
          type="text"
          value={username1}
          onChange={(e) => setUsername1(e.target.value)}
          placeholder="Enter first GitHub username"
          className="appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
        />
        <input
          type="text"
          value={username2}
          onChange={(e) => setUsername2(e.target.value)}
          placeholder="Enter second GitHub username"
          className="appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none mt-4"
        />
      </div>
      <button
        type="submit"
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
      >
        Compare
      </button>
    </form>
  );
}