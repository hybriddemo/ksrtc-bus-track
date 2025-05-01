
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Bus } from '@/data/mockData';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const BusesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data - in a real app, this would come from an API
  const busesMockData: Bus[] = [
    { id: 1, regNumber: 'KL-01-AA-1234', model: 'Ashok Leyland', depot: 'Thiruvananthapuram', status: 'onroad', capacity: 52, route: 'Thiruvananthapuram-Kochi', lastUpdated: '2025-05-01T08:30:00' },
    { id: 2, regNumber: 'KL-07-BB-5678', model: 'Tata', depot: 'Ernakulam', status: 'maintenance', capacity: 48, route: 'Kochi-Thrissur', lastUpdated: '2025-04-30T14:20:00' },
    { id: 3, regNumber: 'KL-10-CC-9101', model: 'Volvo', depot: 'Kozhikode', status: 'outofservice', capacity: 40, route: 'Kozhikode-Kannur', lastUpdated: '2025-04-29T11:15:00' },
    { id: 4, regNumber: 'KL-05-DD-1122', model: 'Ashok Leyland', depot: 'Kollam', status: 'onroad', capacity: 52, route: 'Kollam-Alappuzha', lastUpdated: '2025-05-01T09:45:00' },
    { id: 5, regNumber: 'KL-15-EE-3344', model: 'Tata', depot: 'Palakkad', status: 'onroad', capacity: 48, route: 'Palakkad-Malappuram', lastUpdated: '2025-05-01T07:30:00' },
  ];

  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'onroad':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">On Road</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Maintenance</Badge>;
      case 'outofservice':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Out of Service</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const filteredBuses = busesMockData.filter(bus => 
    bus.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.depot.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Buses Management</h1>
            <p className="text-muted-foreground">
              View and manage all buses in your assigned depot.
            </p>
          </div>
          <Button>+ Add Bus</Button>
        </div>

        <div className="flex items-center border rounded-md px-3 py-2 mb-4 bg-white">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <Input 
            type="text" 
            placeholder="Search by registration number, model, depot, or route" 
            className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="border rounded-lg p-6 bg-white shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reg. Number</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Depot</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell className="font-medium">{bus.regNumber}</TableCell>
                  <TableCell>{bus.model}</TableCell>
                  <TableCell>{bus.depot}</TableCell>
                  <TableCell>{bus.route}</TableCell>
                  <TableCell>{bus.capacity}</TableCell>
                  <TableCell>{renderStatusBadge(bus.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBuses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    No buses found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default BusesPage;
