import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Save,
  TrendingUp,
  AlertTriangle,
  XCircle,
  BarChart3,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";

interface ClassificationRules {
  cashCowRoas: number;
  cashCowConv: number;
  poorDogRoas: number;
  hopelessCost: number;
}

export default function Classification() {
  const [rules, setRules] = useState<ClassificationRules>({
    cashCowRoas: 3,
    cashCowConv: 1,
    poorDogRoas: 1,
    hopelessCost: 30,
  });

  useEffect(() => {
    document.title = "Classification rules – Google Ads Product Commander";

    const desc =
      "Configure the rules for automatic product classification based on performance criteria.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/classification");

    // Load saved rules from localStorage
    const saved = localStorage.getItem("classificationRules");
    if (saved) {
      setRules(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("classificationRules", JSON.stringify(rules));
    toast.success("Classification rules saved");
  };

  const handleRuleChange = (
    field: keyof ClassificationRules,
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    setRules((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Classification rules
              </h1>
              <p className="text-muted-foreground">
                Define the rules for automatic product classification
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Classification Rules */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl space-y-6">
          {/* Editable Rules Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-purple-500" />
                Automatic Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cash Cows */}
              <div className="grid grid-cols-12 gap-4 items-center p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                <div className="col-span-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium text-emerald-600">
                    Cash Cows
                  </span>
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">ROAS ≥</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={rules.cashCowRoas}
                    onChange={(e) =>
                      handleRuleChange("cashCowRoas", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">Conv ≥</Label>
                  <Input
                    type="number"
                    value={rules.cashCowConv}
                    onChange={(e) =>
                      handleRuleChange("cashCowConv", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>
                <div className="col-span-5 text-xs text-muted-foreground">
                  ROAS ≥ {rules.cashCowRoas} AND Conv ≥ {rules.cashCowConv}
                </div>
              </div>

              {/* Poor Dogs */}
              <div className="grid grid-cols-12 gap-4 items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div className="col-span-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-600">Poor Dogs</span>
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">ROAS ≥</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={rules.poorDogRoas}
                    onChange={(e) =>
                      handleRuleChange("poorDogRoas", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs text-muted-foreground">
                    ROAS &lt;
                  </Label>
                  <Input
                    value={rules.cashCowRoas}
                    disabled
                    className="h-8 text-sm bg-muted/50"
                  />
                </div>
                <div className="col-span-5 text-xs text-muted-foreground">
                  {rules.poorDogRoas} ≤ ROAS &lt; {rules.cashCowRoas} +
                  Complementary to Cash Cows
                </div>
              </div>

              {/* Hopeless */}
              <div className="grid grid-cols-12 gap-4 items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="col-span-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-600">Hopeless</span>
                </div>
                <div className="col-span-2">
                  <Label className="text-xs text-muted-foreground">
                    ROAS &lt;
                  </Label>
                  <Input
                    value={rules.poorDogRoas}
                    disabled
                    className="h-8 text-sm bg-muted/50"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">Cost ≥ $</Label>
                  <Input
                    type="number"
                    value={rules.hopelessCost}
                    onChange={(e) =>
                      handleRuleChange("hopelessCost", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>
                <div className="col-span-5 text-xs text-muted-foreground">
                  ROAS &lt; {rules.poorDogRoas} AND Cost ≥ ${rules.hopelessCost}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Automatic Rules Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-muted-foreground">
                Automatische Regeln
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Numb */}
              <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950/20 rounded">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-slate-600" />
                  <span className="font-medium text-slate-600">Numb</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  ROAS &lt; {rules.poorDogRoas} + Complementary to Hopeless
                </div>
              </div>

              {/* Silent */}
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-950/20 rounded">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-600">Silent</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  ROAS = 0 AND Cost = $0 (no activity)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Rules
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
