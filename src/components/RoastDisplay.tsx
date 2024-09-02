export default function RoastDisplay({ roast }: { roast: string }) {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <p className="text-gray-800 text-lg">{roast}</p>
    </div>
  );
}