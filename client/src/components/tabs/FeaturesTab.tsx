import { FEATURE_ICONS, WebsiteState } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface FeaturesTabProps {
  websiteState: WebsiteState;
  updateWebsiteState: (updates: Partial<WebsiteState>) => void;
}

export default function FeaturesTab({ websiteState, updateWebsiteState }: FeaturesTabProps) {
  const handleAddFeature = () => {
    const newFeature = {
      title: `Feature ${websiteState.features.length + 1}`,
      description: "Description for this feature.",
      icon: FEATURE_ICONS[0].value
    };
    
    updateWebsiteState({
      features: [...websiteState.features, newFeature]
    });
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...websiteState.features];
    newFeatures.splice(index, 1);
    updateWebsiteState({ features: newFeatures });
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...websiteState.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    updateWebsiteState({ features: newFeatures });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Features Section</h2>
      
      {websiteState.features.map((feature, index) => (
        <div 
          key={index} 
          className="border border-gray-200 rounded-md p-4 mb-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Feature {index + 1}</h3>
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => handleRemoveFeature(index)}
              className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
            >
              <Trash className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor={`feature-title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </Label>
              <Input
                id={`feature-title-${index}`}
                value={feature.title}
                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor={`feature-description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </Label>
              <Textarea
                id={`feature-description-${index}`}
                value={feature.description}
                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor={`feature-icon-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </Label>
              <Select
                value={feature.icon}
                onValueChange={(value) => handleFeatureChange(index, 'icon', value)}
              >
                <SelectTrigger id={`feature-icon-${index}`}>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {FEATURE_ICONS.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}
      
      <Button
        onClick={handleAddFeature}
        className="mt-4 bg-primary text-white hover:bg-primary/90"
      >
        + Add New Feature
      </Button>
    </div>
  );
}
