import React, { useState } from 'react';
import { Map, MapPin, Filter, Eye, BarChart3, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GeoMapping() {
  const [selectedState, setSelectedState] = useState('all');
  const [dataType, setDataType] = useState('cattle-count');

  const stateData = [
    {
      name: 'Punjab',
      cattleCount: 12500,
      avgScore: 7.8,
      evaluations: 445,
      topBreed: 'Holstein',
      growth: '+12%',
      coordinates: { lat: 31.1471, lng: 75.3412 }
    },
    {
      name: 'Gujarat',
      cattleCount: 18300,
      avgScore: 7.2,
      evaluations: 678,
      topBreed: 'Gir',
      growth: '+8%',
      coordinates: { lat: 23.0225, lng: 72.5714 }
    },
    {
      name: 'Maharashtra',
      cattleCount: 15600,
      avgScore: 7.5,
      evaluations: 532,
      topBreed: 'Jersey',
      growth: '+15%',
      coordinates: { lat: 19.7515, lng: 75.7139 }
    },
    {
      name: 'Karnataka',
      cattleCount: 11200,
      avgScore: 7.1,
      evaluations: 389,
      topBreed: 'Holstein',
      growth: '+6%',
      coordinates: { lat: 15.3173, lng: 75.7139 }
    },
    {
      name: 'Haryana',
      cattleCount: 9800,
      avgScore: 7.9,
      evaluations: 298,
      topBreed: 'Murrah Buffalo',
      growth: '+18%',
      coordinates: { lat: 29.0588, lng: 76.0856 }
    },
    {
      name: 'Uttar Pradesh',
      cattleCount: 22100,
      avgScore: 6.8,
      evaluations: 743,
      topBreed: 'Sahiwal',
      growth: '+10%',
      coordinates: { lat: 26.8467, lng: 80.9462 }
    }
  ];

  const districtData = [
    { name: 'Ludhiana', state: 'Punjab', cattleCount: 3200, avgScore: 8.1 },
    { name: 'Amritsar', state: 'Punjab', cattleCount: 2800, avgScore: 7.8 },
    { name: 'Ahmedabad', state: 'Gujarat', cattleCount: 4100, avgScore: 7.4 },
    { name: 'Pune', state: 'Maharashtra', cattleCount: 3600, avgScore: 7.7 },
    { name: 'Bangalore Rural', state: 'Karnataka', cattleCount: 2900, avgScore: 7.3 }
  ];

  const filteredStates = selectedState === 'all' 
    ? stateData 
    : stateData.filter(state => state.name === selectedState);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Geo Mapping</h1>
          <p className="text-muted-foreground">Regional cattle distribution and performance analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Full Screen
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Regional Overview</TabsTrigger>
          <TabsTrigger value="heatmap">Performance Heatmap</TabsTrigger>
          <TabsTrigger value="trends">Migration Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Filter by State</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {stateData.map(state => (
                      <SelectItem key={state.name} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={dataType} onValueChange={setDataType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cattle-count">Cattle Count</SelectItem>
                    <SelectItem value="avg-score">Average Score</SelectItem>
                    <SelectItem value="evaluations">Evaluations</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Cattle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {filteredStates.reduce((sum, state) => sum + state.cattleCount, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Across {filteredStates.length} state(s)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avg Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {(filteredStates.reduce((sum, state) => sum + state.avgScore, 0) / filteredStates.length).toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">ATC Score</p>
              </CardContent>
            </Card>
          </div>

          {/* Mock Map Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-primary" />
                Interactive Map View
              </CardTitle>
              <CardDescription>
                Cattle distribution across different regions (Interactive map would be here)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center relative overflow-hidden">
                {/* Mock map with state markers */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50">
                  {filteredStates.map((state, index) => (
                    <div
                      key={state.name}
                      className="absolute bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold cursor-pointer hover:scale-110 transition-transform shadow-lg"
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`
                      }}
                      title={`${state.name}: ${state.cattleCount} cattle`}
                    >
                      {state.cattleCount > 15000 ? '●●●' : state.cattleCount > 10000 ? '●●' : '●'}
                    </div>
                  ))}
                </div>
                <div className="text-center z-10">
                  <Map className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-lg font-semibold text-muted-foreground">Interactive Map Integration</p>
                  <p className="text-sm text-muted-foreground">Real map with Leaflet/Mapbox would render here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* State Statistics */}
          <div className="grid gap-4">
            {filteredStates.map((state) => (
              <Card key={state.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold">
                        {state.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{state.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Top Breed: <span className="font-medium text-foreground">{state.topBreed}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-6 w-full lg:w-auto">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{state.cattleCount.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Total Cattle</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{state.avgScore}</div>
                        <p className="text-xs text-muted-foreground">Avg Score</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{state.evaluations}</div>
                        <p className="text-xs text-muted-foreground">Evaluations</p>
                      </div>
                      <div className="text-center">
                        <Badge variant={state.growth.startsWith('+') ? 'default' : 'secondary'} className="text-sm">
                          {state.growth}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Growth</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Heatmap</CardTitle>
              <CardDescription>Regional performance visualization by ATC scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-red-50 via-yellow-50 to-green-50 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center relative">
                {/* Mock heatmap */}
                <div className="absolute inset-4">
                  <div className="grid grid-cols-6 gap-2 h-full">
                    {Array.from({ length: 30 }, (_, i) => (
                      <div
                        key={i}
                        className={`rounded ${
                          i % 5 === 0 ? 'bg-green-400' :
                          i % 3 === 0 ? 'bg-yellow-400' :
                          i % 4 === 0 ? 'bg-orange-400' : 'bg-red-300'
                        } opacity-70`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center z-10 bg-white/90 p-4 rounded-lg">
                  <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-lg font-semibold text-muted-foreground">Performance Heatmap</p>
                  <p className="text-sm text-muted-foreground">Color-coded regional performance visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Districts</CardTitle>
                <CardDescription>Highest ATC scores by district</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {districtData.map((district, index) => (
                    <div key={district.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{district.name}</p>
                          <p className="text-sm text-muted-foreground">{district.state}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{district.avgScore}</div>
                        <p className="text-xs text-muted-foreground">{district.cattleCount} cattle</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Migration Patterns</CardTitle>
                <CardDescription>Seasonal cattle movement trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Migration Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Track seasonal movement patterns and breeding migrations
                  </p>
                  <Button variant="outline">View Migration Data</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}