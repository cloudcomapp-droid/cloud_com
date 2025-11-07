import { useEffect, useState } from "react";
import { ChevronDown, Filter, Target, Layers, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HeaderFilters({
  campaigns,
  selectedCampaign,
  setSelectedCampaign,
  assetGroups,
  selectedAssetGroup,
  setSelectedAssetGroup,
  selectedCustomLabel,
  setSelectedCustomLabel,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const getDisplayText = () => "Filter";

  const hasActiveFilters =
    selectedCampaign !== "Alle Kampagnen" ||
    selectedAssetGroup !== "Alle Asset-Gruppen" ||
    selectedCustomLabel !== "Alle Custom Labels";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-12 gap-2 bg-background/50 border-border rounded-xl px-4 transition-all ${hasActiveFilters ? "border-primary bg-primary/5 text-primary" : ""
            }`}
        >
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">{getDisplayText()}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0 bg-background border-border shadow-lg rounded-xl" align="start">
        {/* campaigns */}
        <div className="space-y-2 p-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-foreground">Select Filter</h4>
            <p className="text-xs text-muted-foreground">
              Restrict your data by campaign, asset group and custom label
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-foreground">Campaign</label>
            </div>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-full h-9 text-sm bg-background border-border/50">
                <SelectValue placeholder="Selected Campaign" />
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

          {/* asset groups */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-foreground">Asset Group</label>
            </div>
            <Select value={selectedAssetGroup} onValueChange={setSelectedAssetGroup}>
              <SelectTrigger className="w-full h-9 text-sm bg-background border-border/50">
                <SelectValue placeholder="Selected Asset Group" />
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

          {/* custom label */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-foreground">Custom Label</label>
            </div>
            <Select value={selectedCustomLabel} onValueChange={setSelectedCustomLabel}>
              <SelectTrigger className="w-full h-9 text-sm bg-background border-border/50">
                <SelectValue placeholder="Selected Custom Label" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border shadow-lg z-50">
                {["Alle Custom Labels", "High Value", "Seasonal", "New Product", "Best Seller", "Clearance"].map(
                  (label) => (
                    <SelectItem key={label} value={label} className="text-sm">
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* buttons */}
          <div className="flex gap-2 pt-2 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs"
              onClick={() => {
                setSelectedCampaign("Alle Kampagnen");
                setSelectedAssetGroup("Alle Asset-Gruppen");
                setSelectedCustomLabel("Alle Custom Labels");
              }}
            >
              Zurücksetzen
            </Button>
            <Button size="sm" className="flex-1 h-8 text-xs" onClick={() => setIsOpen(false)}>
              Anwenden
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}