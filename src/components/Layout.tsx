
import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Bus, Calendar, BarChart3, Settings, LogOut, PanelRightOpen, Users, RefreshCw } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const userRoleDisplay = () => {
    switch(user?.role) {
      case 'depot-staff':
        return 'Depot Staff';
      case 'depot-admin':
        return 'Depot Admin';
      case 'super-admin':
        return 'Super Admin';
      default:
        return '';
    }
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar className="border-r bg-sidebar">
          <SidebarHeader className="p-4 flex flex-col items-center justify-center gap-2 border-b border-sidebar-border">
            <div className="text-xl font-bold text-white">KSRTC Bus Track</div>
            <div className="text-sm text-white/70">
              {user?.depotName ? `${user.depotName} - ` : ''}{userRoleDisplay()}
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/" className="flex items-center space-x-3">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/buses" className="flex items-center space-x-3">
                        <Bus size={20} />
                        <span>Buses</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/attendance" className="flex items-center space-x-3">
                        <Calendar size={20} />
                        <span>Attendance</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {(user?.role === 'depot-admin' || user?.role === 'super-admin') && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="/transfers" className="flex items-center space-x-3">
                          <RefreshCw size={20} />
                          <span>Transfers</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {user?.role === 'super-admin' && (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href="/analytics" className="flex items-center space-x-3">
                            <BarChart3 size={20} />
                            <span>Analytics</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href="/users" className="flex items-center space-x-3">
                            <Users size={20} />
                            <span>Users</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/settings" className="flex items-center space-x-3">
                        <Settings size={20} />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t border-sidebar-border">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center text-white bg-sidebar-accent hover:bg-sidebar-accent/80 border-none" 
              onClick={logout}
            >
              <LogOut size={16} className="mr-2" /> Log Out
            </Button>
          </SidebarFooter>
        </Sidebar>
      )}

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4 h-16 shadow-sm">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-gray-100"
          >
            <PanelRightOpen size={20} />
          </Button>
          <div className="flex items-center space-x-2">
            <span className="font-medium">{user?.name}</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
