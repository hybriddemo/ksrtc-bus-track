
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { format } from 'date-fns';

interface TransferRequest {
  id: number;
  busRegNumber: string;
  fromDepotName: string;
  toDepotName: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

const TransfersPage: React.FC = () => {
  // Sample data - in a real app, this would come from an API
  const transfersMockData: TransferRequest[] = [
    { id: 1, busRegNumber: 'KL-01-AA-1234', fromDepotName: 'Thiruvananthapuram', toDepotName: 'Ernakulam', requestDate: '2025-04-28', status: 'pending', reason: 'Route optimization' },
    { id: 2, busRegNumber: 'KL-07-BB-5678', fromDepotName: 'Ernakulam', toDepotName: 'Kozhikode', requestDate: '2025-04-25', status: 'approved', reason: 'Special event' },
    { id: 3, busRegNumber: 'KL-10-CC-9101', fromDepotName: 'Kozhikode', toDepotName: 'Thiruvananthapuram', requestDate: '2025-04-27', status: 'rejected', reason: 'Maintenance requirements' },
    { id: 4, busRegNumber: 'KL-05-DD-1122', fromDepotName: 'Kollam', toDepotName: 'Palakkad', requestDate: '2025-04-29', status: 'pending', reason: 'Driver reallocation' },
    { id: 5, busRegNumber: 'KL-15-EE-3344', fromDepotName: 'Palakkad', toDepotName: 'Kollam', requestDate: '2025-04-26', status: 'approved', reason: 'Seasonal demand' },
  ];

  const renderStatusBadge = (status: string) => {
    switch(status) {
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

  const pendingRequests = transfersMockData.filter(transfer => transfer.status === 'pending');
  const approvedRequests = transfersMockData.filter(transfer => transfer.status === 'approved');
  const rejectedRequests = transfersMockData.filter(transfer => transfer.status === 'rejected');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Bus Transfers</h1>
            <p className="text-muted-foreground">
              Manage bus transfers between depots.
            </p>
          </div>
          <Button>+ New Transfer Request</Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Transfers</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="border rounded-lg p-6 bg-white shadow-sm overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus Reg. No.</TableHead>
                    <TableHead>From Depot</TableHead>
                    <TableHead>To Depot</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transfersMockData.map((transfer) => (
                    <TableRow key={transfer.id}>
                      <TableCell className="font-medium">{transfer.busRegNumber}</TableCell>
                      <TableCell>{transfer.fromDepotName}</TableCell>
                      <TableCell>{transfer.toDepotName}</TableCell>
                      <TableCell>{transfer.requestDate}</TableCell>
                      <TableCell>{transfer.reason}</TableCell>
                      <TableCell>{renderStatusBadge(transfer.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {transfer.status === 'pending' && (
                            <>
                              <Button variant="outline" size="sm" className="bg-green-50 hover:bg-green-100">Approve</Button>
                              <Button variant="outline" size="sm" className="bg-red-50 hover:bg-red-100">Reject</Button>
                            </>
                          )}
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            <div className="border rounded-lg p-6 bg-white shadow-sm overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus Reg. No.</TableHead>
                    <TableHead>From Depot</TableHead>
                    <TableHead>To Depot</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((transfer) => (
                    <TableRow key={transfer.id}>
                      <TableCell className="font-medium">{transfer.busRegNumber}</TableCell>
                      <TableCell>{transfer.fromDepotName}</TableCell>
                      <TableCell>{transfer.toDepotName}</TableCell>
                      <TableCell>{transfer.requestDate}</TableCell>
                      <TableCell>{transfer.reason}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="bg-green-50 hover:bg-green-100">Approve</Button>
                          <Button variant="outline" size="sm" className="bg-red-50 hover:bg-red-100">Reject</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendingRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No pending transfer requests
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="approved">
            <div className="border rounded-lg p-6 bg-white shadow-sm overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus Reg. No.</TableHead>
                    <TableHead>From Depot</TableHead>
                    <TableHead>To Depot</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedRequests.map((transfer) => (
                    <TableRow key={transfer.id}>
                      <TableCell className="font-medium">{transfer.busRegNumber}</TableCell>
                      <TableCell>{transfer.fromDepotName}</TableCell>
                      <TableCell>{transfer.toDepotName}</TableCell>
                      <TableCell>{transfer.requestDate}</TableCell>
                      <TableCell>{transfer.reason}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {approvedRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No approved transfer requests
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="rejected">
            <div className="border rounded-lg p-6 bg-white shadow-sm overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus Reg. No.</TableHead>
                    <TableHead>From Depot</TableHead>
                    <TableHead>To Depot</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rejectedRequests.map((transfer) => (
                    <TableRow key={transfer.id}>
                      <TableCell className="font-medium">{transfer.busRegNumber}</TableCell>
                      <TableCell>{transfer.fromDepotName}</TableCell>
                      <TableCell>{transfer.toDepotName}</TableCell>
                      <TableCell>{transfer.requestDate}</TableCell>
                      <TableCell>{transfer.reason}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {rejectedRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No rejected transfer requests
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TransfersPage;
