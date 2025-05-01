
export interface Bus {
  id: string;
  regNumber: string;
  model: string;
  capacity: number;
  depotId: string;
  depotName: string;
  status: 'onroad' | 'maintenance' | 'outofservice';
  route?: string;
  lastUpdated: string;
}

export interface Depot {
  id: string;
  name: string;
  district: string;
  totalBuses: number;
  onRoadCount: number;
  maintenanceCount: number;
  outOfServiceCount: number;
}

export interface BusTransfer {
  id: string;
  busId: string;
  busRegNumber: string;
  fromDepotId: string;
  fromDepotName: string;
  toDepotId: string;
  toDepotName: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export interface AttendanceRecord {
  date: string;
  depotId: string;
  records: {
    busId: string;
    regNumber: string;
    isPresent: boolean;
    reason?: string;
  }[];
}

// Mock Buses
export const mockBuses: Bus[] = [
  { 
    id: '1', 
    regNumber: 'KL-15-A-1234', 
    model: 'Ashok Leyland', 
    capacity: 52, 
    depotId: 'depot-1', 
    depotName: 'Thiruvananthapuram Depot', 
    status: 'onroad',
    route: 'Trivandrum - Kollam', 
    lastUpdated: '2023-05-01T08:30:00Z' 
  },
  { 
    id: '2', 
    regNumber: 'KL-15-A-5678', 
    model: 'Tata Motors', 
    capacity: 48, 
    depotId: 'depot-1', 
    depotName: 'Thiruvananthapuram Depot', 
    status: 'maintenance',
    route: 'Trivandrum - Kanyakumari', 
    lastUpdated: '2023-05-01T07:15:00Z' 
  },
  { 
    id: '3', 
    regNumber: 'KL-15-B-9012', 
    model: 'Volvo', 
    capacity: 40, 
    depotId: 'depot-1', 
    depotName: 'Thiruvananthapuram Depot', 
    status: 'outofservice',
    route: 'Trivandrum - Kochi', 
    lastUpdated: '2023-05-01T06:45:00Z' 
  },
  { 
    id: '4', 
    regNumber: 'KL-07-C-3456', 
    model: 'Ashok Leyland', 
    capacity: 52, 
    depotId: 'depot-2', 
    depotName: 'Kollam Depot', 
    status: 'onroad',
    route: 'Kollam - Alappuzha', 
    lastUpdated: '2023-05-01T08:00:00Z' 
  },
  { 
    id: '5', 
    regNumber: 'KL-07-D-7890', 
    model: 'Tata Motors', 
    capacity: 48, 
    depotId: 'depot-2', 
    depotName: 'Kollam Depot', 
    status: 'onroad',
    route: 'Kollam - Pathanamthitta', 
    lastUpdated: '2023-05-01T07:30:00Z' 
  }
];

// Mock Depots
export const mockDepots: Depot[] = [
  {
    id: 'depot-1',
    name: 'Thiruvananthapuram Depot',
    district: 'Thiruvananthapuram',
    totalBuses: 42,
    onRoadCount: 32,
    maintenanceCount: 8,
    outOfServiceCount: 2
  },
  {
    id: 'depot-2',
    name: 'Kollam Depot',
    district: 'Kollam',
    totalBuses: 38,
    onRoadCount: 28,
    maintenanceCount: 7,
    outOfServiceCount: 3
  },
  {
    id: 'depot-3',
    name: 'Kottayam Depot',
    district: 'Kottayam',
    totalBuses: 35,
    onRoadCount: 30,
    maintenanceCount: 4,
    outOfServiceCount: 1
  },
  {
    id: 'depot-4',
    name: 'Ernakulam Depot',
    district: 'Ernakulam',
    totalBuses: 45,
    onRoadCount: 36,
    maintenanceCount: 6,
    outOfServiceCount: 3
  }
];

// Mock Transfers
export const mockTransfers: BusTransfer[] = [
  {
    id: 'transfer-1',
    busId: '1',
    busRegNumber: 'KL-15-A-1234',
    fromDepotId: 'depot-1',
    fromDepotName: 'Thiruvananthapuram Depot',
    toDepotId: 'depot-2',
    toDepotName: 'Kollam Depot',
    requestDate: '2023-05-01T10:30:00Z',
    status: 'pending',
    reason: 'Route optimization'
  },
  {
    id: 'transfer-2',
    busId: '4',
    busRegNumber: 'KL-07-C-3456',
    fromDepotId: 'depot-2',
    fromDepotName: 'Kollam Depot',
    toDepotId: 'depot-1',
    toDepotName: 'Thiruvananthapuram Depot',
    requestDate: '2023-04-28T11:15:00Z',
    status: 'approved',
    reason: 'Special service requirement'
  },
  {
    id: 'transfer-3',
    busId: '3',
    busRegNumber: 'KL-15-B-9012',
    fromDepotId: 'depot-1',
    fromDepotName: 'Thiruvananthapuram Depot',
    toDepotId: 'depot-3',
    toDepotName: 'Kottayam Depot',
    requestDate: '2023-04-25T09:45:00Z',
    status: 'rejected',
    reason: 'Maintenance requirement'
  }
];

// Mock Attendance
export const mockAttendance: AttendanceRecord[] = [
  {
    date: '2023-05-01',
    depotId: 'depot-1',
    records: [
      { busId: '1', regNumber: 'KL-15-A-1234', isPresent: true },
      { busId: '2', regNumber: 'KL-15-A-5678', isPresent: false, reason: 'Maintenance' },
      { busId: '3', regNumber: 'KL-15-B-9012', isPresent: false, reason: 'Major repair' }
    ]
  },
  {
    date: '2023-04-30',
    depotId: 'depot-1',
    records: [
      { busId: '1', regNumber: 'KL-15-A-1234', isPresent: true },
      { busId: '2', regNumber: 'KL-15-A-5678', isPresent: true },
      { busId: '3', regNumber: 'KL-15-B-9012', isPresent: false, reason: 'Major repair' }
    ]
  }
];
