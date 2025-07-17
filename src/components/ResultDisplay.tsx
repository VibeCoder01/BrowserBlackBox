import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultDisplayProps {
  title: string;
  data: { key: string; value: string }[] | null;
  scanRan: boolean;
  emptyText?: string;
}

export function ResultDisplay({ title, data, scanRan, emptyText = "No data found." }: ResultDisplayProps) {
  if (!scanRan) {
    return null;
  }

  return (
    <Card className="mt-4 bg-background/50">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Key</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(({ key, value }) => (
                <TableRow key={key}>
                  <TableCell className="font-medium text-foreground/80">{key}</TableCell>
                  <TableCell className="font-code text-accent-foreground break-all">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-muted-foreground italic py-4">{emptyText}</p>
        )}
      </CardContent>
    </Card>
  );
}
