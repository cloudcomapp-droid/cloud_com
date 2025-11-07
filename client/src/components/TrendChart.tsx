import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";

interface TrendChartProps {
  data?: { name: string; value: number }[];
  color: string;
  category?: 'cashCows' | 'poorDogs' | 'hopeless' | 'numb' | 'silent';
}

const cashCowsData = [
  { name: "Jan", value: 180 },
  { name: "Feb", value: 195 },
  { name: "Mrz", value: 210 },
  { name: "Apr", value: 225 },
  { name: "Mai", value: 240 },
  { name: "Jun", value: 248 },
  { name: "Jul", value: 250 },
];

const poorDogsData = [
  { name: "Jan", value: 280 },
  { name: "Feb", value: 285 },
  { name: "Mrz", value: 295 },
  { name: "Apr", value: 300 },
  { name: "Mai", value: 305 },
  { name: "Jun", value: 302 },
  { name: "Jul", value: 300 },
];

const hopelessData = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 185 },
  { name: "Mrz", value: 170 },
  { name: "Apr", value: 160 },
  { name: "Mai", value: 155 },
  { name: "Jun", value: 152 },
  { name: "Jul", value: 150 },
];

const numbData = [
  { name: "Jan", value: 450 },
  { name: "Feb", value: 470 },
  { name: "Mrz", value: 485 },
  { name: "Apr", value: 490 },
  { name: "Mai", value: 495 },
  { name: "Jun", value: 498 },
  { name: "Jul", value: 500 },
];

const silentData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 10 },
  { name: "Mrz", value: 8 },
  { name: "Apr", value: 6 },
  { name: "Mai", value: 5 },
  { name: "Jun", value: 5 },
  { name: "Jul", value: 5 },
];

const trendDataSets = {
  cashCows: cashCowsData,
  poorDogs: poorDogsData,
  hopeless: hopelessData,
  numb: numbData,
  silent: silentData,
};

export function TrendChart({ data, color, category = 'cashCows' }: TrendChartProps) {
  const chartData = data && data.length > 0 ? data : trendDataSets[category];
  
  return (
    <div className="h-16 w-full bg-transparent">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 2, r: 3 }}
            activeDot={{ r: 4, stroke: color, strokeWidth: 2, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}