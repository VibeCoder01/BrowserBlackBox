"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MemoryLane() {
  return (
    <div>
      <p>Your browser often remembers what you've typed into forms before. Start typing in the field below to see what suggestions your browser offers from your past activity.</p>
      <div className="mt-4 space-y-2">
        <Label htmlFor="memory-lane-input">Try typing a common search...</Label>
        <Input 
          id="memory-lane-input"
          name="q" 
          autoComplete="on"
          placeholder="e.g., a city, a person's name, or a product"
          className="font-code"
        />
      </div>
       <div className="mt-4 space-y-2">
        <Label htmlFor="memory-lane-input-2">Or an answer to a personal question...</Label>
        <Input 
          id="memory-lane-input-2"
          name="medical_condition" 
          autoComplete="on"
          placeholder="e.g., a medical condition (for demonstration)"
          className="font-code"
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Note: The suggestions you see are coming directly from your own browser's memory. This website cannot see or record them.
      </p>
    </div>
  );
}
