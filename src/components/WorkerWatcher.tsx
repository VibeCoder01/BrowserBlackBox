"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ResultDisplay } from './ResultDisplay';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface WorkerResult {
  key: string;
  value: string;
}

export function WorkerWatcher() {
  const [workerData, setWorkerData] = useState<WorkerResult[] | null>(null);
  const [cacheData, setCacheData] = useState<WorkerResult[] | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanRan, setScanRan] = useState(false);

  const runScan = () => {
    if (!('serviceWorker' in navigator && 'caches' in window)) {
       setScanRan(true);
       return;
    }
    setIsScanning(true);
    setScanRan(false);
  };

  useEffect(() => {
    if (!isScanning) return;
    
    const getWorkersAndCaches = async () => {
      try {
        // Service Workers
        const registrations = await navigator.serviceWorker.getRegistrations();
        if (registrations.length > 0) {
          setWorkerData(registrations.map(reg => ({ key: `Scope`, value: reg.scope })));
        } else {
          setWorkerData([]);
        }

        // Caches
        const keys = await caches.keys();
        if (keys.length > 0) {
          setCacheData(keys.map(key => ({ key: 'Cache Name', value: key })));
        } else {
          setCacheData([]);
        }
      } catch (error) {
        setWorkerData([{ key: 'Error', value: (error as Error).message }]);
        setCacheData([{ key: 'Error', value: (error as Error).message }]);
      } finally {
        setIsScanning(false);
        setScanRan(true);
      }
    };

    getWorkersAndCaches();

  }, [isScanning]);
  
  if (!('serviceWorker' in navigator)) {
    return (
       <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>API Not Supported</AlertTitle>
        <AlertDescription>
          Your browser does not support Service Workers. This scan cannot be performed.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div>
      <p>Service workers are scripts that run in the background and can cache resources for offline use. This can also be a source of persistent data.</p>
      <Button onClick={runScan} disabled={isScanning} className="mt-4">
        {isScanning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isScanning ? 'Scanning...' : 'Inspect Workers & Caches'}
      </Button>

      <ResultDisplay title="Registered Service Workers" data={workerData} scanRan={scanRan} emptyText="No active service workers found for this origin." />
      <ResultDisplay title="Cache Storage Keys" data={cacheData} scanRan={scanRan} emptyText="No cache storage found for this origin." />
    </div>
  );
}
