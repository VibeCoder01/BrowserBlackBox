import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/Header";
import { AutofillScanner } from "@/components/AutofillScanner";
import { HiddenFormScanner } from "@/components/HiddenFormScanner";
import { CacheDetective } from "@/components/CacheDetective";
import { MemoryLane } from "@/components/MemoryLane";
import { StorageExcavator } from "@/components/StorageExcavator";
import { WorkerWatcher } from "@/components/WorkerWatcher";
import { PrefetchPeek } from "@/components/PrefetchPeek";
import { RemediationGuide } from "@/components/RemediationGuide";
import { Fingerprint, EyeOff, History, Brain, Database, Workflow, Link as LinkIcon, ShieldCheck, ChevronRight } from "lucide-react";

export default function Home() {
  const features = [
    { value: "autofill", title: "Autofill Scanner", Icon: Fingerprint, Component: AutofillScanner },
    { value: "hidden-forms", title: "Hidden Form Scanner", Icon: EyeOff, Component: HiddenFormScanner },
    { value: "cache-detective", title: "Cache Detective", Icon: History, Component: CacheDetective },
    { value: "memory-lane", title: "Memory Lane", Icon: Brain, Component: MemoryLane },
    { value: "storage", title: "Storage Excavator", Icon: Database, Component: StorageExcavator },
    { value: "workers", title: "Worker Watcher", Icon: Workflow, Component: WorkerWatcher },
    { value: "prefetch", title: "Prefetch Peek", Icon: LinkIcon, Component: PrefetchPeek },
    { value: "remediation", title: "Privacy Remediation Guide", Icon: ShieldCheck, Component: RemediationGuide },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {features.map(({ value, title, Icon, Component }) => (
              <AccordionItem value={value} key={value} className="rounded-lg border-2 border-border bg-card/50 transition-all hover:border-primary/50">
                <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-4">
                    <Icon className="h-6 w-6 text-primary" />
                    <span>{title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0 text-muted-foreground">
                  <Component />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}
