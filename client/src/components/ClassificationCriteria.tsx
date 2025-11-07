import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

const criteriaData = [
  {
    category: "Cash Cow",
    color: "cash-cow",
    description: "Top Seller - hohe Performance",
    criteria: "ROAS ≥ 3.0, Conversions ≥ 2",
    roas: "3.0",
    conversions: "2"
  },
  {
    category: "Poor Dog", 
    color: "poor-dog",
    description: "Teuer - niedrige Performance",
    criteria: "ROAS ≥ 1.0 und < 3.0, Conversions < 2",
    roas: "1.0",
    conversions: "2"
  },
  {
    category: "Hopeless",
    color: "hopeless", 
    description: "Hoffnungslos - sehr schlecht",
    criteria: "ROAS < 1.0, Kosten ≥ 30, Conversions < 2",
    roas: "1.0",
    costs: "30",
    conversions: "2"
  },
  {
    category: "Numb",
    color: "numb",
    description: "Stumm - niedrige Kosten/Performance",
    criteria: "ROAS < 1.0, Kosten < 30",
    roas: "1.0", 
    costs: "30"
  },
  {
    category: "Silent",
    color: "silent",
    description: "Still - keine Aktivität",
    criteria: "ROAS < 0, Kosten = 0",
    roas: "0",
    costs: "0"
  }
];

export default function ClassificationCriteria() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-1">So erkennst du deine Cash Cows auf einen Blick</h3>
        <p className="text-sm text-muted-foreground">Setze deine Gewinn- und Verlustgrenzen – unser Tool erledigt den Rest.</p>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {criteriaData.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: `hsl(var(--${item.color}))` }}
                />
                <span className="text-sm font-medium">{item.category}</span>
              </div>
              <div className="space-y-1">
                <div>
                  <Label htmlFor={`${item.category}-roas`} className="text-xs">ROAS</Label>
                  <Input
                    id={`${item.category}-roas`}
                    defaultValue={item.roas}
                    className="h-7 text-xs"
                  />
                </div>
                {item.conversions && (
                  <div>
                    <Label htmlFor={`${item.category}-conv`} className="text-xs">Conv.</Label>
                    <Input
                      id={`${item.category}-conv`}
                      defaultValue={item.conversions}
                      className="h-7 text-xs"
                    />
                  </div>
                )}
                {item.costs && (
                  <div>
                    <Label htmlFor={`${item.category}-costs`} className="text-xs">Kosten</Label>
                    <Input
                      id={`${item.category}-costs`}
                      defaultValue={item.costs}
                      className="h-7 text-xs"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}