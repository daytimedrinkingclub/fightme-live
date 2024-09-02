import { useEffect, useState } from 'react';

export default function ComparisonDisplay({ comparisonData }: { comparisonData: any }) {
  const winner = comparisonData.battleResult.includes(comparisonData.name1) ? comparisonData.name1 : comparisonData.name2;
  const loser = winner === comparisonData.name1 ? comparisonData.name2 : comparisonData.name1;

  const [showBattleResult, setShowBattleResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBattleResult(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-4 text-center">GitHub Battle</h2>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className={`p-4 ${winner === comparisonData.name1 ? 'bg-green-100' : 'bg-red-100'} rounded-lg shadow-md w-full md:w-1/2 mx-2 text-center mb-4 md:mb-0`}>
          <img src={comparisonData.avatar_url1} alt={`${comparisonData.name1}'s avatar`} width={96} height={96} className="rounded-full mx-auto mb-4" />
          <p className="text-gray-800 text-xl font-bold">{comparisonData.name1}</p>
        </div>
        <div className="text-4xl font-bold text-teal-600 my-4 md:mx-4">VS</div>
        <div className={`p-4 ${winner === comparisonData.name2 ? 'bg-green-100' : 'bg-red-100'} rounded-lg shadow-md w-full md:w-1/2 mx-2 text-center`}>
          <img src={comparisonData.avatar_url2} alt={`${comparisonData.name2}'s avatar`} width={96} height={96} className="rounded-full mx-auto mb-4" />
          <p className="text-gray-800 text-xl font-bold">{comparisonData.name2}</p>
        </div>
      </div>
      {showBattleResult && (
        <div className="mt-8 p-4 bg-teal-100 rounded-lg shadow-md text-center">
          <h3 className="text-xl md:text-2xl font-bold text-teal-600">Battle Result</h3>
          <p className="text-gray-800 text-base md:text-lg mt-4">{comparisonData.battleResult}</p>
        </div>
      )}
    </div>
  );
}