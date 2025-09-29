import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, Calendar, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCattleData, mockUsers } from '@/lib/mock-data';
import { format } from 'date-fns';

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [breedFilter, setBredFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');

  const filteredReports = useMemo(() => {
    return mockCattleData.filter(cattle => {
      const matchesSearch = cattle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cattle.breed.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBreed = breedFilter === 'all' || cattle.breed === breedFilter;
      const matchesScore = scoreFilter === 'all' || 
                          (scoreFilter === 'high' && cattle.atcScore >= 7) ||
                          (scoreFilter === 'medium' && cattle.atcScore >= 4 && cattle.atcScore < 7) ||
                          (scoreFilter === 'low' && cattle.atcScore < 4);
      
      return matchesSearch && matchesBreed && matchesScore;
    });
  }, [searchTerm, breedFilter, scoreFilter]);

  const breeds = [...new Set(mockCattleData.map(cattle => cattle.breed))];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & History</h1>
          <p className="text-muted-foreground">Manage and analyze cattle evaluation records</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Evaluation Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filter Reports</CardTitle>
              <CardDescription>Search and filter evaluation reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by animal name or breed..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={breedFilter} onValueChange={setBredFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Breeds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Breeds</SelectItem>
                    {breeds.map(breed => (
                      <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={scoreFilter} onValueChange={setScoreFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Scores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scores</SelectItem>
                    <SelectItem value="high">High (7-9)</SelectItem>
                    <SelectItem value="medium">Medium (4-6)</SelectItem>
                    <SelectItem value="low">Low (1-3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evaluation Records ({filteredReports.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Animal Name</TableHead>
                    <TableHead>Breed</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>ATC Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.slice(0, 10).map((cattle) => (
                    <TableRow key={cattle.id}>
                      <TableCell className="font-medium">{cattle.name}</TableCell>
                      <TableCell>{cattle.breed}</TableCell>
                      <TableCell>{cattle.age} years</TableCell>
                      <TableCell>
                        <Badge variant={cattle.atcScore >= 7 ? 'default' : cattle.atcScore >= 4 ? 'secondary' : 'destructive'}>
                          {cattle.atcScore.toFixed(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(cattle.createdAt, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Synced
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Evaluations</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{mockCattleData.length}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average ATC Score</CardTitle>
                <CardDescription>Overall performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {(mockCattleData.reduce((sum, c) => sum + c.atcScore, 0) / mockCattleData.length).toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">+0.3 improvement</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>High Performers</CardTitle>
                <CardDescription>Score ≥ 7.0</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {mockCattleData.filter(c => c.atcScore >= 7).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((mockCattleData.filter(c => c.atcScore >= 7).length / mockCattleData.length) * 100)}% of total
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparisons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Animal Comparisons</CardTitle>
              <CardDescription>Compare up to 3 animals side by side</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Comparisons Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Select animals from the reports to start comparing their performance
                </p>
                <Button>Start Comparison</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}