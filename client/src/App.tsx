import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Dev testing pages
import AllProducts from "./pages/performance/AllProducts";

// Main app pages
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Performance from "./pages/Performance";
import GoogleAdsAccount from "./pages/GoogleAdsAccount";
import Classification from "./pages/Classification";
import Campaigns from "./pages/Campaigns";
import AssetGroups from "./pages/AssetGroups";
import Products from "./pages/Products";
import AppLayout from "@/components/AppLayout";
import AppLayoutProposals from "@/components/AppLayoutProposals";

// Performance sub-pages
import CashCows from "@/pages/performance/CashCows";
import PoorDogs from "@/pages/performance/PoorDogs";
import Hopeless from "@/pages/performance/Hopeless";
import Numb from "@/pages/performance/Numb";
import Silent from "@/pages/performance/Silent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/header-proposals" element={<AppLayoutProposals />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/performance/cash-cows" element={<CashCows />} />
            <Route path="/performance/poor-dogs" element={<PoorDogs />} />
            <Route path="/performance/hopeless" element={<Hopeless />} />
            <Route path="/performance/numb" element={<Numb />} />
            <Route path="/performance/silent" element={<Silent />} />
            <Route path="/performance/all-products" element={<AllProducts />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/asset-groups" element={<AssetGroups />} />
            <Route path="/products" element={<Products />} />
            <Route path="/google-ads-account" element={<GoogleAdsAccount />} />
            <Route path="/classification" element={<Classification />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
