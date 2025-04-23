
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  status?: "normal" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
  icon: ReactNode;
  unit?: string;
}

export default function HealthMetricCard({
  title,
  value,
  status = "normal",
  trend,
  icon,
  unit,
}: HealthMetricCardProps) {
  const statusColor = {
    normal: "text-health-green",
    warning: "text-health-orange",
    critical: "text-health-red",
  };
  
  const trendIcon = {
    up: <span className="text-health-red">↑</span>,
    down: <span className="text-health-green">↓</span>,
    stable: <span className="text-gray-500">→</span>,
  };

  return (
    <Card className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="bg-health-gray-light pt-4 pb-2">
        <CardTitle className="flex justify-between items-center text-base font-medium">
          <span className="text-gray-700">{title}</span>
          <div className="text-health-blue">{icon}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-baseline justify-between">
          <div className={`text-2xl font-bold ${statusColor[status]}`}>
            {value}
            {unit && <span className="text-sm ml-1 font-normal text-gray-500">{unit}</span>}
          </div>
          {trend && (
            <div className="flex items-center">
              {trendIcon[trend]}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
