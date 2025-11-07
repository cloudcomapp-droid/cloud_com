import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Search, Bell, Globe, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeaderDateRange } from "@/components/HeaderDateRange";
import { HeaderFilters } from "@/components/HeaderFilters";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { CommandPalette } from "@/components/CommandPalette";
import { useNavigationState } from "@/hooks/useNavigationState";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AppLayout() {
  const [commandOpen, setCommandOpen] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites, currentPath } = useNavigationState();

  // --- lifted filter state for header (so HeaderFilters is controlled) ---
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string | undefined>(undefined);
  const [assetGroups, setAssetGroups] = useState<string[]>([]);
  const [selectedAssetGroup, setSelectedAssetGroup] = useState<string | undefined>(undefined);
  const [selectedCustomLabel, setSelectedCustomLabel] = useState<string>("Alle Custom Labels");

  // fetch campaigns + first campaign asset-groups
  const fetchInitialFilters = async (force = false) => {
    try {
      const respCamps = await fetch(
        `http://localhost:5000/google-campaigns${force ? "?fetch=1" : ""}`,
        { credentials: "include" }
      );
      const jsonCamps = await respCamps.json();
      // support { data: [...] } or direct array
      const campList = Array.isArray(jsonCamps?.data) ? jsonCamps.data : (Array.isArray(jsonCamps) ? jsonCamps : []);
      // normalize label
      setCampaigns(["Alle Kampagnen", ...campList]);
      const firstCamp = campList?.[0];
      setSelectedCampaign(firstCamp);

      if (firstCamp) {
        // const respGroups = await fetch(
        //   `http://localhost:5000/google-asset-groups?campaignId=${encodeURIComponent(firstCamp)}`,
        //   { credentials: "include" }
        // );
        // const jsonGroups = await respGroups.json();
        // const groupList = Array.isArray(jsonGroups?.data) ? jsonGroups.data : (Array.isArray(jsonGroups) ? jsonGroups : []);
        const groupList = ["Asset Group 1", "Asset Group 2", "Asset Group 3"]; // placeholder until backend works
        setAssetGroups(["Alle Asset-Gruppen", ...groupList]);
        setSelectedAssetGroup(groupList?.[0]);
      }
    } catch (err) {
      console.error("Failed to fetch filters (layout):", err);
    }
  };

  // Keyboard shortcuts (unchanged)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          const searchInput = document.querySelector('input[placeholder*="Suchen"]') as HTMLInputElement;
          searchInput?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // fetch filters once on layout mount so header shows correct selection immediately
  useEffect(() => {
    fetchInitialFilters(false);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

        {/* Left Navigation */}
        <AppSidebar />

        {/* Main area */}
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="sticky top-0 z-50 h-18 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95">
            <div className="flex items-center gap-8 px-8 h-full">
              {/* Left: Navigation & Breadcrumbs */}
              <div className="flex items-center gap-6">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground p-2 hover:bg-sidebar-accent/50 rounded-lg transition-colors" />
                <div className="h-8 w-px bg-border/60"></div>
                <BreadcrumbNav />
              </div>

              {/* Center: Search Bar */}
              <div className="flex-1 max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for Products, Campaigns... (/ oder ⌘K)"
                    className="w-full pl-12 pr-4 h-12 bg-background/50 border border-border rounded-xl focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all text-body"
                    onFocus={() => setCommandOpen(true)}
                    readOnly
                  />
                </div>
              </div>

              {/* Center-Right: Date Range & Filters (HeaderFilters is controlled here) */}
              <div className="flex items-center gap-4">
                <div className="h-8 w-px bg-border/60"></div>
                <HeaderDateRange variant="dropdown" />

                <HeaderFilters
                  campaigns={campaigns}
                  selectedCampaign={selectedCampaign}
                  setSelectedCampaign={setSelectedCampaign}
                  assetGroups={assetGroups}
                  selectedAssetGroup={selectedAssetGroup}
                  setSelectedAssetGroup={setSelectedAssetGroup}
                  selectedCustomLabel={selectedCustomLabel}
                  setSelectedCustomLabel={setSelectedCustomLabel}
                />
              </div>

              {/* Right: User Controls */}
              <div className="flex items-center gap-4">
                <div className="h-8 w-px bg-border/60"></div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 w-11 p-0"
                  onClick={() => {
                    if (isFavorite(currentPath)) {
                      removeFromFavorites(currentPath);
                    } else {
                      addToFavorites(currentPath);
                    }
                  }}
                  aria-label="Zu Favoriten hinzufügen/entfernen"
                >
                  <Star
                    className={`h-5 w-5 ${isFavorite(currentPath) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`}
                  />
                </Button>

                <button className="h-11 w-11 grid place-items-center rounded-xl bg-background/50 hover:bg-muted border border-border transition-colors" aria-label="Sprache">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="relative h-11 w-11 grid place-items-center rounded-xl bg-background/50 hover:bg-muted border border-border transition-colors" aria-label="Benachrichtigungen">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div className="absolute top-2 right-2 h-2.5 w-2.5 bg-primary rounded-full"></div>
                </button>
                <Avatar className="h-10 w-10 ring-2 ring-border">
                  <AvatarImage src="/lovable-uploads/87c5555e-8578-464b-859e-3310337e52cd.png" alt="Nutzeravatar" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium text-small">GA</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <main className="flex-1">
            {/* pass filter state/actions to pages via Outlet context */}
            <Outlet context={{
              campaigns,
              selectedCampaign,
              setSelectedCampaign,
              assetGroups,
              selectedAssetGroup,
              setSelectedAssetGroup,
              selectedCustomLabel,
              setSelectedCustomLabel,
              fetchInitialFilters
            }} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}