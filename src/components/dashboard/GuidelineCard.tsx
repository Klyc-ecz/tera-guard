
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuidelineCardProps {
  title: string;
  organization: string;
  date: string;
  url: string;
}

const GuidelineCard: React.FC<GuidelineCardProps> = ({
  title,
  organization,
  date,
  url,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-semibold flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{organization}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{date}</span>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            Görüntüle
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GuidelineCard;
