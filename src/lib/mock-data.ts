// Mock data utilities for PashuMitra AI

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'field-worker' | 'researcher' | 'govt-officer' | 'admin';
  avatar?: string;
}

export interface CattleRecord {
  id: string;
  name: string;
  breed: string;
  age: number;
  images: string[];
  atcScore: number;
  bodyMeasurements: Record<string, number>;
  keypoints: Array<{ x: number; y: number; confidence: number; label: string }>;
  evaluation: {
    traits: Record<string, number>;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  createdAt: Date;
  location: string;
  farmerId: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@farmer.com',
    role: 'field-worker',
    avatar: '🧑‍🌾'
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    email: 'priya@research.gov.in',
    role: 'researcher',
    avatar: '👩‍🔬'
  },
  {
    id: '3',
    name: 'Amit Singh',
    email: 'amit@govt.in',
    role: 'govt-officer',
    avatar: '👨‍💼'
  }
];

// Generate random cattle data
export const generateMockCattleRecord = (index: number): CattleRecord => {
  const breeds = ['Holstein', 'Jersey', 'Gir', 'Sahiwal', 'Red Sindhi', 'Tharparkar', 'Murrah Buffalo', 'Nili Ravi Buffalo'];
  const traits = ['Body Length', 'Height', 'Chest Girth', 'Milk Yield', 'Fertility Index', 'Health Score', 'Temperament', 'Feed Efficiency'];
  const locations = ['Punjab', 'Haryana', 'Gujarat', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu'];
  
  const breed = breeds[Math.floor(Math.random() * breeds.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  
  // Generate random keypoints (65 points for cattle)
  const keypoints = Array.from({ length: 65 }, (_, i) => ({
    x: Math.random() * 800,
    y: Math.random() * 600,
    confidence: 0.6 + Math.random() * 0.4,
    label: `Point_${i + 1}`
  }));

  // Generate trait scores (1-9 scale)
  const traitScores = traits.reduce((acc, trait) => {
    acc[trait] = Math.floor(Math.random() * 9) + 1;
    return acc;
  }, {} as Record<string, number>);

  const atcScore = Object.values(traitScores).reduce((sum, score) => sum + score, 0) / traits.length;

  return {
    id: `cattle_${index}`,
    name: `${breed} ${index}`,
    breed,
    age: Math.floor(Math.random() * 8) + 2,
    images: [`/api/placeholder/cattle-${index}-front.jpg`, `/api/placeholder/cattle-${index}-side.jpg`],
    atcScore: Math.round(atcScore * 10) / 10,
    bodyMeasurements: {
      'Body Length (cm)': Math.floor(Math.random() * 50) + 150,
      'Height (cm)': Math.floor(Math.random() * 30) + 130,
      'Chest Girth (cm)': Math.floor(Math.random() * 40) + 180,
      'Weight (kg)': Math.floor(Math.random() * 200) + 400,
    },
    keypoints,
    evaluation: {
      traits: traitScores,
      strengths: ['Good body conformation', 'Excellent temperament', 'High milk potential'],
      weaknesses: ['Needs better feeding', 'Monitor health regularly'],
      recommendations: ['Increase protein in diet', 'Regular health checkups', 'Breeding recommendations available']
    },
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    location,
    farmerId: mockUsers[Math.floor(Math.random() * mockUsers.length)].id
  };
};

export const mockCattleData = Array.from({ length: 50 }, (_, i) => generateMockCattleRecord(i + 1));

// Dashboard statistics
export const getDashboardStats = () => {
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = mockCattleData.filter(record => 
    record.createdAt.toISOString().split('T')[0] === today
  ).length;

  const avgScore = mockCattleData.reduce((sum, record) => sum + record.atcScore, 0) / mockCattleData.length;
  
  return {
    todayEvaluations: Math.floor(Math.random() * 20) + 5,
    avgAtcScore: Math.round(avgScore * 10) / 10,
    reportsSynced: Math.floor(Math.random() * 100) + 200,
    totalAnimals: mockCattleData.length,
    activeUsers: mockUsers.length,
    pendingSync: Math.floor(Math.random() * 15) + 3
  };
};

// Chart data generators
export const getScoreDistributionData = () => {
  const ranges = ['0-2', '2-4', '4-6', '6-8', '8-10'];
  return ranges.map(range => {
    const [min, max] = range.split('-').map(Number);
    const count = mockCattleData.filter(record => 
      record.atcScore >= min && record.atcScore < max
    ).length;
    return { range, count, percentage: Math.round((count / mockCattleData.length) * 100) };
  });
};

export const getBreedDistributionData = () => {
  const breedCounts = mockCattleData.reduce((acc, record) => {
    acc[record.breed] = (acc[record.breed] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(breedCounts).map(([breed, count]) => ({
    breed,
    count,
    percentage: Math.round((count / mockCattleData.length) * 100)
  }));
};

export const getTrendData = () => {
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      evaluations: Math.floor(Math.random() * 20) + 5,
      avgScore: Math.round((Math.random() * 4 + 6) * 10) / 10,
      newRegistrations: Math.floor(Math.random() * 10) + 1
    };
  });
  return days;
};

// Disease detection mock data
export const mockDiseaseDetection = () => {
  const diseases = [
    { name: 'Mastitis', probability: 0.23, severity: 'medium' },
    { name: 'Lameness', probability: 0.67, severity: 'high' },
    { name: 'Respiratory Issues', probability: 0.12, severity: 'low' }
  ];
  
  return diseases.filter(() => Math.random() > 0.7); // Sometimes return empty
};

// Leaderboard data
export const getLeaderboardData = () => {
  return mockCattleData
    .sort((a, b) => b.atcScore - a.atcScore)
    .slice(0, 10)
    .map((record, index) => ({
      rank: index + 1,
      ...record,
      farmerName: mockUsers.find(u => u.id === record.farmerId)?.name || 'Unknown Farmer'
    }));
};