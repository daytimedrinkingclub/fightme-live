'use client'

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import Marquee from "../components/ui/marquee";
import { db } from '../lib/firebase';
import { ref, query, limitToLast, onValue } from 'firebase/database';
import { orderByChild } from 'firebase/database';

interface Roast {
  id: string;
  type: 'single' | '1v1';
  timestamp: number;
  username1: string;
  username2?: string;
  roast: string;
  name: string;
  avatar_url: string;
}

const ReviewCard = ({ roast }: { roast: Roast }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={roast.avatar_url} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {roast.name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">@{roast.username1}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{roast.roast.substring(0, 100)}...</blockquote>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(roast.timestamp).toLocaleString()}
      </p>
    </figure>
  );
};

export function RecentRoasts() {
  const [recentRoasts, setRecentRoasts] = useState<Roast[]>([]);

  useEffect(() => {
    const roastsRef = ref(db, 'roasts');
    const recentRoastsQuery = query(roastsRef, orderByChild('timestamp'), limitToLast(12));

    const unsubscribe = onValue(recentRoastsQuery, (snapshot) => {
      const roasts: Roast[] = [];
      snapshot.forEach((childSnapshot) => {
        const roast = childSnapshot.val();
        roasts.push({ id: childSnapshot.key, ...roast });
      });
      setRecentRoasts(roasts.reverse());
    });

    return () => unsubscribe();
  }, []);

  const firstRow = recentRoasts.slice(0, recentRoasts.length / 2);
  const secondRow = recentRoasts.slice(recentRoasts.length / 2);

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:40s]">
        {firstRow.map((roast) => (
          <ReviewCard key={roast.id} roast={roast} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {secondRow.map((roast) => (
          <ReviewCard key={roast.id} roast={roast} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

export default RecentRoasts;
