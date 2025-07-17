"use client";

import { useState, useEffect, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ResultDisplay } from './ResultDisplay';

interface AutofillResult {
  key: string;
  value: string;
}

const autofillFields = [
  { name: 'name', autocomplete: 'name', label: 'Full Name' },
  { name: 'email', autocomplete: 'email', label: 'Email' },
  { name: 'tel', autocomplete: 'tel', label: 'Phone Number' },
  { name: 'street-address', autocomplete: 'street-address', label: 'Address' },
  { name: 'postal-code', autocomplete: 'postal-code', label: 'ZIP/Postal Code' },
  { name: 'city', autocomplete: 'address-level2', label: 'City' },
  { name: 'country', autocomplete: 'country-name', label: 'Country' },
  { name: 'cc-name', autocomplete: 'cc-name', label: 'Name on Card' },
  { name: 'cc-number', autocomplete: 'cc-number', label: 'Credit Card Number' },
  { name: 'cc-exp', autocomplete: 'cc-exp', label: 'Card Expiry' },
  { name: 'username', autocomplete: 'username', label: 'Username' },
  { name: 'bday', autocomplete: 'bday', label: 'Birthday' },
];

export function AutofillScanner() {
  const [results, setResults] = useState<AutofillResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanRan, setScanRan] = useState(false);
  const formId = useId();

  const runScan = () => {
    setIsScanning(true);
    setScanRan(false);
    setResults([]);
  };

  useEffect(() => {
    if (!isScanning) return;

    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) {
      setIsScanning(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      const newResults: AutofillResult[] = [];
      autofillFields.forEach(fieldInfo => {
        const input = form.elements.namedItem(fieldInfo.name) as HTMLInputElement;
        if (input && input.value) {
          // Basic heuristic to mask sensitive data
          const value = fieldInfo.autocomplete.includes('cc-') && input.value.length > 4 
            ? `**** **** **** ${input.value.slice(-4)}`
            : input.value;
          newResults.push({ key: fieldInfo.label, value });
        }
      });
      
      setResults(newResults);
      setIsScanning(false);
      setScanRan(true);
    }, 500); // Wait for browser autofill

    return () => clearTimeout(timeoutId);
  }, [isScanning, formId]);

  return (
    <div>
      <p>This tool creates a hidden form on the page to see what personal information your browser automatically fills in. No data is saved or sent anywhere.</p>
      <Button onClick={runScan} disabled={isScanning} className="mt-4">
        {isScanning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isScanning ? 'Scanning...' : 'Run Autofill Scan'}
      </Button>

      {/* Hidden form for the scanner */}
      {isScanning && (
        <form id={formId} className="absolute -left-[9999px] top-0">
          {autofillFields.map(field => (
            <input key={field.name} type="text" name={field.name} autoComplete={field.autocomplete} />
          ))}
        </form>
      )}

      <ResultDisplay title="Detected Autofill Data" data={results} scanRan={scanRan} />
    </div>
  );
}
