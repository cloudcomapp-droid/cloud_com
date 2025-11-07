import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface NavigationItem {
  path: string;
  title: string;
  icon?: string;
  timestamp: number;
}

const STORAGE_KEYS = {
  FAVORITES: 'google-ads-commander-favorites'
};

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/performance': 'Performance',
  '/performance/cash-cows': 'Cash Cows',
  '/performance/poor-dogs': 'Poor Dogs',
  '/performance/hopeless': 'Hopeless',
  '/performance/numb': 'Numb',
  '/performance/silent': 'Silent',
  '/settings': 'Einstellungen'
};

export function useNavigationState() {
  const location = useLocation();
  const [favorites, setFavorites] = useState<NavigationItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addToFavorites = (path: string) => {
    const title = ROUTE_TITLES[path] || 'Unbekannte Seite';
    const newFavorite: NavigationItem = {
      path,
      title,
      timestamp: Date.now()
    };

    setFavorites(prev => {
      if (prev.find(item => item.path === path)) return prev;
      const updated = [...prev, newFavorite];
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromFavorites = (path: string) => {
    setFavorites(prev => {
      const updated = prev.filter(item => item.path !== path);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (path: string) => {
    return favorites.some(item => item.path === path);
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ path: '/', title: 'Dashboard' }];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const title = ROUTE_TITLES[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ path: currentPath, title });
    });

    return breadcrumbs;
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    generateBreadcrumbs,
    currentPath: location.pathname,
    currentTitle: ROUTE_TITLES[location.pathname] || 'Unbekannte Seite'
  };
}