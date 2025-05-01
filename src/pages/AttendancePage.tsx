
import React from 'react';
import Layout from '@/components/Layout';

const AttendancePage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Daily Attendance</h1>
        <p className="text-muted-foreground">
          Track daily bus attendance and operation status.
        </p>
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <p className="text-center text-muted-foreground">
            This page is under construction. Attendance tracking features coming soon.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AttendancePage;
