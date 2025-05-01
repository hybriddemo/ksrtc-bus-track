
import React from 'react';
import Layout from '@/components/Layout';

const BusesPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Buses Management</h1>
        <p className="text-muted-foreground">
          View and manage all buses in your assigned depot.
        </p>
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <p className="text-center text-muted-foreground">
            This page is under construction. Bus management features coming soon.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default BusesPage;
