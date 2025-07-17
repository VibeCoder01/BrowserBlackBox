"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ResultDisplay } from './ResultDisplay';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Fingerprint } from 'lucide-react';

interface CanvasResult {
  key: string;
  value: string;
}

export function CanvasFingerprint() {
  const [results, setResults] = useState<CanvasResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanRan, setScanRan] = useState(false);

  const runScan = () => {
    setIsScanning(true);
    setScanRan(false);
    
    // Use a short timeout to allow the loader to render
    setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 60;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          setResults([{ key: 'Error', value: 'Could not get canvas context.' }]);
          setIsScanning(false);
          setScanRan(true);
          return;
        }
        
        // A random-ish phrase and emoji to get more rendering variance
        const text = "BrowserBlackBox.io <canvas> 1.0 🤪";
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText(text, 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText(text, 4, 17);

        const dataUrl = canvas.toDataURL();

        // Simple hash function
        let hash = 0;
        for (let i = 0; i < dataUrl.length; i++) {
          const char = dataUrl.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32bit integer
        }
        const finalHash = Math.abs(hash).toString(16);

        setResults([
          { key: 'Canvas Fingerprint Hash', value: finalHash },
          { key: 'Image Preview', value: '' } // Placeholder for image
        ]);

      } catch (error) {
        setResults([{ key: 'Error', value: (error as Error).message }]);
      } finally {
        setIsScanning(false);
        setScanRan(true);
      }
    }, 50);
  };

  const renderValue = (value: string, key: string) => {
    if (key === 'Image Preview' && results.length > 0 && results[0].value) {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 60;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const text = "BrowserBlackBox.io <canvas> 1.0 🤪";
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText(text, 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText(text, 4, 17);
        return <img src={canvas.toDataURL()} alt="Canvas Fingerprint" className="border rounded-md" />;
      }
    }
    return <span className="font-code text-accent-foreground break-all">{value}</span>;
  }

  return (
    <div>
       <Alert>
        <Fingerprint className="h-4 w-4" />
        <AlertTitle>What is Canvas Fingerprinting?</AlertTitle>
        <AlertDescription>
         This technique uses an invisible HTML5 canvas element to draw graphics. Subtle differences in your computer's hardware (GPU), graphics drivers, and installed fonts cause the rendered image to be unique. This uniqueness can be converted into a stable ID to track you across websites.
        </AlertDescription>
      </Alert>
      <Button onClick={runScan} disabled={isScanning} className="mt-4">
        {isScanning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isScanning ? 'Generating...' : 'Run Canvas Fingerprint'}
      </Button>

      {scanRan && (
        <div className="mt-4">
          {results.map(({ key, value }, index) => (
             <div key={index} className="mt-2">
                <p className="font-medium text-foreground/80 break-all">{key}</p>
                <div>{renderValue(value, key)}</div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
