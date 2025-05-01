
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BusTransfer } from '@/data/mockData';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

interface RecentTransfersProps {
  transfers: BusTransfer[];
}

const RecentTransfersTable: React.FC<RecentTransfersProps> = ({ transfers }) => {
  const renderStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bus Transfers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-muted-foreground">Bus Reg. No.</th>
                <th className="text-left py-2 font-medium text-muted-foreground">From Depot</th>
                <th className="text-left py-2 font-medium text-muted-foreground">To Depot</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="border-b">
                  <td className="py-3">{transfer.busRegNumber}</td>
                  <td className="py-3">{transfer.fromDepotName}</td>
                  <td className="py-3">{transfer.toDepotName}</td>
                  <td className="py-3">
                    {format(new Date(transfer.requestDate), 'dd MMM yyyy')}
                  </td>
                  <td className="py-3">
                    {renderStatus(transfer.status)}
                  </td>
                </tr>
              ))}
              {transfers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-muted-foreground">
                    No recent transfers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransfersTable;
