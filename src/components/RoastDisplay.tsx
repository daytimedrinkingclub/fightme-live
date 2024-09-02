import Image from 'next/image';

export default function RoastDisplay({ roastData }: { roastData: { roast: string, name: string, avatar_url: string } }) {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center mb-4">
        <Image src={roastData.avatar_url} alt={`${roastData.name}'s avatar`} className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-4" />
        <p className="text-gray-800 text-xl font-bold text-center md:text-left">{roastData.name}</p>
      </div>
      <p className="text-gray-800 text-base md:text-lg">{roastData.roast}</p>
    </div>
  );
}