// src/components/Filters.tsx
import { Target, Layers, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  campaigns: string[];
  selectedCampaign: string;
  setSelectedCampaign: (value: string) => void;
  assetGroups: string[];
  selectedAssetGroup: string;
  setSelectedAssetGroup: (value: string) => void;
  selectedCustomLabel: string;
  setSelectedCustomLabel: (value: string) => void;
}

export function Filters({
  campaigns,
  selectedCampaign,
  setSelectedCampaign,
  assetGroups,
  selectedAssetGroup,
  setSelectedAssetGroup,
  selectedCustomLabel,
  setSelectedCustomLabel,
}: FiltersProps) {
  return (
    <div className="w-full border-t border-border/50 bg-background/50 px-6 py-3">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Campaign */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-foreground">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Campaign</span>
          </div>
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger className="w-48 h-9 text-sm bg-background border-border/50">
              <SelectValue placeholder="Select Campaign" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border shadow-lg z-50">
              {campaigns?.map((campaign) => (
                <SelectItem key={campaign} value={campaign} className="text-sm">
                  {campaign}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Asset Group */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-foreground">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Asset Group</span>
          </div>
          <Select
            value={selectedAssetGroup}
            onValueChange={setSelectedAssetGroup}
          >
            <SelectTrigger className="w-48 h-9 text-sm bg-background border-border/50">
              <SelectValue placeholder="Select Asset Group" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border shadow-lg z-50">
              {assetGroups?.map((group) => (
                <SelectItem key={group} value={group} className="text-sm">
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Label */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-foreground">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Custom Label</span>
          </div>
          <Select
            value={selectedCustomLabel}
            onValueChange={setSelectedCustomLabel}
          >
            <SelectTrigger className="w-48 h-9 text-sm bg-background border-border/50">
              <SelectValue placeholder="Select Custom Label" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border shadow-lg z-50">
              {[
                "Alle Custom Labels",
                "High Value",
                "Seasonal",
                "New Product",
                "Best Seller",
                "Clearance",
              ].map((label) => (
                <SelectItem key={label} value={label} className="text-sm">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs"
            onClick={() => {
              setSelectedCampaign("Alle Kampagnen");
              setSelectedAssetGroup("Alle Asset-Gruppen");
              setSelectedCustomLabel("Alle Custom Labels");
            }}
          >
            Reset
          </Button>
          <Button size="sm" className="h-9 text-xs">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
