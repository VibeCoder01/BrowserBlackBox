"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ResultDisplay } from './ResultDisplay';

interface PrefetchResult {
  key: string;
  value: string;
}

export function PrefetchPeek() {
  const [results, setResults] = useState<PrefetchResult[]>([]);
  const [scanRan, setScanRan] = useState(false);

  const runScan = () => {
    const newResults: PrefetchResult[] = [];
    const selectors = 'link[rel="dns-prefetch"], link[rel="preconnect"], link[rel="prefetch"]';
    const links = document.querySelectorAll(selectors);

    links.forEach(link => {
      newResults.push({
        key: `Type: ${link.getAttribute('rel')}`,
        value: link.getAttribute('href') || 'No href found',
      });
    });

    setResults(newResults);
    setScanRan(true);
  };
  
  // Run scan on mount
  useEffect(() => {
    runScan();
  }, []);

  return (
    <div>
      <p>Websites can give hints to your browser to pre-fetch DNS records, pre-connect to servers, or even prefetch entire resources before you click anything. This can leak information about your potential next actions.</p>
      <p className="mt-2 text-sm text-muted-foreground">This scan runs automatically on page load. The results below are from the current page.</p>
      <ResultDisplay 
        title="Detected Prefetch Hints" 
        data={results} 
        scanRan={scanRan} 
        emptyText="No prefetch/preconnect links found in the page's HTML."
      />
    </div>
  );
}
