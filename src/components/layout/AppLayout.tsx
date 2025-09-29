import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Button } from '@/components/ui/button';
import { LogOut, Bell, Search } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40 shadow-soft">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="lg:hidden" />
              
              <div className="relative max-w-md w-full hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search cattle records, reports..."
                  className="pl-10 bg-muted/30 border-muted focus:bg-background"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs p-0"
                >
                  3
                </Badge>
              </Button>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.role.replace('-', ' ')}
                  </p>
                </div>
                
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {user?.name.charAt(0)}
                  </span>
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline ml-2">Logout</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};