"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ResultDisplay } from './ResultDisplay';
import { Loader2 } from 'lucide-react';

interface StorageResult {
  key: string;
  value: string;
}

export function StorageExcavator() {
  const [localData, setLocalData] = useState<StorageResult[] | null>(null);
  const [sessionData, setSessionData] = useState<StorageResult[] | null>(null);
  const [indexedDbData, setIndexedDbData] = useState<StorageResult[] | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanRan, setScanRan] = useState(false);

  const runScan = () => {
    setIsScanning(true);
    setScanRan(false);
  };

  useEffect(() => {
    if (!isScanning) return;
    
    // Local Storage
    const local = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        local.push({ key, value: localStorage.getItem(key) || '' });
      }
    }
    setLocalData(local);

    // Session Storage
    const session = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        session.push({ key, value: sessionStorage.getItem(key) || '' });
      }
    }
    setSessionData(session);
    
    // IndexedDB
    const getIndexedDb = async () => {
      try {
        if ('databases' in indexedDB) {
          const dbs = await indexedDB.databases();
          if (dbs.length > 0) {
            setIndexedDbData(dbs.map(db => ({ key: db.name || 'Unknown DB', value: `Version: ${db.version}` })));
          } else {
            setIndexedDbData([]);
          }
        } else {
          setIndexedDbData([{ key: 'IndexedDB Status', value: 'Cannot list databases (API not supported by browser).' }]);
        }
      } catch (error) {
        setIndexedDbData([{ key: 'Error accessing IndexedDB', value: (error as Error).message }]);
      }
    };

    getIndexedDb().finally(() => {
      setIsScanning(false);
      setScanRan(true);
    });

  }, [isScanning]);
  
  return (
    <div>
      <p>Websites can store persistent data in your browser. This tool dumps the contents of localStorage, sessionStorage, and lists IndexedDB databases for this domain.</p>
      <Button onClick={runScan} disabled={isScanning} className="mt-4">
        {isScanning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isScanning ? 'Scanning...' : 'Excavate Storage'}
      </Button>

      <ResultDisplay title="Local Storage" data={localData} scanRan={scanRan} />
      <ResultDisplay title="Session Storage" data={sessionData} scanRan={scanRan} />
      <ResultDisplay title="IndexedDB Databases" data={indexedDbData} scanRan={scanRan} />
    </div>
  );
}
