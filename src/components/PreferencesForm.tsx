
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { HealthPreferences } from "@/pages/AnalyzePage";

interface PreferencesFormProps {
  onSubmit: (preferences: HealthPreferences) => void;
}

const PreferencesForm = ({ onSubmit }: PreferencesFormProps) => {
  const [preferences, setPreferences] = useState<HealthPreferences>({
    nutritionalGoals: "",
    dietaryRestrictions: "",
    healthConditions: "",
    wellnessGoals: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if at least one field is filled
    const hasValue = Object.values(preferences).some(val => val.trim() !== "");
    
    if (!hasValue) {
      toast.error("Please fill in at least one preference field");
      return;
    }
    
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <Label htmlFor="nutritionalGoals">Nutritional Goals</Label>
        <Textarea
          id="nutritionalGoals"
          name="nutritionalGoals"
          placeholder="E.g., Low sugar, high protein, low carb, etc."
          value={preferences.nutritionalGoals}
          onChange={handleChange}
        />
        <p className="text-xs text-gray-500">What specific nutrition targets are you aiming for?</p>
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
        <Textarea
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          placeholder="E.g., Vegetarian, vegan, gluten-free, kosher, etc."
          value={preferences.dietaryRestrictions}
          onChange={handleChange}
        />
        <p className="text-xs text-gray-500">Any specific diet or ingredients you avoid?</p>
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="healthConditions">Health Conditions</Label>
        <Textarea
          id="healthConditions"
          name="healthConditions"
          placeholder="E.g., Diabetes, hypertension, allergies, heart problems, etc."
          value={preferences.healthConditions}
          onChange={handleChange}
        />
        <p className="text-xs text-gray-500">List any health conditions we should consider.</p>
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="wellnessGoals">Wellness Goals</Label>
        <Textarea
          id="wellnessGoals"
          name="wellnessGoals"
          placeholder="E.g., Weight loss, muscle gain, energy boost, etc."
          value={preferences.wellnessGoals}
          onChange={handleChange}
        />
        <p className="text-xs text-gray-500">What are your overall health and wellness objectives?</p>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit">
          Analyze Food <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default PreferencesForm;
