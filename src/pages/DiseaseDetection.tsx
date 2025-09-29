import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, Eye, Camera, Activity, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDropzone } from 'react-dropzone';

interface Detection {
  id: string;
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  treatment: string;
  symptoms: string[];
}

export default function DiseaseDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  
  const mockDetections: Detection[] = [
    {
      id: '1',
      disease: 'Mastitis',
      confidence: 89,
      severity: 'high',
      description: 'Inflammation of mammary gland detected in rear left quarter',
      treatment: 'Antibiotic therapy recommended. Consult veterinarian immediately.',
      symptoms: ['Swollen udder', 'Warm to touch', 'Abnormal milk color']
    },
    {
      id: '2',
      disease: 'Lameness',
      confidence: 76,
      severity: 'medium',
      description: 'Irregular gait pattern detected, possible hoof issues',
      treatment: 'Hoof examination required. Check for foreign objects or infection.',
      symptoms: ['Limping', 'Favoring one leg', 'Reluctance to move']
    },
    {
      id: '3',
      disease: 'Eye Infection',
      confidence: 64,
      severity: 'low',
      description: 'Minor conjunctivitis detected in left eye',
      treatment: 'Apply antibiotic eye drops 2-3 times daily',
      symptoms: ['Redness', 'Discharge', 'Squinting']
    }
  ];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        simulateAnalysis();
      }
    }
  });

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      // Randomly show 0-3 detections
      const numDetections = Math.floor(Math.random() * 4);
      const randomDetections = mockDetections.slice(0, numDetections);
      setDetections(randomDetections);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Disease Detection</h1>
          <p className="text-muted-foreground">AI-powered health monitoring and disease identification</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Health History
          </Button>
          <Button variant="outline">
            <Stethoscope className="w-4 h-4 mr-2" />
            Vet Contacts
          </Button>
        </div>
      </div>

      <Tabs defaultValue="detection" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="detection">Disease Detection</TabsTrigger>
          <TabsTrigger value="history">Health Records</TabsTrigger>
          <TabsTrigger value="prevention">Prevention Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="detection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Upload Images for Analysis
              </CardTitle>
              <CardDescription>
                Upload clear photos of your cattle for AI-powered disease detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {isDragActive ? 'Drop images here...' : 'Drag & drop images or click to browse'}
                </h3>
                <p className="text-muted-foreground">
                  Supported formats: JPG, PNG, WEBP. Multiple images recommended for better accuracy.
                </p>
              </div>

              {isAnalyzing && (
                <div className="mt-6 space-y-4">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                    <h3 className="font-semibold">Analyzing Images...</h3>
                    <p className="text-muted-foreground">AI is examining your cattle for potential health issues</p>
                  </div>
                  <Progress value={66} className="w-full" />
                  <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                    <span>✓ Image preprocessing</span>
                    <span>⏳ Disease detection</span>
                    <span>⏳ Confidence scoring</span>
                  </div>
                </div>
              )}

              {analysisComplete && (
                <div className="mt-6 space-y-4">
                  {detections.length === 0 ? (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Great news!</strong> No obvious health issues detected in the uploaded images. 
                        Your cattle appear to be in good health.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-4">
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Health concerns detected.</strong> Review the findings below and consult with a veterinarian for proper treatment.
                        </AlertDescription>
                      </Alert>

                      {detections.map((detection) => (
                        <Card key={detection.id} className="border-l-4" style={{ borderLeftColor: getSeverityColor(detection.severity).replace('bg-', '#') }}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{detection.disease}</CardTitle>
                              <div className="flex items-center gap-2">
                                <Badge variant={detection.severity === 'high' || detection.severity === 'critical' ? 'destructive' : 'secondary'}>
                                  {detection.severity.toUpperCase()}
                                </Badge>
                                <Badge variant="outline">
                                  {detection.confidence}% confident
                                </Badge>
                              </div>
                            </div>
                            <CardDescription>{detection.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Symptoms Detected:</h4>
                              <div className="flex flex-wrap gap-2">
                                {detection.symptoms.map((symptom, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {symptom}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Recommended Treatment:</h4>
                              <p className="text-sm">{detection.treatment}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Contact Vet
                              </Button>
                              <Button size="sm" variant="outline">
                                More Info
                              </Button>
                              <Button size="sm" variant="outline">
                                Save Report
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Records</CardTitle>
              <CardDescription>Historical health monitoring and treatment records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Health Records Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start monitoring your cattle's health to build a comprehensive health history
                </p>
                <Button>Start Health Monitoring</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prevention" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Common Diseases</CardTitle>
                <CardDescription>Prevention tips for frequent cattle health issues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Mastitis Prevention</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Maintain clean milking environment</li>
                    <li>• Regular udder cleaning</li>
                    <li>• Proper milking technique</li>
                    <li>• Post-milking teat dipping</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Lameness Prevention</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Regular hoof trimming</li>
                    <li>• Clean, dry housing</li>
                    <li>• Foot baths with copper sulfate</li>
                    <li>• Nutritional management</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vaccination Schedule</CardTitle>
                <CardDescription>Recommended vaccination timeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { vaccine: 'FMD (Foot & Mouth Disease)', frequency: 'Every 6 months', nextDue: '2024-04-15' },
                    { vaccine: 'Blackleg & Malignant Edema', frequency: 'Annual', nextDue: '2024-06-20' },
                    { vaccine: 'Brucellosis', frequency: 'As per vet advice', nextDue: '2024-08-10' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.vaccine}</p>
                        <p className="text-sm text-muted-foreground">{item.frequency}</p>
                      </div>
                      <Badge variant="outline">
                        Due: {item.nextDue}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}