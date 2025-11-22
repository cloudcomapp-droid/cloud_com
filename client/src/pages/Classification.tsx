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
  Pencil,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { OutletCtx } from "@/interfaces/interfaces";
import { useOutletContext } from "react-router-dom";

interface ClassificationRules {
  cashCowRoas: number;
  cashCowConv: number;
  poorDogRoas: number;
  hopelessCost: number;
}

export default function Classification() {
  const { classificationRules, setClassificationRules } =
    useOutletContext<OutletCtx>();

  // Local state for editing
  const [localRules, setLocalRules] = useState<ClassificationRules>(
    classificationRules
  );

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.title =
      "Classification rules – Google Ads Product Commander";

    const saved = localStorage.getItem("classificationRules");
    if (saved) {
      const parsed = JSON.parse(saved);
      setClassificationRules(parsed);
      setLocalRules(parsed);
    }
  }, []);

  const handleRuleChange = (key: keyof ClassificationRules, value: any) => {
    if (!isEditing) return;
    setLocalRules((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  const startEditing = () => {
    setLocalRules(classificationRules); // reset to original
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setLocalRules(classificationRules); // rollback
    setIsEditing(false);
  };

  const handleSave = () => {
    setClassificationRules(localRules);
    toast.success("Rules saved successfully!");
    setIsEditing(false);
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
              <h1 className="text-2xl font-bold">Classification rules</h1>
              <p className="text-muted-foreground">
                Define the rules for automatic product classification
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl space-y-6">

          {/* Editable Rules Card */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-purple-500" />
                Automatic Rules
              </CardTitle>

              {!isEditing ? (
                <Button variant="outline" className="gap-2" onClick={startEditing}>
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button className="gap-1" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="destructive"
                    className="gap-1"
                    onClick={cancelEditing}
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Cash Cows */}
              <div className="grid grid-cols-12 gap-4 items-center p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                <div className="col-span-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium text-emerald-600">Cash Cows</span>
                </div>

                <div className="col-span-2">
                  <Label className="text-xs">ROAS ≥</Label>
                  <Input
                    type="number"
                    disabled={!isEditing}
                    step="0.1"
                    value={localRules.cashCowRoas}
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
                    disabled={!isEditing}
                    value={localRules.cashCowConv}
                    onChange={(e) =>
                      handleRuleChange("cashCowConv", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>

                <div className="col-span-5 text-xs text-muted-foreground">
                  ROAS ≥ {localRules.cashCowRoas} AND Conv ≥{" "}
                  {localRules.cashCowConv}
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
                    disabled={!isEditing}
                    step="0.1"
                    value={localRules.poorDogRoas}
                    onChange={(e) =>
                      handleRuleChange("poorDogRoas", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>

                <div className="col-span-2">
                  <Label className="text-xs">ROAS &lt;</Label>
                  <Input
                    value={localRules.cashCowRoas}
                    disabled
                    className="h-8 text-sm bg-muted/50"
                  />
                </div>

                <div className="col-span-5 text-xs text-muted-foreground">
                  {localRules.poorDogRoas} ≤ ROAS &lt; {localRules.cashCowRoas}
                </div>
              </div>

              {/* Hopeless */}
              <div className="grid grid-cols-12 gap-4 items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="col-span-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-600">Hopeless</span>
                </div>

                <div className="col-span-2">
                  <Label className="text-xs">ROAS &lt;</Label>
                  <Input
                    value={localRules.poorDogRoas}
                    disabled
                    className="h-8 text-sm bg-muted/50"
                  />
                </div>

                <div className="col-span-2">
                  <Label className="text-xs">Cost ≥ $</Label>
                  <Input
                    type="number"
                    disabled={!isEditing}
                    value={localRules.hopelessCost}
                    onChange={(e) =>
                      handleRuleChange("hopelessCost", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>

                <div className="col-span-5 text-xs text-muted-foreground">
                  ROAS &lt; {localRules.poorDogRoas} AND Cost ≥ $
                  {localRules.hopelessCost}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Automatic Info Card (unchanged, read-only always) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-muted-foreground">
                Automatische Regeln
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950/20 rounded">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-slate-600" />
                  <span className="font-medium text-slate-600">Numb</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  ROAS &lt; {localRules.poorDogRoas}
                </div>
              </div>

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
        </div>
      </div>
    </div>
  );
}
