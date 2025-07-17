"use client";

import { useState, useEffect, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ResultDisplay } from './ResultDisplay';

interface HiddenFormResult {
  key: string;
  value: string;
}

const hidingTechniques = [
  { id: 'off-screen', label: 'Positioned Off-Screen', style: { position: 'absolute' as 'absolute', left: '-9999px' } },
  { id: 'opacity-zero', label: 'Opacity 0', style: { opacity: 0 } },
  { id: 'visibility-hidden', label: 'Visibility Hidden', style: { visibility: 'hidden' as 'hidden' } },
  { id: 'display-none', label: 'Display None', style: { display: 'none' } },
  { id: 'zero-size', label: 'Zero Width/Height', style: { width: 0, height: 0, overflow: 'hidden' as 'hidden' } },
];

export function HiddenFormScanner() {
  const [results, setResults] = useState<HiddenFormResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanRan, setScanRan] = useState(false);
  const baseId = useId();

  const runScan = () => {
    setIsScanning(true);
    setScanRan(false);
    setResults([]);
  };

  useEffect(() => {
    if (!isScanning) return;

    const timeoutId = setTimeout(() => {
      const newResults: HiddenFormResult[] = [];
      hidingTechniques.forEach(technique => {
        const form = document.getElementById(`${baseId}-${technique.id}`) as HTMLFormElement;
        if (form) {
          const input = form.elements.namedItem('email') as HTMLInputElement;
          if (input && input.value) {
            newResults.push({ key: technique.label, value: 'Vulnerable to autofill' });
          } else {
            newResults.push({ key: technique.label, value: 'Seems secure' });
          }
        }
      });
      
      setResults(newResults);
      setIsScanning(false);
      setScanRan(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isScanning, baseId]);

  return (
    <div>
      <p>Phishing sites can use invisible forms to steal autofilled data. This test checks which CSS hiding techniques your browser might still autofill.</p>
      <Button onClick={runScan} disabled={isScanning} className="mt-4">
        {isScanning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isScanning ? 'Scanning...' : 'Run Hidden Form Scan'}
      </Button>

      {isScanning && (
        <div>
          {hidingTechniques.map(technique => (
            <form key={technique.id} id={`${baseId}-${technique.id}`} style={technique.style}>
              <input type="email" name="email" autoComplete="email" />
            </form>
          ))}
        </div>
      )}

      <ResultDisplay title="Hidden Form Vulnerability" data={results} scanRan={scanRan} />
    </div>
  );
}
