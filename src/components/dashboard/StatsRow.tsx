
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bus, Wrench, AlertTriangle, MapPin } from 'lucide-react';

interface StatsProps {
  totalBuses: number;
  onRoadBuses: number;
  maintenanceBuses: number;
  outOfServiceBuses: number;
  showDepotCount?: boolean;
  depotCount?: number;
}

const StatsRow: React.FC<StatsProps> = ({
  totalBuses,
  onRoadBuses,
  maintenanceBuses,
  outOfServiceBuses,
  showDepotCount = false,
  depotCount = 0
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="rounded-full p-3 bg-blue-100 mr-4">
            <Bus className="h-6 w-6 text-ksrtc-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Buses</p>
            <h3 className="text-2xl font-bold">{totalBuses}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="rounded-full p-3 bg-green-100 mr-4">
            <Bus className="h-6 w-6 text-ksrtc-status-onroad" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">On Road</p>
            <h3 className="text-2xl font-bold">{onRoadBuses}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="rounded-full p-3 bg-amber-100 mr-4">
            <Wrench className="h-6 w-6 text-ksrtc-status-maintenance" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">In Maintenance</p>
            <h3 className="text-2xl font-bold">{maintenanceBuses}</h3>
          </div>
        </CardContent>
      </Card>
      
      {showDepotCount ? (
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="rounded-full p-3 bg-indigo-100 mr-4">
              <MapPin className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Depots</p>
              <h3 className="text-2xl font-bold">{depotCount}</h3>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="rounded-full p-3 bg-red-100 mr-4">
              <AlertTriangle className="h-6 w-6 text-ksrtc-status-outofservice" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Out of Service</p>
              <h3 className="text-2xl font-bold">{outOfServiceBuses}</h3>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StatsRow;
