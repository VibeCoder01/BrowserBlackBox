import React from 'react';
import { Fingerprint, EyeOff, History, Brain, Database, Workflow, Link as LinkIcon, ShieldCheck } from "lucide-react";
import { AutofillScanner } from "@/components/AutofillScanner";
import { HiddenFormScanner } from "@/components/HiddenFormScanner";
import { CacheDetective } from "@/components/CacheDetective";
import { MemoryLane } from "@/components/MemoryLane";
import { StorageExcavator } from "@/components/StorageExcavator";
import { WorkerWatcher } from "@/components/WorkerWatcher";
import { PrefetchPeek } from "@/components/PrefetchPeek";
import { RemediationGuide } from "@/components/RemediationGuide";

interface Feature {
  value: string;
  title: string;
  Icon: React.ElementType;
  Component: React.ElementType;
}

export const featuresConfig: Feature[] = [
  { value: "autofill", title: "Autofill Scanner", Icon: Fingerprint, Component: AutofillScanner },
  { value: "hidden-forms", title: "Hidden Form Scanner", Icon: EyeOff, Component: HiddenFormScanner },
  { value: "cache-detective", title: "Cache Detective", Icon: History, Component: CacheDetective },
  { value: "memory-lane", title: "Memory Lane", Icon: Brain, Component: MemoryLane },
  { value: "storage", title: "Storage Excavator", Icon: Database, Component: StorageExcavator },
  { value: "workers", title: "Worker Watcher", Icon: Workflow, Component: WorkerWatcher },
  { value: "prefetch", title: "Prefetch Peek", Icon: LinkIcon, Component: PrefetchPeek },
  { value: "remediation", title: "Privacy Remediation Guide", Icon: ShieldCheck, Component: RemediationGuide },
];
