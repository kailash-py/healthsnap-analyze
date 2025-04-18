
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import UploadForm from "@/components/UploadForm";
import PreferencesForm from "@/components/PreferencesForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Types for our application state
export type HealthPreferences = {
  nutritionalGoals: string;
  dietaryRestrictions: string;
  healthConditions: string;
  wellnessGoals: string;
};

export type AnalysisResult = {
  rating: number;
  feedback: string;
  positiveHighlights: string[];
  healthConcerns: string[];
};

// Initial state values
const initialPreferences: HealthPreferences = {
  nutritionalGoals: "",
  dietaryRestrictions: "",
  healthConditions: "",
  wellnessGoals: ""
};

const AnalyzePage = () => {
  const [step, setStep] = useState<number>(1);
  const [image, setImage] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [editedText, setEditedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [healthPreferences, setHealthPreferences] = useState<HealthPreferences>(initialPreferences);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Handle image upload
  const handleImageUpload = (file: File) => {
    setImage(file);
    // In a real application, we would send this to an OCR service
    // For now, let's simulate OCR processing with a timeout
    setIsLoading(true);
    setTimeout(() => {
      // Sample nutrition label text
      const sampleText = 
`Nutrition Facts
Serving Size: 1 cup (240ml)
Servings Per Container: 4

Amount Per Serving
Calories 120    Calories from Fat 45
                % Daily Value*
Total Fat 5g    8%
  Saturated Fat 3g   15%
  Trans Fat 0g
Cholesterol 20mg   7%
Sodium 120mg   5%
Total Carbohydrate 12g   4%
  Dietary Fiber 0g   0%
  Sugars 12g
Protein 8g

Vitamin A 10%    Vitamin C 4%
Calcium 30%      Iron 0%

* Percent Daily Values are based on a 2,000 calorie diet.`;
      
      setExtractedText(sampleText);
      setEditedText(sampleText);
      setIsLoading(false);
      setStep(2);
      toast.success("Nutrition label processed successfully!");
    }, 2000);
  };

  // Handle text editing
  const handleTextEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  // Handle preferences submission
  const handlePreferencesSubmit = (preferences: HealthPreferences) => {
    setHealthPreferences(preferences);
    // In a real application, we would send this data to the AI service (Gemini)
    // For now, let's simulate AI processing with a timeout
    setIsLoading(true);
    setTimeout(() => {
      // Sample analysis result
      const sampleResult: AnalysisResult = {
        rating: 3.5,
        feedback: "This product is moderately suitable for your health profile. While it provides good protein content, the sugars and saturated fat content are higher than ideal for your goals.",
        positiveHighlights: [
          "Good source of protein (8g per serving)",
          "Contains 30% of daily calcium needs",
          "No trans fats"
        ],
        healthConcerns: [
          "Contains 12g of sugars per serving",
          "Moderate saturated fat content (3g)",
          "Low in dietary fiber"
        ]
      };
      
      setResult(sampleResult);
      setIsLoading(false);
      setStep(4);
      toast.success("Analysis complete!");
    }, 3000);
  };

  // Navigate to previous step
  const goToPrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <UploadForm onUpload={handleImageUpload} />;
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="extracted-text">Extracted Nutrition Information</Label>
              <Textarea 
                id="extracted-text" 
                value={editedText} 
                onChange={handleTextEdit} 
                className="h-[300px] font-mono text-sm"
                placeholder="Edit the extracted text if needed..."
              />
              <p className="text-sm text-gray-500">
                Please review and correct any errors in the extracted text before proceeding.
              </p>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={goToPrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(3)}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 3:
        return <PreferencesForm onSubmit={handlePreferencesSubmit} />;
      case 4:
        return <ResultsDisplay result={result} nutritionText={editedText} />;
      default:
        return <UploadForm onUpload={handleImageUpload} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Analyze Your Food</h1>
          <p className="text-gray-600">
            Upload a nutrition label and get personalized health insights
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i === step 
                    ? "bg-primary text-white"
                    : i < step 
                      ? "bg-primary/20 text-primary" 
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {i}
              </div>
              <span className="text-xs mt-1 text-gray-600">
                {i === 1 ? "Upload" : i === 2 ? "Review" : i === 3 ? "Preferences" : "Results"}
              </span>
            </div>
          ))}
        </div>

        <Card>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="min-h-[300px] flex flex-col items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="text-gray-600">
                  {step === 1 ? "Processing your image..." : 
                   step === 3 ? "Analyzing nutritional data..." : 
                   "Loading..."}
                </p>
              </div>
            ) : (
              renderStepContent()
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyzePage;
