import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Target, ExternalLink, Save } from "lucide-react";
import { toast } from "sonner";

export default function GoogleAdsAccount() {
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    document.title = "Google Ads Konto – Google Ads Product Commander";

    const desc = "Verwalten Sie Ihre Google Ads Konto-Einstellungen und verbinden Sie Ihr Ads-Konto.";
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
    canonical.setAttribute("href", window.location.origin + "/google-ads-account");

    // Load saved account ID from localStorage
    const saved = localStorage.getItem("googleAdsAccountId");
    if (saved) {
      setAccountId(saved);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("googleAdsAccountId", accountId);
    toast.success("Google Ads Konto ID gespeichert");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Target className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Google Ads Konto</h1>
              <p className="text-muted-foreground">Verbinden Sie Ihr Google Ads Konto für die Performance-Analyse</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Configuration */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                Google Ads Konto Einstellungen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account ID Field */}
              <div className="space-y-2">
                <Label htmlFor="accountId" className="text-sm font-medium">
                  Google Ads Konto ID
                </Label>
                <Input
                  id="accountId"
                  type="text"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  placeholder="z.B. 123-456-7890"
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Geben Sie Ihre Google Ads Konto-ID ein, um die Performance-Daten zu synchronisieren.
                </p>
              </div>

              {/* Help Link */}
              <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  <a 
                    href="https://ads-konto.cloudweb.ch/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Hier finden Sie Ihre Ads Konto Nummer
                  </a>
                </span>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Konto ID speichern
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Verbindungsstatus</CardTitle>
            </CardHeader>
            <CardContent>
              {accountId ? (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Konto ID konfiguriert: {accountId}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-yellow-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Keine Konto ID hinterlegt</span>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Die Konto ID wird lokal in Ihrem Browser gespeichert.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}