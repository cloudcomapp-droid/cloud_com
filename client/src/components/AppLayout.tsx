import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Search, Bell, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeaderDateRange } from "@/components/HeaderDateRange";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { CommandPalette } from "@/components/CommandPalette";
import { useNavigationState } from "@/hooks/useNavigationState";
import { useState, useEffect } from "react";
import { Filters } from "./Filters";
import { useFilters } from "@/hooks/use-filters";
import { Button } from "@/components/ui/button";
import Products from "@/pages/Products";

export default function AppLayout() {
  const [commandOpen, setCommandOpen] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites, currentPath } =
    useNavigationState();
  const [classificationRules, setClassificationRules] = useState(() => {
    const stored = localStorage.getItem("classificationRules");
    return stored
      ? JSON.parse(stored)
      : {
          cashCowRoas: 3,
          cashCowConv: 1,
          poorDogRoasMax: 3,
          poorDogRoasMin: 1,
          poorDogConv: 1,
          hopelessCost: 10,
          hopelessRoas: 1,
          numbRoas: 1,
          numbCosts:10,
          silentRoas: 0,
          silentCosts:0,
        };
  });

  // Mantener sincronizado cada vez que cambien las rules
  useEffect(() => {
    localStorage.setItem(
      "classificationRules",
      JSON.stringify(classificationRules)
    );
  }, [classificationRules]);

  const {
    campaigns,
    selectedCampaign,
    setSelectedCampaign,
    assetGroups,
    selectedAssetGroup,
    setSelectedAssetGroup,
    selectedCustomLabel,
    setSelectedCustomLabel,
    fetchInitialFilters,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    clientName,
    customLabels,
    searchClientById,
    clientId,
    products,
  } = useFilters();

  const [clientInput, setClientInput] = useState(clientId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-50 border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95">
            {/* 🔵 PRIMERA FILA */}
            <div className="flex items-center justify-between px-6 py-3 border-border">
              <div className="flex items-center gap-6">
                <BreadcrumbNav />

                {/* 🔵 Client search */}
                <div className="flex items-center gap-3">
                  <span className="font-bold text-foreground text-base">
                    Client:
                  </span>

                  <Input
                    placeholder="Client ID"
                    value={clientInput}
                    onChange={(e) => setClientInput(e.target.value)}
                    className="h-9 w-28"
                  />

                  <Button
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => {}}
                  >
                    Apply
                  </Button>
                </div>

                {/* Client name */}
                <div className="ml-2 font-medium text-primary flex items-center">
                  {clientName || "—"}
                </div>
              </div>

              {/* 🔵 Icons + Avatar */}
              <div className="flex items-center gap-4">
                {/*                 <HeaderDateRange
                  variant="dropdown"
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                /> */}

                {/* Search bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for Products, Campaigns..."
                    className="w-full pl-12 pr-4 h-11 bg-background/60 rounded-xl"
                    onFocus={() => setCommandOpen(true)}
                    readOnly
                  />
                </div>

                <button className="h-11 w-11 grid place-items-center rounded-xl bg-background/50 hover:bg-muted border border-border">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </button>

                <button className="relative h-11 w-11 grid place-items-center rounded-xl bg-background/50 hover:bg-muted border border-border">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div className="absolute top-2 right-2 h-2.5 w-2.5 bg-primary rounded-full"></div>
                </button>

                <Avatar className="h-10 w-10 ring-2 ring-border">
                  <AvatarImage src="/lovable-uploads/87c5555e-8578-464b-859e-3310337e52cd.png" />
                  <AvatarFallback>GA</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* 🔵 SEGUNDA FILA */}
            <div className="px-0 py-2 bg-card border-b border-border">
              <Filters
                campaigns={campaigns}
                selectedCampaign={selectedCampaign}
                setSelectedCampaign={setSelectedCampaign}
                assetGroups={assetGroups}
                selectedAssetGroup={selectedAssetGroup}
                setSelectedAssetGroup={setSelectedAssetGroup}
                selectedCustomLabel={selectedCustomLabel}
                setSelectedCustomLabel={setSelectedCustomLabel}
                customLabels={customLabels}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </div>
          </header>

          {/* CONTENT */}
          <main className="flex-1">
            <Outlet
              context={{
                campaigns,
                selectedCampaign,
                setSelectedCampaign,
                assetGroups,
                selectedAssetGroup,
                setSelectedAssetGroup,
                selectedCustomLabel,
                setSelectedCustomLabel,
                fetchInitialFilters,
                products,
                classificationRules,
                setClassificationRules,
              }}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
