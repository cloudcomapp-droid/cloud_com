import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Save, 
  User, 
  Building,
  CheckCircle,
  Download,
  Play,
  RefreshCw,
  Filter
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadData = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setIsDataLoaded(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-foreground">Einstellungen</h1>
        <p className="text-muted-foreground">
          Verwalte deine Konto-Details und Google Ads-Integration.
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="account">Account Details</TabsTrigger>
          <TabsTrigger value="google">Google Konto</TabsTrigger>
        </TabsList>

        {/* Account Details Tab */}
        <TabsContent value="account" className="space-y-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* User Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Persönliche Informationen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">Vorname</Label>
                    <Input id="firstname" defaultValue="Max" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Nachname</Label>
                    <Input id="lastname" defaultValue="Mustermann" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail Adresse</Label>
                  <Input id="email" type="email" defaultValue="max@cloudweb.ch" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefonnummer</Label>
                  <Input id="phone" defaultValue="+41 44 123 45 67" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue="Marketing Manager" />
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Firmeninformationen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Firmenname</Label>
                  <Input id="company" defaultValue="cloudweb GmbH" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Straße & Hausnummer</Label>
                    <Input id="street" defaultValue="Musterstraße 123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">PLZ & Ort</Label>
                    <Input id="city" defaultValue="8001 Zürich" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Land</Label>
                  <Select defaultValue="ch">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ch">Schweiz</SelectItem>
                      <SelectItem value="de">Deutschland</SelectItem>
                      <SelectItem value="at">Österreich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vat">MwSt.-Nummer</Label>
                  <Input id="vat" defaultValue="CHE-123.456.789" />
                </div>
              </CardContent>
            </Card>

            <div className="pt-6">
              <Button size="lg" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Account Details speichern
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Google Account Tab */}
        <TabsContent value="google" className="space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Google Ads Connection */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    Google Ads Integration
                  </CardTitle>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verbunden
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ads-account">Google Ads-Konto-Nummer</Label>
                  <Input id="ads-account" defaultValue="123-456-7890" />
                  <p className="text-sm text-muted-foreground">
                    <a href="https://ads-konto.cloudweb.ch/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      → So finde ich meine Google Ads Konto Nummer
                    </a>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Währung</Label>
                    <Select defaultValue="chf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chf">CHF (Schweizer Franken)</SelectItem>
                        <SelectItem value="eur">EUR (Euro)</SelectItem>
                        <SelectItem value="usd">USD (US-Dollar)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Zeitzone</Label>
                    <Select defaultValue="zurich">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zurich">Europa/Zürich</SelectItem>
                        <SelectItem value="berlin">Europa/Berlin</SelectItem>
                        <SelectItem value="vienna">Europa/Wien</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-sync" className="text-sm font-medium">Auto-Synchronisation</Label>
                      <p className="text-xs text-muted-foreground">Daten automatisch aktualisieren (täglich)</p>
                    </div>
                    <Switch id="auto-sync" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-retention" className="text-sm font-medium">Daten-Aufbewahrung</Label>
                      <p className="text-xs text-muted-foreground">Historische Daten 90 Tage speichern</p>
                    </div>
                    <Switch id="data-retention" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Campaign Selection Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Kampagnenauswahl</h2>
                  <p className="text-muted-foreground">Wähle die Kampagnen für die Analyse aus.</p>
                </div>
                <Button 
                  onClick={handleLoadData} 
                  disabled={isLoading}
                  variant="default"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Laden...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Daten laden
                    </>
                  )}
                </Button>
              </div>

              {/* Campaign Selection (only after data is loaded) */}
              {isDataLoaded && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Kampagnen & Filter
                      </CardTitle>
                      <Badge variant="outline" className="bg-success/10 text-success border-success">
                        Daten geladen
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="campaigns" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="campaigns">Kampagnen</TabsTrigger>
                        <TabsTrigger value="asset-groups">Asset-Gruppen</TabsTrigger>
                        <TabsTrigger value="labels">Labels</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="campaigns" className="space-y-4">
                        <div>
                          <Label>Kampagne auswählen</Label>
                          <Select defaultValue="shopping-ch">
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Kampagne auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="shopping-ch">Shopping CH</SelectItem>
                              <SelectItem value="pmax-de">PMAX DE</SelectItem>
                              <SelectItem value="pmax-ch">PMAX CH</SelectItem>
                              <SelectItem value="alle">Alle Kampagnen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Wähle eine oder mehrere Kampagnen für die Analyse aus. Die Auswahl beeinflusst alle nachfolgenden Filteroptionen.
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="asset-groups" className="space-y-4">
                        <div>
                          <Label>Asset-Gruppe auswählen</Label>
                          <Select defaultValue="standard">
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Asset-Gruppe auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="sale-produkte">Sale-Produkte</SelectItem>
                              <SelectItem value="bestseller">Bestseller</SelectItem>
                              <SelectItem value="alle">Alle Gruppen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Asset-Gruppen helfen dabei, verwandte Werbemittel zu organisieren und gezielt zu analysieren.
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="labels" className="space-y-4">
                        <div>
                          <Label>Label auswählen</Label>
                          <Select defaultValue="sommer-2025">
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Label auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sommer-2025">Sommer 2025</SelectItem>
                              <SelectItem value="winter-sale">Winter Sale</SelectItem>
                              <SelectItem value="neue-produkte">Neue Produkte</SelectItem>
                              <SelectItem value="alle">Alle Labels</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Labels ermöglichen eine flexible Kategorisierung von Kampagnen basierend auf Saison, Produkttyp oder anderen Kriterien.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex justify-center pt-6 border-t mt-6">
                      <Button size="lg" className="w-full sm:w-auto">
                        <Play className="mr-2 h-4 w-4" />
                        Produkte klassifizieren
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="pt-6">
              <Button size="lg" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Google Konto Einstellungen speichern
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}