'use client'

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { ref, get } from 'firebase/database';

export function RoastStats() {
  const [totalRoasts, setTotalRoasts] = useState(0);
  const [singleRoasts, setSingleRoasts] = useState(0);
  const [headToHeadRoasts, setHeadToHeadRoasts] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const roastsRef = ref(db, 'roasts');
      const snapshot = await get(roastsRef);
      
      let total = 0;
      let single = 0;
      let headToHead = 0;

      snapshot.forEach((childSnapshot) => {
        const roast = childSnapshot.val();
        total++;
        if (roast.type === 'single') {
          single++;
        } else if (roast.type === '1v1') {
          headToHead++;
        }
      });

      setTotalRoasts(total);
      setSingleRoasts(single);
      setHeadToHeadRoasts(headToHead);
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Roast Stats</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-3xl font-bold">{totalRoasts}</p>
          <p className="text-sm text-gray-400">Total Roasts</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{singleRoasts}</p>
          <p className="text-sm text-gray-400">Single Roasts</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{headToHeadRoasts}</p>
          <p className="text-sm text-gray-400">Head-to-Head</p>
        </div>
      </div>
    </div>
  );
}

export default RoastStats;