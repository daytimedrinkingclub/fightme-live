export default function ComparisonDisplay({ comparisonData }: { comparisonData: any }) {
    return (
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Comparison Results</h2>
        <div className="flex justify-between">
          <div>
            <img src={comparisonData.avatar_url1} alt={`${comparisonData.name1}'s avatar`} className="w-16 h-16 rounded-full mr-4" />
            <p className="text-gray-800 text-lg font-bold">{comparisonData.name1}</p>
            {/* <p className="text-gray-800 text-lg">{comparisonData.user1.bio}</p> */}
          </div>
          <div>
            <img src={comparisonData.avatar_url2} alt={`${comparisonData.name2}'s avatar`} className="w-16 h-16 rounded-full mr-4" />
            <p className="text-gray-800 text-lg font-bold">{comparisonData.name2}</p>
            {/* <p className="text-gray-800 text-lg">{comparisonData.user2.bio}</p> */}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold text-teal-600">AI Comparison Summary</h3>
          <p className="text-gray-800">{comparisonData.battleResult}</p>
        </div>
      </div>
    );
  }