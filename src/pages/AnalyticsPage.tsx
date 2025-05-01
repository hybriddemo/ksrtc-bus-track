
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import StatsRow from '@/components/dashboard/StatsRow';

const AnalyticsPage: React.FC = () => {
  // Status distribution data
  const busStatusData = [
    { name: 'On Road', value: 68, color: '#2ECC71' },
    { name: 'Maintenance', value: 23, color: '#F39C12' },
    { name: 'Out of Service', value: 9, color: '#E74C3C' }
  ];

  // Monthly attendance trend
  const monthlyAttendanceData = [
    { month: 'Jan', attendance: 92 },
    { month: 'Feb', attendance: 88 },
    { month: 'Mar', attendance: 91 },
    { month: 'Apr', attendance: 85 },
    { month: 'May', attendance: 80 },
    { month: 'Jun', attendance: 88 },
    { month: 'Jul', attendance: 90 },
    { month: 'Aug', attendance: 92 },
    { month: 'Sep', attendance: 89 },
    { month: 'Oct', attendance: 87 },
    { month: 'Nov', attendance: 85 },
    { month: 'Dec', attendance: 82 },
  ];

  // Depot-wise bus distribution
  const depotDistributionData = [
    { depot: 'Thiruvananthapuram', buses: 45 },
    { depot: 'Ernakulam', buses: 38 },
    { depot: 'Kozhikode', buses: 32 },
    { depot: 'Kollam', buses: 28 },
    { depot: 'Palakkad', buses: 25 },
    { depot: 'Thrissur', buses: 22 },
    { depot: 'Kannur', buses: 19 },
    { depot: 'Alappuzha', buses: 18 },
  ];

  // Transfer trends data
  const transferTrendsData = [
    { month: 'Jan', incoming: 8, outgoing: 6 },
    { month: 'Feb', incoming: 5, outgoing: 7 },
    { month: 'Mar', incoming: 9, outgoing: 4 },
    { month: 'Apr', incoming: 7, outgoing: 9 },
    { month: 'May', incoming: 10, outgoing: 5 },
    { month: 'Jun', incoming: 6, outgoing: 8 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              View operational analytics and reports across depots.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Export Report</Button>
            <Button variant="outline">Print Dashboard</Button>
          </div>
        </div>

        <StatsRow 
          totalBuses={200} 
          onRoadBuses={136} 
          maintenanceBuses={46} 
          outOfServiceBuses={18}
          showDepotCount={true}
          depotCount={15}
        />

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="depots">Depot Analytics</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bus Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={busStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {busStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} buses`, 'Count']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Attendance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyAttendanceData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="attendance"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="depots" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Depot-wise Bus Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={depotDistributionData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="depot" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="buses" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transfer Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={transferTrendsData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="incoming" fill="#8884d8" name="Incoming Transfers" />
                      <Bar dataKey="outgoing" fill="#82ca9d" name="Outgoing Transfers" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
