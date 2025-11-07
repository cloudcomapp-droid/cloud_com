import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Search, Bell, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeaderDateRange } from "@/components/HeaderDateRange";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AppLayoutProposals() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Header Datumsbereich - 3 Vorschläge</h1>
          <p className="text-muted-foreground">Verschiedene Ansätze für die Integration des Datumsbereichs im Header</p>
        </div>

        <Tabs defaultValue="minimalist" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="minimalist">Minimalist</TabsTrigger>
            <TabsTrigger value="dropdown">Dropdown</TabsTrigger>
            <TabsTrigger value="integrated">Integriert</TabsTrigger>
          </TabsList>

          <TabsContent value="minimalist" className="space-y-4">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-xl font-semibold mb-4">Vorschlag 1: Minimalist</h3>
              <p className="text-muted-foreground mb-6">Kompakte, direkte Integration mit sichtbaren Datumseingaben und Quick-Buttons</p>
              
              <div className="border border-border rounded-lg overflow-hidden">
                <SidebarProvider>
                  <div className="flex w-full bg-background">
                    <div className="w-64 bg-muted/20 h-20 flex items-center justify-center text-muted-foreground text-sm">
                      Sidebar
                    </div>
                    <div className="flex-1">
                      <header className="h-20 border-b border-border bg-card/95 backdrop-blur">
                        <div className="flex items-center gap-4 px-6 h-12 border-b border-border/50">
                          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                          <div className="flex-1">
                            <HeaderDateRange variant="minimalist" />
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="h-8 w-8 grid place-items-center rounded-lg bg-background/50 hover:bg-muted border border-border">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button className="relative h-8 w-8 grid place-items-center rounded-lg bg-background/50 hover:bg-muted border border-border">
                              <Bell className="h-4 w-4 text-muted-foreground" />
                              <div className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></div>
                            </button>
                            <Avatar className="h-8 w-8 border-2 border-border">
                              <AvatarFallback className="bg-primary text-primary-foreground text-sm">GA</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 px-6 h-8">
                          <div className="flex-1 max-w-md">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search for Products, Campaigns..."
                                className="w-full pl-10 pr-4 h-8 bg-background/50 border border-border rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </header>
                    </div>
                  </div>
                </SidebarProvider>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-green-600">Vorteile:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Alle wichtigen Elemente sofort sichtbar</li>
                  <li>Schnelle Datumsauswahl mit Quick-Buttons</li>
                  <li>Kompakte, effiziente Nutzung des Header-Raums</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dropdown" className="space-y-4">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-xl font-semibold mb-4">Vorschlag 2: Dropdown</h3>
              <p className="text-muted-foreground mb-6">Elegante Lösung mit Popover - spart Platz und bietet erweiterte Optionen</p>
              
              <div className="border border-border rounded-lg overflow-hidden">
                <SidebarProvider>
                  <div className="flex w-full bg-background">
                    <div className="w-64 bg-muted/20 h-16 flex items-center justify-center text-muted-foreground text-sm">
                      Sidebar
                    </div>
                    <div className="flex-1">
                      <header className="h-16 border-b border-border bg-card/95 backdrop-blur flex items-center gap-4 px-6 justify-between">
                        <div className="flex items-center gap-4">
                          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                          <HeaderDateRange variant="dropdown" />
                          <div className="hidden md:block">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Suchen Sie nach Produkten..."
                                className="w-[280px] pl-10 pr-4 h-8 bg-background/50 border border-border rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="h-10 w-10 grid place-items-center rounded-lg bg-background/50 hover:bg-muted border border-border">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button className="relative h-10 w-10 grid place-items-center rounded-lg bg-background/50 hover:bg-muted border border-border">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            <div className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full"></div>
                          </button>
                          <Avatar className="h-10 w-10 border-2 border-border">
                            <AvatarFallback className="bg-primary text-primary-foreground">GA</AvatarFallback>
                          </Avatar>
                        </div>
                      </header>
                    </div>
                  </div>
                </SidebarProvider>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-green-600">Vorteile:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Sauberer, aufgeräumter Header</li>
                  <li>Erweiterte Optionen im Dropdown</li>
                  <li>Bessere mobile Kompatibilität</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrated" className="space-y-4">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-xl font-semibold mb-4">Vorschlag 3: Integriert</h3>
              <p className="text-muted-foreground mb-6">Eingebetteter Bereich mit subtilen Gradients und visueller Hervorhebung</p>
              
              <div className="border border-border rounded-lg overflow-hidden">
                <SidebarProvider>
                  <div className="flex w-full bg-background">
                    <div className="w-64 bg-muted/20 h-20 flex items-center justify-center text-muted-foreground text-sm">
                      Sidebar
                    </div>
                    <div className="flex-1">
                      <header className="border-b border-border bg-card/95 backdrop-blur">
                        <div className="flex items-center gap-4 px-6 h-16 justify-between">
                          <div className="flex items-center gap-4">
                            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                            <div className="hidden md:block">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Suchen Sie nach Produkten..."
                                  className="w-[280px] pl-10 pr-4 h-10 bg-background/50 border border-border rounded-lg"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="h-10 w-10 grid place-items-center rounded-lg bg-background/50 hover:bg-muted border border-border">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button className="relative h-10 w-10 grid place-items-center rounded-lg bg-background/50 hover:bg-muted border border-border">
                              <Bell className="h-4 w-4 text-muted-foreground" />
                              <div className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full"></div>
                            </button>
                            <Avatar className="h-10 w-10 border-2 border-border">
                              <AvatarFallback className="bg-primary text-primary-foreground">GA</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                        <div className="px-6 pb-3">
                          <HeaderDateRange variant="integrated" />
                        </div>
                      </header>
                    </div>
                  </div>
                </SidebarProvider>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-green-600">Vorteile:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Visuell ansprechende Integration mit Gradients</li>
                  <li>Klare Abgrenzung vom Rest des Headers</li>
                  <li>Premium-Look mit subtilen Design-Details</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}