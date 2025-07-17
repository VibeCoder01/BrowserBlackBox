import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/Header";
import { featuresConfig } from "@/config/features";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {featuresConfig.map(({ value, title, Icon, Component }) => (
              <AccordionItem value={value} key={value} className="rounded-lg border-2 border-border bg-card/50 transition-all hover:border-primary/50">
                <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-4">
                    <Icon className="h-6 w-6 text-primary" />
                    <span>{title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0 text-muted-foreground data-[state=open]:animate-none">
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
