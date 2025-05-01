
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BusStatusChartProps {
  onRoad: number;
  maintenance: number;
  outOfService: number;
}

const BusStatusChart: React.FC<BusStatusChartProps> = ({
  onRoad,
  maintenance,
  outOfService
}) => {
  const data = [
    { name: 'On Road', value: onRoad, color: '#2ECC71' },
    { name: 'Maintenance', value: maintenance, color: '#F39C12' },
    { name: 'Out of Service', value: outOfService, color: '#E74C3C' }
  ];

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Bus Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} buses`, 'Count']} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusStatusChart;
