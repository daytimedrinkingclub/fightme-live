'use client';

import { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';

export default function SpotifyRoast() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const response = await fetch('/api/spotify/auth');
    const data = await response.json();
    window.location.href = data.url;
  };

  const fetchUserData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/spotify/user');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to fetch user data');
      }
      
      const data = await response.json();
      console.log('Fetched user data:', data);
      setUserData(data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message || 'Error fetching user data');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 relative">
      <BackButton />
      <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-8 text-center">Spotify Roaster</h1>
      {loading && <div className="loader mt-8"></div>}
      {error && <p className="text-red-500">{error}</p>}
      {!userData && !loading && (
        <button
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Login with Spotify
        </button>
      )}
      {userData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{userData.display_name}</h2>
          <img src={userData.images[0]?.url} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
          <p>Email: {userData.email}</p>
          <p>Country: {userData.country}</p>
          <p>Product: {userData.product}</p>
          <p>Followers: {userData.followers.total}</p>
        </div>
      )}
    </div>
  );
}