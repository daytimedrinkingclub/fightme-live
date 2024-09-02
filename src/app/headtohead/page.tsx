'use client';

import { useState } from 'react';
import HeadToHeadForm from '../../components/HeadToHeadForm';
import ComparisonDisplay from '../../components/ComparisonDisplay';

export default function HeadToHead() {
  const [comparisonData, setComparisonData] = useState(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-4xl font-bold text-teal-600 mb-8">GitHub Head-to-Head</h1>
      {!comparisonData && <HeadToHeadForm setComparisonData={setComparisonData} />}
      {comparisonData && <ComparisonDisplay comparisonData={comparisonData} />}
    </main>
  );
}