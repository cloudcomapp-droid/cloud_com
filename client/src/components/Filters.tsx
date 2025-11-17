import { Target, Layers, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeaderDateRange } from "./HeaderDateRange";

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
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
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
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: FiltersProps) {
  return (
    <div className="flex items-center gap-4 px-6 py-3 border-t border-border bg-background">
      {/* Campaign */}
      <div className="flex items-center gap-2 flex-1 min-w-[220px]">
        <Target className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground whitespace-nowrap">
          Campaign
        </span>

        <Select
          value={selectedCampaign?.id || ""}
          onValueChange={(value) =>
            setSelectedCampaign(campaigns.find((c) => c.id === value))
          }
        >
          <SelectTrigger className="flex-1 min-w-0 h-9 text-sm bg-background">
            <SelectValue placeholder="Select campaign" />
          </SelectTrigger>

          <SelectContent>
            {campaigns?.map((c) => (
              <SelectItem key={c.id} value={c.id} className="text-sm">
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Asset Group */}
      <div className="flex items-center gap-2 flex-1 min-w-[220px]">
        <Layers className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground whitespace-nowrap">
          Asset Group
        </span>

        <Select
          value={selectedAssetGroup?.id || ""}
          onValueChange={(value) =>
            setSelectedAssetGroup(assetGroups.find((a) => a.id === value))
          }
        >
          <SelectTrigger className="flex-1 min-w-0 h-9 text-sm bg-background">
            <SelectValue placeholder="Select asset group" />
          </SelectTrigger>

          <SelectContent>
            {assetGroups?.map((g) => (
              <SelectItem key={g.id} value={g.id} className="text-sm">
                {g.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Custom Label */}
      <div className="flex items-center gap-2 flex-1 min-w-[220px]">
        <Tag className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground whitespace-nowrap">
          Custom Label
        </span>

        <Select
          value={selectedCustomLabel}
          onValueChange={setSelectedCustomLabel}
        >
          <SelectTrigger className="flex-1 min-w-0 h-9 text-sm bg-background">
            <SelectValue placeholder="Select label" />
          </SelectTrigger>

          <SelectContent>
            {customLabels.map((label) => (
              <SelectItem key={label} value={label} className="text-sm">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date + Apply */}
      <div className="flex items-center gap-4">
        <HeaderDateRange
          variant="dropdown"
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        <Button
          size="sm"
          className="whitespace-nowrap"
          onClick={() => fetchProducts?.(true)}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
