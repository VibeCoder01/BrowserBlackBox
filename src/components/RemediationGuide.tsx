import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const guideData = {
  Chrome: [
    {
      title: 'Clear Autofill Data',
      steps: [
        'Go to Settings > Autofill and passwords.',
        'Select "Passwords manager", "Payment methods", or "Addresses and more".',
        'Find the entry you want to remove and click the three-dot menu, then select "Remove".'
      ]
    },
    {
      title: 'Clear Site Data (Cookies, Storage, Cache)',
      steps: [
        'Go to Settings > Privacy and security > Clear browsing data.',
        'Select the "Advanced" tab.',
        'Choose a "Time range" (e.g., "All time").',
        'Check "Cookies and other site data" and "Cached images and files".',
        'Click "Clear data".',
      ]
    },
     {
      title: 'Remove Service Workers',
      steps: [
        'Open Developer Tools (F12 or Ctrl+Shift+I).',
        'Go to the "Application" tab.',
        'Select "Service Workers" in the left panel.',
        'Click "Unregister" for any worker you want to remove.',
      ]
    }
  ],
  Firefox: [
     {
      title: 'Clear Autofill Data',
      steps: [
        'Go to Settings > Privacy & Security.',
        'Under "Forms and Autofill", click "Saved Addresses..." or "Saved Credit Cards..." to manage entries.',
      ]
    },
    {
      title: 'Clear Site Data (Cookies, Storage, Cache)',
      steps: [
        'Go to Settings > Privacy & Security.',
        'Under "Cookies and Site Data", click "Clear Data...".',
        'Check both boxes and click "Clear".',
      ]
    },
  ],
   Safari: [
     {
      title: 'Clear Autofill Data',
      steps: [
        'Go to Safari > Settings (or Preferences).',
        'Go to the "AutoFill" tab.',
        'Click "Edit..." next to each category to manage saved information.',
      ]
    },
    {
      title: 'Clear Website Data',
      steps: [
        'Go to Safari > Settings (or Preferences).',
        'Go to the "Privacy" tab.',
        'Click "Manage Website Data...".',
        'Select a website and click "Remove", or click "Remove All".',
      ]
    },
  ],
};

export function RemediationGuide() {
  return (
    <div>
      <p>Here are some general instructions for clearing the types of data this tool can detect. For specific and up-to-date instructions, always refer to your browser's official help documentation.</p>

      <Accordion type="multiple" className="w-full mt-4">
        {Object.entries(guideData).map(([browser, guides]) => (
          <AccordionItem value={browser} key={browser}>
            <AccordionTrigger className="text-base">{browser}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {guides.map(guide => (
                   <div key={guide.title}>
                      <h4 className="font-semibold text-foreground">{guide.title}</h4>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                        {guide.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                   </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
