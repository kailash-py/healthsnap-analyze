
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CircleAlert, CircleCheck, Star, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import type { AnalysisResult } from "@/pages/AnalyzePage";

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  nutritionText: string;
}

const ResultsDisplay = ({ result, nutritionText }: ResultsDisplayProps) => {
  if (!result) {
    return <div>No results available</div>;
  }

  // Function to display rating stars
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-6 w-6 text-gray-300 fill-gray-300" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-6 w-6 text-gray-300 fill-gray-300" />
        ))}
      </div>
    );
  };

  // Get color based on rating
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 2.5) return "text-yellow-600";
    return "text-red-600";
  };

  // Get rating text
  const getRatingText = (rating: number) => {
    if (rating >= 4) return "Good Choice";
    if (rating >= 2.5) return "Moderate Choice";
    return "Poor Choice";
  };

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Rating Section */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          {renderRatingStars(result.rating)}
        </div>
        <h2 className={`text-2xl font-bold ${getRatingColor(result.rating)}`}>
          {getRatingText(result.rating)}
        </h2>
        <p className="text-gray-600">
          {result.rating.toFixed(1)} out of 5 stars
        </p>
      </div>

      {/* Main Feedback */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-700">{result.feedback}</p>
      </div>

      {/* Highlights and Concerns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <CircleCheck className="h-5 w-5 text-green-600" />
              <h3 className="font-medium">Positive Highlights</h3>
            </div>
            <ul className="space-y-2">
              {result.positiveHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                  </div>
                  <span className="text-sm">{highlight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <CircleAlert className="h-5 w-5 text-amber-600" />
              <h3 className="font-medium">Health Considerations</h3>
            </div>
            <ul className="space-y-2">
              {result.healthConcerns.map((concern, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-600"></div>
                  </div>
                  <span className="text-sm">{concern}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Nutrition Information */}
      <div>
        <h3 className="font-medium mb-2">Analyzed Nutrition Information</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-xs whitespace-pre-wrap font-mono text-gray-700">
            {nutritionText}
          </pre>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button variant="outline" asChild className="sm:flex-1">
          <Link to="/analyze">
            <ArrowLeft className="mr-2 h-4 w-4" /> Analyze Another Food
          </Link>
        </Button>
        <Button onClick={handlePrint} variant="secondary" className="sm:flex-1">
          <Printer className="mr-2 h-4 w-4" /> Print Results
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
