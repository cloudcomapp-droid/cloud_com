import { Calendar, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface HeaderDateRangeProps {
  variant: "minimalist" | "dropdown" | "integrated";
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

export function HeaderDateRange({
  variant,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: HeaderDateRangeProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "minimalist") {
    return (
      <div className="flex items-center gap-3">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-36 h-8 text-sm"
        />
        <span className="text-muted-foreground text-sm">to</span>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-36 h-8 text-sm"
        />
        <div className="flex gap-1 ml-4">
          <button className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded">
            7D
          </button>
          <button className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded">
            30D
          </button>
          <button className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded">
            1M
          </button>
        </div>
      </div>
    );
  }

  if (variant === "dropdown") {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-2 bg-background/50">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {new Date(startDate).toLocaleDateString()} -{" "}
              {new Date(endDate).toLocaleDateString()}
            </span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Select date range</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">From</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 h-8"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">To</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 h-8"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Last 7 Days
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Last 30 Days
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Last Month
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Last Quarter
              </Button>
            </div>
            <Button size="sm" className="w-full h-8" onClick={() => setIsOpen(false)}>
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  if (variant === "integrated") {
    return (
      <div className="flex items-center gap-4 px-4 py-2 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border/50">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Date Range:</span>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-32 h-7 text-xs border-border/50 bg-background/80"
          />
          <div className="w-2 h-px bg-border" />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-32 h-7 text-xs border-border/50 bg-background/80"
          />
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-primary/10">
            7D
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-primary/10">
            30D
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs bg-primary/10 text-primary">
            1M
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
