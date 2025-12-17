import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Activity } from "lucide-react";

const data = [
  { day: "Mon", steps: 8500, goal: 10000 },
  { day: "Tue", steps: 12000, goal: 10000 },
  { day: "Wed", steps: 9200, goal: 10000 },
  { day: "Thu", steps: 11500, goal: 10000 },
  { day: "Fri", steps: 7800, goal: 10000 },
  { day: "Sat", steps: 15000, goal: 10000 },
  { day: "Sun", steps: 6500, goal: 10000 },
];

const WeeklyActivityChart = () => {
  return (
    <div className="bg-card rounded-2xl p-6 card-shadow animate-slide-up" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-info/10 rounded-xl">
            <Activity className="w-6 h-6 text-info" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground text-lg">Weekly Activity</h3>
            <p className="text-sm text-muted-foreground">Steps per day</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Steps</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted" />
            <span className="text-muted-foreground">Goal</span>
          </div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              hide 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: 'var(--card-shadow)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`${value.toLocaleString()} steps`, '']}
            />
            <Bar 
              dataKey="steps" 
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.steps >= entry.goal ? 'hsl(var(--success))' : 'hsl(var(--primary))'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div>
          <p className="text-2xl font-display font-bold text-foreground">70,500</p>
          <p className="text-sm text-muted-foreground">Total steps this week</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-success">+12%</p>
          <p className="text-sm text-muted-foreground">vs last week</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivityChart;
