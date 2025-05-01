
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus } from '@/data/mockData';
import { format, parseISO } from 'date-fns';

interface RecentBusesListProps {
  buses: Bus[];
}

const RecentBusesList: React.FC<RecentBusesListProps> = ({ buses }) => {
  const renderStatus = (status: string) => {
    switch (status) {
      case 'onroad':
        return <span className="status-onroad">On Road</span>;
      case 'maintenance':
        return <span className="status-maintenance">Maintenance</span>;
      case 'outofservice':
        return <span className="status-outofservice">Out of Service</span>;
      default:
        return <span>Unknown</span>;
    }
  };

  // Format the date to show relative time
  const formatUpdatedTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd MMM yyyy, HH:mm');
    } catch (e) {
      return 'Unknown date';
    }
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Recent Bus Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-muted-foreground">Reg. Number</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Model</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Route</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id} className="border-b">
                  <td className="py-3">{bus.regNumber}</td>
                  <td className="py-3">{bus.model}</td>
                  <td className="py-3">{bus.route || 'Not assigned'}</td>
                  <td className="py-3">{renderStatus(bus.status)}</td>
                  <td className="py-3 text-muted-foreground">
                    {formatUpdatedTime(bus.lastUpdated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBusesList;
