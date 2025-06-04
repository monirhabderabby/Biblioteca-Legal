import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  href: string;
  subtitle: string;
}

const ContentCard = ({ title, subtitle, description, href }: Props) => {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          className="w-full text-primary hover:text-primary/80"
          asChild
        >
          <Link href={href}>Manage Content</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
