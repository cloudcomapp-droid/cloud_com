import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { 
  Home, 
  TrendingUp, 
  Settings, 
  Search, 
  Star,
  BarChart3,
  AlertCircle,
  Zap,
  Volume2,
  Meh
} from "lucide-react";
import { useNavigationState } from "@/hooks/useNavigationState";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QUICK_ACTIONS = [
  { id: 'dashboard', title: 'Dashboard', path: '/', icon: Home },
  { id: 'performance', title: 'Performance', path: '/performance', icon: TrendingUp },
  { id: 'cash-cows', title: 'Cash Cows', path: '/performance/cash-cows', icon: BarChart3 },
  { id: 'poor-dogs', title: 'Poor Dogs', path: '/performance/poor-dogs', icon: AlertCircle },
  { id: 'hopeless', title: 'Hopeless', path: '/performance/hopeless', icon: Meh },
  { id: 'numb', title: 'Numb', path: '/performance/numb', icon: Zap },
  { id: 'silent', title: 'Silent', path: '/performance/silent', icon: Volume2 },
  { id: 'settings', title: 'Einstellungen', path: '/settings', icon: Settings },
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { favorites } = useNavigationState();

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search for pages, actions..." />
      <CommandList>
        <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>
        
        {favorites.length > 0 && (
          <CommandGroup heading="Favoriten">
            {favorites.map((item) => {
              const action = QUICK_ACTIONS.find(a => a.path === item.path);
              const Icon = action?.icon || Star;
              return (
                <CommandItem
                  key={item.path}
                  value={item.title}
                  onSelect={() => handleSelect(item.path)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        <CommandGroup heading="Navigation">
          {QUICK_ACTIONS.map((action) => (
            <CommandItem
              key={action.id}
              value={action.title}
              onSelect={() => handleSelect(action.path)}
            >
              <action.icon className="mr-2 h-4 w-4" />
              <span>{action.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Aktionen">
          <CommandItem value="neue-kampagne">
            <Search className="mr-2 h-4 w-4" />
            <span>Neue Kampagne erstellen</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem value="export">
            <Search className="mr-2 h-4 w-4" />
            <span>Daten exportieren</span>
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}