import React, { useState } from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getLeaderboardData, mockUsers } from '@/lib/mock-data';

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState('all-time');
  const leaderboardData = getLeaderboardData();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Trophy className="w-5 h-5 text-amber-600" />;
      default: return <Star className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      return (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
          rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
          rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
          'bg-gradient-to-br from-amber-500 to-amber-700'
        }`}>
          {rank}
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
        {rank}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground">Top performing cattle rankings</p>
        </div>
        <div className="flex gap-2">
          <Button variant={timeframe === 'all-time' ? 'default' : 'outline'} onClick={() => setTimeframe('all-time')}>
            All Time
          </Button>
          <Button variant={timeframe === 'monthly' ? 'default' : 'outline'} onClick={() => setTimeframe('monthly')}>
            This Month
          </Button>
          <Button variant={timeframe === 'weekly' ? 'default' : 'outline'} onClick={() => setTimeframe('weekly')}>
            This Week
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overall" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="breed">By Breed</TabsTrigger>
          <TabsTrigger value="region">By Region</TabsTrigger>
          <TabsTrigger value="farmers">Top Farmers</TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="space-y-4">
          {/* Top 3 Podium */}
          <Card className="bg-gradient-subtle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Top Performers
              </CardTitle>
              <CardDescription>Highest ATC scores across all categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-end gap-4 mb-6">
                {leaderboardData.slice(0, 3).map((entry, index) => {
                  const actualRank = index + 1;
                  const height = actualRank === 1 ? 'h-32' : actualRank === 2 ? 'h-24' : 'h-20';
                  return (
                    <div key={entry.id} className="flex flex-col items-center">
                      <div className={`${height} w-24 bg-gradient-primary rounded-t-lg flex flex-col justify-end items-center p-2 text-white`}>
                        {getRankIcon(actualRank)}
                        <div className="text-lg font-bold">{entry.atcScore}</div>
                      </div>
                      <div className="mt-2 text-center">
                        <p className="font-semibold text-sm">{entry.name}</p>
                        <p className="text-xs text-muted-foreground">{entry.breed}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Full Rankings */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Rankings</CardTitle>
              <CardDescription>All cattle ranked by ATC score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboardData.map((entry) => (
                  <div key={entry.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                    entry.rank <= 3 ? 'bg-gradient-to-r from-primary/5 to-transparent' : 'bg-card'
                  }`}>
                    <div className="flex items-center gap-4">
                      {getRankBadge(entry.rank)}
                      <div>
                        <h3 className="font-semibold">{entry.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{entry.breed}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {entry.location}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Farmer: {entry.farmerName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{entry.atcScore}</div>
                      <Badge variant={entry.atcScore >= 8 ? 'default' : entry.atcScore >= 6 ? 'secondary' : 'outline'}>
                        {entry.atcScore >= 8 ? 'Excellent' : entry.atcScore >= 6 ? 'Good' : 'Average'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {['Holstein', 'Jersey', 'Gir', 'Sahiwal', 'Red Sindhi', 'Tharparkar'].map((breed) => {
              const breedLeaders = leaderboardData.filter(entry => entry.breed === breed).slice(0, 3);
              return (
                <Card key={breed}>
                  <CardHeader>
                    <CardTitle className="text-lg">{breed}</CardTitle>
                    <CardDescription>Top 3 in breed</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {breedLeaders.map((entry, index) => (
                      <div key={entry.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{entry.name}</p>
                            <p className="text-xs text-muted-foreground">{entry.farmerName}</p>
                          </div>
                        </div>
                        <span className="font-bold text-primary">{entry.atcScore}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="region" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {['Punjab', 'Gujarat', 'Maharashtra', 'Karnataka'].map((region) => {
              const regionLeaders = leaderboardData.filter(entry => entry.location === region).slice(0, 5);
              const avgScore = regionLeaders.length > 0 ? 
                (regionLeaders.reduce((sum, entry) => sum + entry.atcScore, 0) / regionLeaders.length).toFixed(1) : 
                'N/A';
              
              return (
                <Card key={region}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{region}</span>
                      <Badge variant="secondary">Avg: {avgScore}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {regionLeaders.map((entry, index) => (
                        <div key={entry.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-muted text-muted-foreground text-xs flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span>{entry.name}</span>
                          </div>
                          <span className="font-medium">{entry.atcScore}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="farmers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Farmers</CardTitle>
              <CardDescription>Farmers with highest average cattle scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsers.slice(0, 5).map((user, index) => {
                  const farmerCattle = leaderboardData.filter(entry => entry.farmerId === user.id);
                  const avgScore = farmerCattle.length > 0 ? 
                    (farmerCattle.reduce((sum, entry) => sum + entry.atcScore, 0) / farmerCattle.length).toFixed(1) : 
                    '0.0';
                  
                  return (
                    <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {farmerCattle.length} cattle evaluated
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">{avgScore}</div>
                        <p className="text-xs text-muted-foreground">Avg Score</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}