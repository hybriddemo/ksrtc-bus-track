
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/components/LoginPage';
import { mockBuses, mockDepots, mockTransfers } from '@/data/mockData';
import StatsRow from '@/components/dashboard/StatsRow';
import BusStatusChart from '@/components/dashboard/BusStatusChart';
import RecentTransfersTable from '@/components/dashboard/RecentTransfersTable';
import RecentBusesList from '@/components/dashboard/RecentBusesList';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  
  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Get relevant data based on user role and depot
  const getFilteredBuses = () => {
    if (user?.role === 'super-admin') {
      return mockBuses;
    } else {
      return mockBuses.filter(bus => bus.depotId === user?.depotId);
    }
  };

  const getFilteredTransfers = () => {
    if (user?.role === 'super-admin') {
      return mockTransfers;
    } else {
      return mockTransfers.filter(
        transfer => transfer.fromDepotId === user?.depotId || transfer.toDepotId === user?.depotId
      );
    }
  };

  const getStats = () => {
    if (user?.role === 'super-admin') {
      // Aggregate stats for all depots
      const totalBuses = mockDepots.reduce((sum, depot) => sum + depot.totalBuses, 0);
      const onRoadBuses = mockDepots.reduce((sum, depot) => sum + depot.onRoadCount, 0);
      const maintenanceBuses = mockDepots.reduce((sum, depot) => sum + depot.maintenanceCount, 0);
      const outOfServiceBuses = mockDepots.reduce((sum, depot) => sum + depot.outOfServiceCount, 0);
      const depotCount = mockDepots.length;

      return {
        totalBuses,
        onRoadBuses,
        maintenanceBuses,
        outOfServiceBuses,
        depotCount
      };
    } else {
      // Find stats for this specific depot
      const depotStats = mockDepots.find(depot => depot.id === user?.depotId) || mockDepots[0];
      
      return {
        totalBuses: depotStats.totalBuses,
        onRoadBuses: depotStats.onRoadCount,
        maintenanceBuses: depotStats.maintenanceCount,
        outOfServiceBuses: depotStats.outOfServiceCount
      };
    }
  };

  const stats = getStats();
  const filteredBuses = getFilteredBuses();
  const filteredTransfers = getFilteredTransfers();

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          {user?.role === 'super-admin' ? 'KSRTC Operations Dashboard' : `${user?.depotName} Dashboard`}
        </h1>
        
        <StatsRow 
          totalBuses={stats.totalBuses}
          onRoadBuses={stats.onRoadBuses}
          maintenanceBuses={stats.maintenanceBuses}
          outOfServiceBuses={stats.outOfServiceBuses}
          showDepotCount={user?.role === 'super-admin'}
          depotCount={stats.depotCount}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BusStatusChart 
            onRoad={stats.onRoadBuses}
            maintenance={stats.maintenanceBuses}
            outOfService={stats.outOfServiceBuses}
          />
          <RecentBusesList buses={filteredBuses.slice(0, 5)} />
        </div>
        
        <RecentTransfersTable transfers={filteredTransfers} />
      </div>
    </Layout>
  );
};

export default Index;
