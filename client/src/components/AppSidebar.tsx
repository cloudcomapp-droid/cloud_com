import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Home,
  List,
  BarChart3,
  ShoppingCart,
  Settings,
  HelpCircle,
  Users,
  DollarSign,
  FileText,
  Calendar,
  TrendingUp,
  AlertTriangle,
  XCircle,
  Minus,
  Volume2,
  Star,
  ChevronRight,
  Gauge,
  Target
} from "lucide-react";
import { SavingsPotentialWidget } from "./SavingsPotentialWidget";
import { useNavigationState } from "@/hooks/useNavigationState";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type MenuItem = {
  title: string;
  url: string;
  icon: any;
  color?: string;
};

type MenuSection = {
  title: string;
  icon: any;
  color?: string;
  items: MenuItem[];
};

// Main items (always visible)
const mainItems: MenuItem[] = [
  { title: "Dashboard", url: "/", icon: Home },
];

// Collapsible sections
const performanceSection: MenuSection = {
  title: "Performance",
  icon: Gauge,
  color: "text-primary",
  items: [
    { title: "Overview", url: "/performance", icon: BarChart3, color: "text-primary" },
    { title: "Cash Cows", url: "/performance/cash-cows", icon: TrendingUp, color: "text-emerald-500" },
    { title: "Poor Dogs", url: "/performance/poor-dogs", icon: AlertTriangle, color: "text-orange-500" },
    { title: "Hopeless", url: "/performance/hopeless", icon: XCircle, color: "text-red-500" },
    { title: "Numb", url: "/performance/numb", icon: BarChart3, color: "text-slate-500" },
    { title: "Silent", url: "/performance/silent", icon: Volume2, color: "text-slate-500" },
    { title: "All Products", url: "/performance/all-products", icon: List, color: "text-primary" },
  ]
};

const analyticsSection: MenuSection = {
  title: "Analytics",
  icon: BarChart3,
  color: "text-blue-500",
  items: [
    { title: "Campaigns", url: "/campaigns", icon: Target, color: "text-blue-500" },
    { title: "Asset Groups", url: "/asset-groups", icon: FileText, color: "text-blue-500" },
    { title: "Groups", url: "/products", icon: ShoppingCart, color: "text-blue-500" },
  ]
};

const managementSection: MenuSection = {
  title: "Management",
  icon: Users,
  color: "text-purple-500",
  items: [
    { title: "Google Ads Account", url: "/google-ads-account", icon: Target, color: "text-purple-500" },
    { title: "Classification", url: "/classification", icon: ShoppingCart, color: "text-purple-500" },
  ]
};

// System items (always visible)
const systemItems: MenuItem[] = [
  { title: "Einstellungen", url: "/settings", icon: Settings },
  { title: "Hilfe", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useNavigationState();

  // State for collapsible sections
  const [performanceOpen, setPerformanceOpen] = useState(
    performanceSection.items.some(item => currentPath === item.url || currentPath.startsWith('/performance'))
  );
  const [analyticsOpen, setAnalyticsOpen] = useState(
    analyticsSection.items.some(item => currentPath === item.url)
  );
  const [managementOpen, setManagementOpen] = useState(
    managementSection.items.some(item => currentPath === item.url)
  );

  const isActive = (path: string) => currentPath === path;

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-sidebar-accent text-sidebar-primary font-medium py-3 px-1 rounded-lg text-body"
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground py-3 px-1 rounded-lg text-body";

  const getSubNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-sidebar-accent/80 text-sidebar-primary font-medium py-2 px-3 rounded-md text-small flex items-center gap-2 ml-2 border-l-2 border-sidebar-primary"
      : "hover:bg-sidebar-accent/30 text-sidebar-foreground/80 py-2 px-3 rounded-md text-small flex items-center gap-2 ml-2 border-l-2 border-transparent hover:border-sidebar-accent";

  const renderMenuItems = (items: MenuItem[], showFavorites = false) => (
    <SidebarMenu className="space-y-1">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <div className="group/item relative flex items-center">
            <SidebarMenuButton asChild className="flex-1">
              <NavLink to={item.url} end className={getNavCls}>
                <item.icon className={`h-5 w-5 flex-shrink-0 ${item.color || ''}`} />
                {!collapsed && <span className="font-medium">{item.title}</span>}
              </NavLink>
            </SidebarMenuButton>
            {showFavorites && !collapsed && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover/item:opacity-100 transition-opacity absolute right-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isFavorite(item.url)) {
                    removeFromFavorites(item.url);
                  } else {
                    addToFavorites(item.url);
                  }
                }}
              >
                <Star
                  className={`h-3 w-3 ${isFavorite(item.url) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                />
              </Button>
            )}
          </div>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  const renderCollapsibleSection = (section: MenuSection, isOpen: boolean, onToggle: (open: boolean) => void) => {
    const hasActiveItem = section.items.some(item => isActive(item.url));

    return (
      <SidebarGroup key={section.title} className="-ml-3">
        <Collapsible open={isOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={`w-full justify-between py-3 px-4 rounded-lg text-body transition-all duration-200 ${hasActiveItem
                ? 'bg-sidebar-accent/50 text-sidebar-primary border border-sidebar-accent'
                : 'hover:bg-sidebar-accent/30 text-sidebar-foreground'
                }`}
            >
              <div className="flex items-center gap-3">
                <section.icon className={`h-5 w-5 flex-shrink-0 ${section.color || ''}`} />
                {!collapsed && <span className="font-medium">{section.title}</span>}
              </div>
              {!collapsed && (
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-90' : ''
                    }`}
                />
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="transition-all duration-200 ease-out data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0">
            <SidebarMenuSub className="mt-2 space-y-1">
              {section.items.map((item) => (
                <SidebarMenuSubItem key={item.title}>
                  <SidebarMenuSubButton asChild>
                    <NavLink to={item.url} className={getSubNavCls}>
                      <item.icon className={`h-4 w-4 flex-shrink-0 ${item.color || ''}`} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      {/* Header with cloudWEB branding */}
      <div className="border-b border-sidebar-border flex justify-center items-center py-2.5 mt-1">
        <img
          src="/assets/logo_ads_commander.png"
          alt="cloudWEB Logo"
          className={`object-contain transition-all duration-300 ${collapsed ? "h-10 w-10" : "h-12 w-auto"}`}
        />
      </div>


      <SidebarContent className="px-4 py-6 space-y-0">
        {/* Fixed Sections */}
        <SidebarGroup>
          <SidebarMenu>
            {mainItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="w-full justify-between py-3 px-1 rounded-lg text-body hover:bg-sidebar-accent/30 text-sidebar-foreground transition-all duration-200"
                >
                  <NavLink to={item.url} end className={({ isActive }) =>
                    isActive
                      ? "bg-sidebar-accent/50 text-sidebar-primary border border-sidebar-accent font-medium"
                      : ""
                  }>
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 flex-shrink-0 ${item.color || ''}`} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </div>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Collapsible Sections */}
        {renderCollapsibleSection(performanceSection, performanceOpen, setPerformanceOpen)}
        {renderCollapsibleSection(analyticsSection, analyticsOpen, setAnalyticsOpen)}
        {renderCollapsibleSection(managementSection, managementOpen, setManagementOpen)}

        {/* Favorites */}
        {!collapsed && favorites.length > 0 && (
          <div className="relative">
            <Separator className="my-3" />
            <span className="absolute -top-2 left-2 bg-sidebar px-2 text-xs text-sidebar-foreground/50 font-medium">
              Favoriten
            </span>
          </div>
        )}
        {!collapsed && favorites.length > 0 && (
          <SidebarGroup>
            <SidebarGroupContent className="space-y-1">
              <SidebarMenu className="space-y-1">
                {favorites.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent text-sidebar-primary font-medium py-2 px-3 rounded-md text-small flex items-center gap-2"
                            : "hover:bg-sidebar-accent/30 text-sidebar-foreground/80 py-2 px-3 rounded-md text-small flex items-center gap-2"
                        }
                      >
                        <Star className="h-4 w-4 flex-shrink-0 fill-yellow-500 text-yellow-500" />
                        <span className="truncate">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Savings Potential Widget */}
        {!collapsed && (
          <div className="pt-4">
            <SavingsPotentialWidget />
          </div>
        )}

        {/* System Section */}
        <div className="mt-auto pt-8 border-t border-sidebar-border/50">
          <SidebarGroup>
            <SidebarGroupContent className="space-y-1">
              {renderMenuItems(systemItems)}
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
