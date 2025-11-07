import { DollarSign, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";

export function SavingsPotentialWidget() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const savingsAmount = 15000;
  const totalPotential = 20000;
  const percentage = (savingsAmount / totalPotential) * 100;

  if (collapsed) {
    return (
      <div className="px-1 mb-2">
        <div className="w-10 h-10 mx-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg flex flex-col items-center justify-center hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-300">
          <DollarSign className="h-3 w-3 text-amber-600 dark:text-amber-400 mb-0.5" />
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300 leading-none">15K</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 mb-4">
      <Card className="bg-gradient-to-br from-amber-500/15 to-orange-500/15 border-amber-500/25 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300 shadow-md hover:shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3 whitespace-nowrap">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-amber-700/80 dark:text-amber-300/80 uppercase tracking-wide mb-1">
                Potential Savings
              </div>
              <div className="text-lg font-bold text-amber-800 dark:text-amber-200">
                CHF {savingsAmount.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Progress
              value={percentage}
              className="h-2 bg-amber-200/50 dark:bg-amber-900/30"
            />
            <div className="flex justify-between text-xs text-amber-700/70 dark:text-amber-300/70">
              <span>Erreicht</span>
              <span>{Math.round(percentage)}% von CHF {totalPotential.toLocaleString('de-CH')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}