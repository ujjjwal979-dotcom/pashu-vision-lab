import React, { useState } from 'react';
import { Heart, Search, Filter, Star, ArrowRight, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Bull {
  id: string;
  name: string;
  breed: string;
  age: number;
  genetics: Record<string, number>;
  compatibility: number;
  location: string;
  owner: string;
  status: 'available' | 'booked' | 'busy';
  traits: string[];
  progenyCount: number;
  avgProgenyScore: number;
}

export default function BullMatching() {
  const [selectedCattle, setSelectedCattle] = useState<string>('');
  const [breedFilter, setBreedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockBulls: Bull[] = [
    {
      id: 'bull_001',
      name: 'Champion Thunder',
      breed: 'Holstein',
      age: 5,
      genetics: {
        'Milk Yield': 9.2,
        'Body Structure': 8.8,
        'Disease Resistance': 8.5,
        'Fertility': 9.0,
        'Feed Efficiency': 8.3
      },
      compatibility: 94,
      location: 'Punjab',
      owner: 'Punjab Genetics Center',
      status: 'available',
      traits: ['High Milk Production', 'Strong Build', 'Disease Resistant'],
      progenyCount: 45,
      avgProgenyScore: 8.6
    },
    {
      id: 'bull_002',
      name: 'Royal Warrior',
      breed: 'Jersey',
      age: 4,
      genetics: {
        'Milk Yield': 8.5,
        'Body Structure': 9.1,
        'Disease Resistance': 8.8,
        'Fertility': 8.9,
        'Feed Efficiency': 9.2
      },
      compatibility: 89,
      location: 'Maharashtra',
      owner: 'Elite Bull Station',
      status: 'available',
      traits: ['Excellent Conformation', 'High Fat Content', 'Efficient Feed Conversion'],
      progenyCount: 38,
      avgProgenyScore: 8.2
    },
    {
      id: 'bull_003',
      name: 'Majestic Pride',
      breed: 'Gir',
      age: 6,
      genetics: {
        'Milk Yield': 7.8,
        'Body Structure': 8.9,
        'Disease Resistance': 9.3,
        'Fertility': 8.7,
        'Feed Efficiency': 8.1
      },
      compatibility: 87,
      location: 'Gujarat',
      owner: 'Gir Breeding Cooperative',
      status: 'available',
      traits: ['Heat Tolerance', 'Disease Immunity', 'Longevity'],
      progenyCount: 52,
      avgProgenyScore: 7.9
    }
  ];

  const filteredBulls = mockBulls.filter(bull => {
    const matchesBreed = breedFilter === 'all' || bull.breed === breedFilter;
    const matchesSearch = bull.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bull.breed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBreed && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bull Matching</h1>
          <p className="text-muted-foreground">Find the perfect bull for optimal breeding outcomes</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Heart className="w-4 h-4 mr-2" />
          Breeding Calculator
        </Button>
      </div>

      <Tabs defaultValue="matching" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="matching">Bull Matching</TabsTrigger>
          <TabsTrigger value="genetics">Genetic Analysis</TabsTrigger>
          <TabsTrigger value="booking">Booking & Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="matching" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Cattle</CardTitle>
                <CardDescription>Choose cattle for breeding recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedCattle} onValueChange={setSelectedCattle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cattle..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cow_1">Holstein 1 (Score: 8.2)</SelectItem>
                    <SelectItem value="cow_2">Jersey 2 (Score: 7.8)</SelectItem>
                    <SelectItem value="cow_3">Gir 3 (Score: 7.5)</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Filter Bulls</CardTitle>
                <CardDescription>Refine your search criteria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search bulls..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={breedFilter} onValueChange={setBreedFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Breeds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Breeds</SelectItem>
                    <SelectItem value="Holstein">Holstein</SelectItem>
                    <SelectItem value="Jersey">Jersey</SelectItem>
                    <SelectItem value="Gir">Gir</SelectItem>
                    <SelectItem value="Sahiwal">Sahiwal</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Matching Stats</CardTitle>
                <CardDescription>Current search results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bulls Found:</span>
                    <span className="font-semibold">{filteredBulls.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>High Compatibility:</span>
                    <span className="font-semibold text-green-600">
                      {filteredBulls.filter(b => b.compatibility >= 90).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Available Now:</span>
                    <span className="font-semibold">
                      {filteredBulls.filter(b => b.status === 'available').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            {filteredBulls.map((bull) => (
              <Card key={bull.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{bull.name}</h3>
                        <Badge variant={bull.status === 'available' ? 'default' : 'secondary'}>
                          {bull.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Breed: <span className="font-medium text-foreground">{bull.breed}</span></p>
                        <p>Age: <span className="font-medium text-foreground">{bull.age} years</span></p>
                        <p className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {bull.location}
                        </p>
                        <p>Owner: <span className="font-medium text-foreground">{bull.owner}</span></p>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Compatibility Score</span>
                          <span className="text-lg font-bold text-primary">{bull.compatibility}%</span>
                        </div>
                        <Progress value={bull.compatibility} className="h-2" />
                      </div>
                    </div>

                    <div className="lg:w-1/3">
                      <h4 className="font-semibold mb-3">Genetic Traits</h4>
                      <div className="space-y-2">
                        {Object.entries(bull.genetics).map(([trait, score]) => (
                          <div key={trait} className="flex items-center justify-between">
                            <span className="text-sm">{trait}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={score * 10} className="w-16 h-1" />
                              <span className="text-xs font-medium w-8">{score}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-1">
                          {bull.traits.map((trait, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-1/3">
                      <h4 className="font-semibold mb-3">Performance Stats</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Progeny Count</span>
                          <span className="font-semibold">{bull.progenyCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Avg Progeny Score</span>
                          <span className="font-semibold">{bull.avgProgenyScore}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-green-600">+12% improvement rate</span>
                        </div>
                      </div>
                      <div className="mt-6 space-y-2">
                        <Button className="w-full" disabled={bull.status !== 'available'}>
                          {bull.status === 'available' ? 'Request Breeding' : 'Currently Unavailable'}
                        </Button>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="genetics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Genetic Analysis</CardTitle>
              <CardDescription>Predict offspring characteristics and breeding outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Genetic Calculator</h3>
                <p className="text-muted-foreground mb-4">
                  Select a bull and cattle pair to analyze genetic compatibility and predict offspring traits
                </p>
                <Button>Start Genetic Analysis</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Breeding Requests</CardTitle>
              <CardDescription>Manage your breeding bookings and requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Bookings</h3>
                <p className="text-muted-foreground mb-4">
                  Request breeding services from the bull matching section to get started
                </p>
                <Button variant="outline">View Booking History</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}