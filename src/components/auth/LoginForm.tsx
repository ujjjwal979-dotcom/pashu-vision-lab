import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2, Heart, User, Lock } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { mockUsers } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Welcome to PashuMitra AI! 🐄",
        description: "Successfully logged in to the cattle evaluation system.",
        variant: "default"
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Try demo accounts below.",
        variant: "destructive"
      });
    }
  };

  const handleDemoLogin = (demoUser: typeof mockUsers[0]) => {
    setEmail(demoUser.email);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-strong border-0">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex items-center justify-center"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
            </motion.div>
            
            <div>
              <CardTitle className="text-2xl font-bold">PashuMitra AI</CardTitle>
              <CardDescription className="text-base">
                AI-Powered Animal Type Classification System
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-card px-2 text-sm text-muted-foreground">
                  Try Demo Accounts
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {mockUsers.map((user) => (
                <Button
                  key={user.id}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleDemoLogin(user)}
                >
                  <span className="mr-2">{user.avatar}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {user.role.replace('-', ' ')}
                    </span>
                  </div>
                </Button>
              ))}
            </div>

            <div className="text-center text-xs text-muted-foreground">
              Demo Password: <code className="bg-muted px-1 py-0.5 rounded">demo123</code>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};