import { Target, Layers, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Campaign {
  id: string;
  name: string;
}

interface AssetGroup {
  id: string;
  name: string;
}

interface FiltersProps {
  campaigns: Campaign[];
  selectedCampaign?: Campaign;
  setSelectedCampaign: (value?: Campaign) => void;
  assetGroups: AssetGroup[];
  selectedAssetGroup?: AssetGroup;
  setSelectedAssetGroup: (value?: AssetGroup) => void;
  selectedCustomLabel: string;
  setSelectedCustomLabel: (value: string) => void;
  customLabels: string[];
  fetchProducts?: (b: boolean) => void;
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
  customLabels,
  fetchProducts,
}: FiltersProps) {
  return (
    <div className="w-full border-t border-border/50 bg-background/50 px-0 py-2 flex justify-center">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Campaign */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-foreground">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Campaign</span>
          </div>
          <Select
            value={selectedCampaign?.id || ""}
            onValueChange={(value) =>
              setSelectedCampaign(campaigns.find((c) => c.id === value))
            }
          >
            <SelectTrigger className="w-40 h-9 text-sm bg-background border-border/50">
              <SelectValue placeholder="Select Campaign" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border shadow-lg z-50">
              {campaigns?.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id} className="text-sm">
                  {String(campaign.name || "Unnamed")}
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
            value={selectedAssetGroup?.id || ""}
            onValueChange={(value) =>
              setSelectedAssetGroup(assetGroups.find((a) => a.id === value))
            }
          >
            <SelectTrigger className="w-40 h-9 text-sm bg-background border-border/50">
              <SelectValue placeholder="Select Asset Group" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border shadow-lg z-50">
              {assetGroups?.map((group) => (
                <SelectItem key={group.id} value={group.id} className="text-sm">
                  {group.name}
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
            <SelectTrigger className="w-36 h-9 text-sm bg-background border-border/50">
              <SelectValue placeholder="Select Custom Label" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border shadow-lg z-50">
              {customLabels.map((label) => (
                <SelectItem key={label} value={label} className="text-sm">
                  {String(label || "Unnamed")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button size="sm" className="h-9 text-xs" onClick={() => fetchProducts && fetchProducts(true)}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
