
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface DataPoint {
  date: string;
  value: number;
}

interface HealthChartProps {
  title: string;
  data: DataPoint[];
  unit: string;
  color: string;
}

export default function HealthChart({ title, data, unit, color }: HealthChartProps) {
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium">{formatDate(label)}</p>
          <p className="text-sm">
            {`${payload[0].value} ${unit}`}
          </p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <Card className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="bg-health-gray-light pt-4 pb-2">
        <CardTitle className="text-base font-medium text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-48 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => formatDate(value)} 
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ r: 3, fill: color }}
                activeDot={{ r: 5, stroke: color, strokeWidth: 1 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
