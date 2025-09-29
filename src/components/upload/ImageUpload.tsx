import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  Eye,
  Download,
  Share2,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateMockCattleRecord, mockDiseaseDetection } from '@/lib/mock-data';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  angle: 'front' | 'side' | 'back';
  processed: boolean;
  keypoints?: Array<{ x: number; y: number; confidence: number; label: string }>;
}

const ImageAnalysisResult = ({ record }: { record: any }) => {
  const diseaseAlerts = mockDiseaseDetection();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Analysis Results</span>
            <Badge className="bg-success text-success-foreground">
              ATC Score: {record.atcScore}/10
            </Badge>
          </CardTitle>
          <CardDescription>Comprehensive cattle evaluation completed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Body Measurements */}
          <div>
            <h4 className="font-medium mb-3">Body Measurements</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(record.bodyMeasurements).map(([key, value]) => (
                <div key={key} className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">{key}</p>
                  <p className="font-medium">{String(value)}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Trait Scores */}
          <div>
            <h4 className="font-medium mb-3">Trait Evaluation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(record.evaluation.traits).map(([trait, score]) => (
                <div key={trait} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">{trait}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={(score as number) * 10} className="w-16" />
                    <Badge variant="outline">{String(score)}/9</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Disease Alerts */}
          {diseaseAlerts.length > 0 && (
            <div>
              <h4 className="font-medium mb-3 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span>Health Alerts</span>
              </h4>
              <div className="space-y-2">
                {diseaseAlerts.map((disease, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      disease.severity === 'high' ? 'bg-destructive/10 border-destructive/20' :
                      disease.severity === 'medium' ? 'bg-warning/10 border-warning/20' :
                      'bg-info/10 border-info/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{disease.name}</span>
                      <Badge 
                        variant="outline"
                        className={
                          disease.severity === 'high' ? 'border-destructive text-destructive' :
                          disease.severity === 'medium' ? 'border-warning text-warning' :
                          'border-info text-info'
                        }
                      >
                        {Math.round(disease.probability * 100)}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Severity: {disease.severity.toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Separator />
          
          {/* Recommendations */}
          <div>
            <h4 className="font-medium mb-3">Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-success mb-2">Strengths</h5>
                <ul className="text-sm space-y-1">
                  {record.evaluation.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-success" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-warning mb-2">Areas for Improvement</h5>
                <ul className="text-sm space-y-1">
                  {record.evaluation.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <AlertTriangle className="w-3 h-3 text-warning" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className="bg-gradient-success">
                Save to History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ImageUpload = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
    maxFiles: 3,
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file, index) => ({
        id: `img_${Date.now()}_${index}`,
        file,
        preview: URL.createObjectURL(file),
        angle: (['front', 'side', 'back'] as const)[uploadedImages.length + index] || 'front',
        processed: false,
      }));
      
      setUploadedImages(prev => [...prev, ...newImages].slice(0, 3));
      toast({
        title: "Images uploaded successfully! 📸",
        description: `${acceptedFiles.length} image(s) ready for analysis.`
      });
    }
  });

  const processImages = async () => {
    if (uploadedImages.length === 0) return;
    
    setProcessing(true);
    setAnalysisComplete(false);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock keypoints for images
    const processedImages = uploadedImages.map(img => ({
      ...img,
      processed: true,
      keypoints: Array.from({ length: 65 }, (_, i) => ({
        x: Math.random() * 400,
        y: Math.random() * 300,
        confidence: 0.6 + Math.random() * 0.4,
        label: `Point_${i + 1}`
      }))
    }));
    
    setUploadedImages(processedImages);
    
    // Generate analysis result
    const result = generateMockCattleRecord(Date.now());
    setAnalysisResult(result);
    
    setProcessing(false);
    setAnalysisComplete(true);
    
    toast({
      title: "Analysis completed! 🎉",
      description: `ATC Score: ${result.atcScore}/10 - Analysis ready for review.`
    });
  };

  const resetUpload = () => {
    uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
    setUploadedImages([]);
    setProcessing(false);
    setAnalysisComplete(false);
    setAnalysisResult(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload & Analyze</h1>
        <p className="text-muted-foreground">Upload cattle images for AI-powered evaluation</p>
      </div>

      {!analysisComplete ? (
        <>
          {/* Upload Area */}
          <Card className="border-dashed border-2">
            <CardContent className="p-8">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      {isDragActive ? 'Drop images here...' : 'Drag & drop cattle images'}
                    </p>
                    <p className="text-muted-foreground">
                      Or click to browse • Support JPG, PNG, WebP • Max 3 images
                    </p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Badge variant="outline">Front View</Badge>
                    <Badge variant="outline">Side View</Badge>
                    <Badge variant="outline">Back View</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Images */}
          <AnimatePresence>
            {uploadedImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Uploaded Images ({uploadedImages.length}/3)</CardTitle>
                    <CardDescription>Preview and verify image quality before analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {uploadedImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                            <img
                              src={image.preview}
                              alt={`${image.angle} view`}
                              className="w-full h-full object-cover"
                            />
                            {image.processed && image.keypoints && (
                              <div className="absolute inset-0 bg-black/20">
                                {image.keypoints.slice(0, 20).map((point, i) => (
                                  <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
                                    style={{
                                      left: `${(point.x / 400) * 100}%`,
                                      top: `${(point.y / 300) * 100}%`,
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                          <Badge className="absolute top-2 left-2 capitalize">
                            {image.angle} View
                          </Badge>
                          {image.processed && (
                            <Badge className="absolute top-2 right-2 bg-success text-success-foreground">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Processed
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button variant="outline" onClick={resetUpload}>
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Clear All
                      </Button>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline">
                          <Camera className="w-4 h-4 mr-2" />
                          Capture Live
                        </Button>
                        <Button 
                          onClick={processImages}
                          disabled={processing}
                          className="bg-gradient-primary"
                        >
                          {processing ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Analyze Images
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Processing Indicator */}
          <AnimatePresence>
            {processing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="border-primary bg-primary/5">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="flex justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">AI Analysis in Progress</h3>
                        <p className="text-sm text-muted-foreground">
                          Detecting keypoints, measuring traits, and evaluating performance...
                        </p>
                      </div>
                      <Progress value={66} className="w-full max-w-sm mx-auto" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* Analysis Results */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Analysis Complete</h2>
            <Button variant="outline" onClick={resetUpload}>
              Analyze New Images
            </Button>
          </div>
          {analysisResult && <ImageAnalysisResult record={analysisResult} />}
        </div>
      )}
    </div>
  );
};