import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, XCircle, BarChart3, Volume2 } from "lucide-react";
import DashboardCharts from "@/components/DashboardCharts";
import { TrendChart } from "@/components/TrendChart";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard – Google Ads Product Commander";

    const desc = "Dashboard mit Widgets & Navigation – erkenne Top-Produkte und Kampagnen auf einen Blick.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Content */}
      <div className="container mx-auto px-8 py-10 space-y-12">
        {/* Header Section */}
        <div className="space-y-3">
          <h1>Dashboard</h1>
          <p className="text-large text-muted-foreground">Overview of your product performance</p>
        </div>

        {/* Category Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <Card className="card-elevated min-h-[160px] cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]" onClick={() => navigate('/performance/cash-cows')}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-emerald-600">Cash Cows</CardTitle>
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="text-2xl font-bold text-foreground">250</div>
              <TrendChart color="#10B981" category="cashCows" />
            </CardContent>
          </Card>

          <Card className="card-elevated min-h-[160px] cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]" onClick={() => navigate('/performance/poor-dogs')}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-orange-600">Poor Dogs</CardTitle>
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="text-2xl font-bold text-foreground">300</div>
              <TrendChart color="#F59E0B" category="poorDogs" />
            </CardContent>
          </Card>

          <Card className="card-elevated min-h-[160px] cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]" onClick={() => navigate('/performance/hopeless')}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-red-600">Hopeless</CardTitle>
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <XCircle className="h-4 w-4 text-red-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="text-2xl font-bold text-foreground">150</div>
              <TrendChart color="#EF4444" category="hopeless" />
            </CardContent>
          </Card>

          <Card className="card-elevated min-h-[160px] cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]" onClick={() => navigate('/performance/numb')}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-slate-600">Numb</CardTitle>
                <div className="p-2 bg-slate-500/10 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-slate-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="text-2xl font-bold text-foreground">500</div>
              <TrendChart color="#6B7280" category="numb" />
            </CardContent>
          </Card>

          <Card className="card-elevated min-h-[160px] cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]" onClick={() => navigate('/performance/silent')}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-slate-600">Silent</CardTitle>
                <div className="p-2 bg-slate-500/10 rounded-lg">
                  <Volume2 className="h-4 w-4 text-slate-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="text-2xl font-bold text-foreground">5</div>
              <TrendChart color="#9CA3AF" category="silent" />
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2>Performance Trends</h2>
            <p className="text-body text-muted-foreground">Evolution of your key metrics</p>
          </div>
          <DashboardCharts />
        </div>


        {/* Footer */}
        <div className="pt-12 border-t border-border/50">
          <div className="flex items-center justify-center gap-3">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <p className="text-small text-muted-foreground">
              Prototyp - Alle Daten sind Beispielwerte
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;