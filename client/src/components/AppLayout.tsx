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

export default function AppLayout() {
  const [commandOpen, setCommandOpen] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites, currentPath } =
    useNavigationState();
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
    fetchProducts,
    searchClientById,
    clientId,
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
          <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95">
            {/* ========================= */}
            {/* 🔵 PRIMERA FILA - HEADER */}
            {/* ========================= */}
            <div className="flex items-center justify-between px-8 py-3 border-b border-border">
              {/* LEFT SECTION: Breadcrumb + Client name */}
              <div className="flex items-center gap-6">
                <BreadcrumbNav />

                {/* 🔵 Client search input */}
                <div className="flex items-center gap-2">
                                    <span className="mr-2 text-foreground font-semibold">
                    Client:
                  </span>
                  <Input
                    placeholder="Client ID"
                    value={clientInput}
                    onChange={(e) => setClientInput(e.target.value)}
                    className="h-6 w-20"
                  />

                  <button
                    onClick={() => {
                      //fetchInitialFilters(true);
                      //searchClientById(clientInput);
                    }}
                    className="flex items-center gap-2 px-6 h-8 rounded-xl border bg-background hover:bg-muted"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>

                {/* Current client name */}
                <div className="flex items-center text-sm text-muted-foreground font-medium">
                  <span>{clientName || "—"}</span>
                </div>
              </div>

              {/* CENTER: Search bar */}
              <div className="flex-1 max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for Products, Campaigns..."
                    className="w-full pl-12 pr-4 h-11 bg-background/60 border rounded-xl"
                    onFocus={() => setCommandOpen(true)}
                    readOnly
                  />
                </div>
              </div>

              {/* RIGHT SECTION: Date + Icons + Avatar */}
              <div className="flex items-center gap-4">
                <HeaderDateRange
                  variant="dropdown"
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />

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

            {/* ========================= */}
            {/* 🔵 SEGUNDA FILA - FILTERS */}
            {/* ========================= */}
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
                fetchProducts={fetchProducts}
              />
            </div>
          </header>

          {/* ========================= */}
          {/* 🔵 PAGE CONTENT */}
          {/* ========================= */}
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
              }}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
