'use client'

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import Marquee from "../components/ui/marquee";
import { db } from '../lib/firebase';
import { ref, query, limitToLast, onValue, orderByChild } from 'firebase/database';
import { FaGithub, FaTwitter } from 'react-icons/fa';

interface Roast {
  id: string;
  type: 'single' | '1v1' | 'twitter';
  timestamp: number;
  username?: string;
  username1?: string;
  username2?: string;
  roast?: string;
  battleResult?: string;
  name?: string;
  avatar_url?: string;
  avatar_url1?: string;
  avatar_url2?: string;
  profile_image_url?: string;
}

const ReviewCard = ({ roast }: { roast: Roast }) => {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl p-4 mx-2",
        "bg-gray-800/50 hover:bg-gray-700/50",
        "transition-colors duration-200"
      )}
    >
      {roast.type === 'single' || roast.type === 'twitter' ? (
        <>
          <div className="flex flex-row items-center gap-2">
            <img className="rounded-full" width="40" height="40" alt="" src={roast.type === 'twitter' ? roast.profile_image_url : roast.avatar_url} />
            <div className="flex flex-col flex-grow">
              <figcaption className="text-sm font-medium text-white">
                {roast.name}
              </figcaption>
              <p className="text-xs font-medium text-gray-400">@{roast.username}</p>
            </div>
            {roast.type === 'twitter' ? (
              <FaTwitter className="text-blue-400" />
            ) : (
              <FaGithub className="text-white" />
            )}
          </div>
          <blockquote className="mt-2 text-sm text-gray-300">
            {roast.roast ? `${roast.roast.substring(0, 100)}...` : ''}
          </blockquote>
        </>
      ) : (
        <>
          <div className="flex flex-row items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img className="rounded-full" width="32" height="32" alt="" src={roast.avatar_url1} />
              <p className="text-xs font-medium text-gray-400">@{roast.username1}</p>
            </div>
            <span className="text-xs font-bold text-red-500">VS</span>
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium text-gray-400">@{roast.username2}</p>
              <img className="rounded-full" width="32" height="32" alt="" src={roast.avatar_url2} />
            </div>
          </div>
          <blockquote className="mt-2 text-sm text-gray-300">
            {roast.battleResult ? `${roast.battleResult.substring(0, 100)}...` : ''}
          </blockquote>
        </>
      )}
      <p className="text-xs text-gray-500 mt-2">
        {new Date(roast.timestamp).toLocaleString()}
      </p>
    </figure>
  );
};

export function RecentRoasts() {
  const [recentRoasts, setRecentRoasts] = useState<Roast[]>([]);

  useEffect(() => {
    const roastsRef = ref(db, 'roasts');
    const recentRoastsQuery = query(roastsRef, orderByChild('timestamp'), limitToLast(20));

    const unsubscribe = onValue(recentRoastsQuery, (snapshot) => {
      const roasts: Roast[] = [];
      snapshot.forEach((childSnapshot) => {
        const roast = childSnapshot.val();
        if (roast.type === 'single' || roast.type === 'twitter') {
          roasts.push({
            id: childSnapshot.key,
            type: roast.type,
            timestamp: roast.timestamp,
            username: roast.username,
            roast: roast.roast,
            name: roast.name,
            avatar_url: roast.avatar_url,
            profile_image_url: roast.profile_image_url,
          });
        } else if (roast.type === '1v1') {
          roasts.push({
            id: childSnapshot.key,
            type: '1v1',
            timestamp: roast.timestamp,
            username1: roast.username1,
            username2: roast.username2,
            battleResult: roast.battleResult,
            avatar_url1: roast.avatar_url1,
            avatar_url2: roast.avatar_url2,
          });
        }
      });
      setRecentRoasts(roasts.reverse());
    });

    return () => unsubscribe();
  }, []);

  const firstRow = recentRoasts.slice(0, recentRoasts.length / 2);
  const secondRow = recentRoasts.slice(recentRoasts.length / 2);

  return (
    <div className="w-full overflow-hidden">
      <Marquee pauseOnHover className="[--duration:40s] mb-4">
        {firstRow.map((roast) => (
          <ReviewCard key={roast.id} roast={roast} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {secondRow.map((roast) => (
          <ReviewCard key={roast.id} roast={roast} />
        ))}
      </Marquee>
    </div>
  );
}

export default RecentRoasts;
