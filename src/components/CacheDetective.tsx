"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ResultDisplay } from './ResultDisplay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface NavResult {
  key: string;
  value: string;
}

const exampleLinks = [
  { name: 'Google', url: 'https://www.google.com' },
  { name: 'Facebook', url: 'https://www.facebook.com' },
  { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
  { name: 'Reddit', url: 'https://www.reddit.com' },
];

export function CacheDetective() {
  const [results, setResults] = useState<NavResult[]>([]);
  const [scanRan, setScanRan] = useState(false);

  const runScan = () => {
    const entries = performance.getEntriesByType('navigation');
    const navResults = entries.map((entry, i) => ({
      key: `Navigation #${i + 1}`,
      value: entry.name,
    }));
    setResults(navResults);
    setScanRan(true);
  };

  return (
    <div>
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>A Note on History</AlertTitle>
        <AlertDescription>
          In the past, websites could easily check your browsing history using CSS tricks. Modern browsers have fixed this major privacy flaw. This scanner now checks the Performance API, which only reveals navigation history for the current tab session.
        </AlertDescription>
      </Alert>
      <p className="mt-4">Below is a list of well-known sites. In older browsers, a script could determine if you had visited them. Today, their color should not change based on your history.</p>
      <div className="my-4 flex flex-wrap gap-4">
        {exampleLinks.map(link => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{link.name}</a>
        ))}
      </div>
      <Button onClick={runScan} className="mt-4">
        Scan Current Session History
      </Button>
      <ResultDisplay 
        title="Current Session Navigation" 
        data={results} 
        scanRan={scanRan}
        emptyText="No session navigation entries found. Try navigating to another page and coming back."
      />
    </div>
  );
}
