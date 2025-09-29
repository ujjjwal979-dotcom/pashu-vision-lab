import React, { useState } from 'react';
import { Play, BookOpen, Download, Clock, Users, Star, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'guide' | 'interactive';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  views: number;
  rating: number;
  thumbnail: string;
  progress?: number;
}

export default function Tutorials() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const tutorials: Tutorial[] = [
    {
      id: '1',
      title: 'How to Take Perfect Cattle Photos for ATC Analysis',
      description: 'Learn the proper techniques for capturing cattle images that yield accurate ATC scores. Covers lighting, angles, and positioning.',
      type: 'video',
      duration: '8 min',
      difficulty: 'beginner',
      category: 'photography',
      views: 1245,
      rating: 4.8,
      thumbnail: '/api/placeholder/tutorial-photo.jpg',
      progress: 65
    },
    {
      id: '2',
      title: 'Understanding ATC Scoring System',
      description: 'Comprehensive guide to interpreting Animal Type Classification scores and what each trait measurement means.',
      type: 'guide',
      duration: '15 min',
      difficulty: 'intermediate',
      category: 'scoring',
      views: 892,
      rating: 4.6,
      thumbnail: '/api/placeholder/tutorial-scoring.jpg'
    },
    {
      id: '3',
      title: 'Cattle Breed Identification Guide',
      description: 'Visual guide to identifying different cattle breeds and their characteristics for accurate classification.',
      type: 'interactive',
      duration: '12 min',
      difficulty: 'beginner',
      category: 'breeds',
      views: 2103,
      rating: 4.9,
      thumbnail: '/api/placeholder/tutorial-breeds.jpg'
    },
    {
      id: '4',
      title: 'Advanced Disease Detection Techniques',
      description: 'Learn to identify early signs of diseases through visual inspection and AI-assisted diagnosis.',
      type: 'video',
      duration: '20 min',
      difficulty: 'advanced',
      category: 'health',
      views: 567,
      rating: 4.7,
      thumbnail: '/api/placeholder/tutorial-disease.jpg'
    },
    {
      id: '5',
      title: 'Bull Selection for Optimal Breeding',
      description: 'Strategies for selecting the right bull based on genetic traits and breeding goals.',
      type: 'guide',
      duration: '18 min',
      difficulty: 'intermediate',
      category: 'breeding',
      views: 734,
      rating: 4.5,
      thumbnail: '/api/placeholder/tutorial-breeding.jpg'
    },
    {
      id: '6',
      title: 'Setting Up Your Farm Profile',
      description: 'Step-by-step tutorial on creating and optimizing your farm profile in PashuMitra AI system.',
      type: 'interactive',
      duration: '6 min',
      difficulty: 'beginner',
      category: 'setup',
      views: 1678,
      rating: 4.4,
      thumbnail: '/api/placeholder/tutorial-setup.jpg',
      progress: 100
    }
  ];

  const categories = ['all', 'photography', 'scoring', 'breeds', 'health', 'breeding', 'setup'];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tutorial.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || tutorial.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'guide': return <BookOpen className="w-4 h-4" />;
      case 'interactive': return <Users className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tutorials & Learning</h1>
          <p className="text-muted-foreground">Master cattle evaluation and farm management with our comprehensive guides</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Download All PDFs
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Tutorials</TabsTrigger>
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filter Tutorials</CardTitle>
              <CardDescription>Find the perfect learning content for your needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search tutorials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-subtle rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                  {getTypeIcon(tutorial.type)}
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {tutorial.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="outline" className="text-xs bg-black/50 text-white border-white/20">
                      {tutorial.duration}
                    </Badge>
                  </div>
                  {tutorial.progress && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${tutorial.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-2 h-2 rounded-full ${getDifficultyColor(tutorial.difficulty)}`}
                    />
                    <span className="text-xs text-muted-foreground capitalize">
                      {tutorial.difficulty}
                    </span>
                    <div className="flex items-center gap-1 ml-auto">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground">{tutorial.rating}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-sm leading-tight mb-2">{tutorial.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{tutorial.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      {tutorial.views.toLocaleString()} views
                    </div>
                    <Button size="sm" className="h-7">
                      {tutorial.progress ? 'Continue' : 'Start'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="beginner" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started Path</CardTitle>
                <CardDescription>Complete beginner's journey to cattle evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tutorials.filter(t => t.difficulty === 'beginner').slice(0, 3).map((tutorial, index) => (
                  <div key={tutorial.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{tutorial.title}</p>
                      <p className="text-xs text-muted-foreground">{tutorial.duration}</p>
                    </div>
                    {tutorial.progress && (
                      <Badge variant={tutorial.progress === 100 ? 'default' : 'secondary'}>
                        {tutorial.progress === 100 ? 'Complete' : `${tutorial.progress}%`}
                      </Badge>
                    )}
                  </div>
                ))}
                <Button className="w-full">Start Learning Path</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Start Guides</CardTitle>
                <CardDescription>Essential knowledge for immediate use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Camera Setup for Best Results',
                    'Reading Your First ATC Report',
                    'Basic Cattle Handling Safety',
                    'Understanding Breed Categories'
                  ].map((guide, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{guide}</span>
                      <Button size="sm" variant="ghost">
                        <BookOpen className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Track your tutorial completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">67%</div>
                    <Progress value={67} className="w-full mb-2" />
                    <p className="text-sm text-muted-foreground">Overall completion</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Videos Watched:</span>
                      <span className="font-medium">8/12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Guides Read:</span>
                      <span className="font-medium">5/9</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Interactive Completed:</span>
                      <span className="font-medium">2/4</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificates Earned</CardTitle>
                <CardDescription>Your learning achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete tutorial paths to earn certificates
                  </p>
                  <Button variant="outline">Browse Certification Paths</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Tutorials</CardTitle>
              <CardDescription>Your bookmarked learning content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Bookmark tutorials you want to revisit later
                </p>
                <Button variant="outline">Browse All Tutorials</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}