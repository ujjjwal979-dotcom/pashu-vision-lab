import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Upload, 
  FileText, 
  Trophy, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  Heart,
  Home,
  Users,
  Map,
  Stethoscope,
  HeartHandshake,
  Shield
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/components/auth/AuthProvider';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
    description: 'Main overview and statistics',
  },
  {
    title: 'Upload & Analyze',
    url: '/upload',
    icon: Upload,
    description: 'Upload cattle images for analysis',
  },
  {
    title: 'Reports & History',
    url: '/reports',
    icon: FileText,
    description: 'View evaluation reports and history',
  },
  {
    title: 'Leaderboard',
    url: '/leaderboard',
    icon: Trophy,
    description: 'Top performing cattle rankings',
  },
  {
    title: 'Disease Detection',
    url: '/disease-detection',
    icon: Stethoscope,
    description: 'AI-powered health monitoring',
  },
  {
    title: 'Bull Matching',
    url: '/bull-matching',
    icon: HeartHandshake,
    description: 'Breeding recommendations',
  }
];

const secondaryItems = [
  {
    title: 'AI Chatbot',
    url: '/chatbot',
    icon: MessageSquare,
    description: 'Ask breeding and health questions',
  },
  {
    title: 'Geo Mapping',
    url: '/mapping',
    icon: Map,
    description: 'Regional cattle distribution',
  },
  {
    title: 'Community',
    url: '/community',
    icon: Users,
    description: 'Farmer community forum',
  },
  {
    title: 'Tutorials',
    url: '/tutorials',
    icon: BookOpen,
    description: 'Learn how to use the system',
  }
];

const adminItems = [
  {
    title: 'Admin Analytics',
    url: '/admin',
    icon: Shield,
    description: 'System administration',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    description: 'Application preferences',
  }
];

export function AppSidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getNavClassName = (path: string) => {
    const baseClasses = "group transition-all duration-200 hover:bg-sidebar-accent";
    if (isActive(path)) {
      return `${baseClasses} bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90`;
    }
    return baseClasses;
  };

  return (
    <Sidebar className="border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-sidebar-foreground truncate">
              PashuMitra AI
            </h1>
            <p className="text-xs text-sidebar-foreground/70">
              {user?.role.replace('-', ' ').toUpperCase()}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink
                      to={item.url}
                      className={getNavClassName(item.url)}
                      title={`${item.title} - ${item.description}`}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="font-medium">{item.title}</span>
                        <p className="text-xs text-sidebar-foreground/60 truncate">
                          {item.description}
                        </p>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools & Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink
                      to={item.url}
                      className={getNavClassName(item.url)}
                      title={`${item.title} - ${item.description}`}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="font-medium">{item.title}</span>
                        <p className="text-xs text-sidebar-foreground/60 truncate">
                          {item.description}
                        </p>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {(user?.role === 'admin' || user?.role === 'govt-officer') && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-12">
                      <NavLink
                        to={item.url}
                        className={getNavClassName(item.url)}
                        title={`${item.title} - ${item.description}`}
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <span className="font-medium">{item.title}</span>
                          <p className="text-xs text-sidebar-foreground/60 truncate">
                            {item.description}
                          </p>
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
            <span className="text-sm font-medium text-primary-foreground">
              {user?.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-sidebar-foreground/70 capitalize truncate">
              {user?.role.replace('-', ' ')}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}