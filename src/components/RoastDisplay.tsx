export default function RoastDisplay({ roastData }: { roastData: { roast: string, name: string, avatar_url: string } }) {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-2xl mx-auto flex items-center">
      <img src={roastData.avatar_url} alt={`${roastData.name}'s avatar`} className="w-16 h-16 rounded-full mr-4" />
      <div>
        <p className="text-gray-800 text-lg font-bold">{roastData.name}</p>
        <p className="text-gray-800 text-lg">{roastData.roast}</p>
      </div>
    </div>
  );
}