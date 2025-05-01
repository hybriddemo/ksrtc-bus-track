
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { format, subDays } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface AttendanceRecord {
  id: number;
  busRegNumber: string;
  busModel: string;
  attendanceStatus: 'present' | 'absent';
  reason?: string;
  driverId?: string;
  conductorId?: string;
}

const AttendancePage: React.FC = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  
  // Sample data - in a real app, this would come from an API
  const attendanceMockData: AttendanceRecord[] = [
    { id: 1, busRegNumber: 'KL-01-AA-1234', busModel: 'Ashok Leyland', attendanceStatus: 'present', driverId: 'D001', conductorId: 'C001' },
    { id: 2, busRegNumber: 'KL-07-BB-5678', busModel: 'Tata', attendanceStatus: 'absent', reason: 'Maintenance', driverId: 'D002', conductorId: 'C002' },
    { id: 3, busRegNumber: 'KL-10-CC-9101', busModel: 'Volvo', attendanceStatus: 'absent', reason: 'No Driver Available' },
    { id: 4, busRegNumber: 'KL-05-DD-1122', busModel: 'Ashok Leyland', attendanceStatus: 'present', driverId: 'D004', conductorId: 'C004' },
    { id: 5, busRegNumber: 'KL-15-EE-3344', busModel: 'Tata', attendanceStatus: 'present', driverId: 'D005', conductorId: 'C005' },
  ];

  const renderAttendanceStatus = (status: string) => {
    if (status === 'present') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Present</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Absent</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Daily Attendance</h1>
            <p className="text-muted-foreground">
              Track daily bus attendance and operation status.
            </p>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Calendar className="h-4 w-4" />
                {format(selectedDate, 'dd MMM yyyy')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                disabled={(date) => date > today}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="border rounded-lg p-6 bg-white shadow-sm overflow-x-auto">
          <div className="flex justify-end mb-4">
            <Button>Mark All Present</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reg. Number</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Driver ID</TableHead>
                <TableHead>Conductor ID</TableHead>
                <TableHead>Reason (if absent)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceMockData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.busRegNumber}</TableCell>
                  <TableCell>{record.busModel}</TableCell>
                  <TableCell>{renderAttendanceStatus(record.attendanceStatus)}</TableCell>
                  <TableCell>{record.driverId || '-'}</TableCell>
                  <TableCell>{record.conductorId || '-'}</TableCell>
                  <TableCell>{record.reason || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Export Data</Button>
          <Button>Save Attendance</Button>
        </div>
      </div>
    </Layout>
  );
};

export default AttendancePage;
