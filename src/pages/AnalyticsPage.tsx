
import React from 'react';
import Layout from '@/components/Layout';

const AnalyticsPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          View operational analytics and reports across depots.
        </p>
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <p className="text-center text-muted-foreground">
            This page is under construction. Analytics features coming soon.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
