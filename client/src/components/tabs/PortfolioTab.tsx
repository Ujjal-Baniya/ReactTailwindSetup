import { ChangeEvent } from "react";
import { WebsiteState } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash, Upload, Image } from "lucide-react";
import { readFileAsDataURL } from "@/lib/utils";

interface PortfolioTabProps {
  websiteState: WebsiteState;
  updateWebsiteState: (updates: Partial<WebsiteState>) => void;
}

export default function PortfolioTab({ websiteState, updateWebsiteState }: PortfolioTabProps) {
  const handleAddPortfolioImage = () => {
    const newImage = {
      title: `Project ${websiteState.portfolioImages.length + 1}`,
      description: "Description of this project.",
      image: null
    };
    
    updateWebsiteState({
      portfolioImages: [...websiteState.portfolioImages, newImage]
    });
  };

  const handleRemovePortfolioImage = (index: number) => {
    const newImages = [...websiteState.portfolioImages];
    newImages.splice(index, 1);
    updateWebsiteState({ portfolioImages: newImages });
  };

  const handlePortfolioChange = (index: number, field: string, value: string) => {
    const newImages = [...websiteState.portfolioImages];
    newImages[index] = { ...newImages[index], [field]: value };
    updateWebsiteState({ portfolioImages: newImages });
  };

  const handleImageUpload = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        const newImages = [...websiteState.portfolioImages];
        newImages[index] = { ...newImages[index], image: dataUrl };
        updateWebsiteState({ portfolioImages: newImages });
      } catch (error) {
        console.error("Error reading portfolio image:", error);
        alert("Failed to upload image. Please try again with a different image.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Portfolio</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {websiteState.portfolioImages.map((item, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-md p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Portfolio Item {index + 1}</h3>
              <Button
                variant="ghost" 
                size="sm"
                onClick={() => handleRemovePortfolioImage(index)}
                className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
              >
                <Trash className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center bg-gray-200 rounded-md h-40 overflow-hidden">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image className="h-12 w-12 text-gray-400" />
                )}
              </div>
              
              <div>
                <input
                  type="file"
                  id={`portfolio-image-${index}`}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(index, e)}
                />
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  onClick={() => document.getElementById(`portfolio-image-${index}`)?.click()}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload Image
                </Button>
              </div>
              
              <div>
                <Label htmlFor={`portfolio-title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </Label>
                <Input
                  id={`portfolio-title-${index}`}
                  value={item.title}
                  onChange={(e) => handlePortfolioChange(index, 'title', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor={`portfolio-description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </Label>
                <Textarea
                  id={`portfolio-description-${index}`}
                  value={item.description}
                  onChange={(e) => handlePortfolioChange(index, 'description', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button
        onClick={handleAddPortfolioImage}
        className="mt-4 bg-primary text-white hover:bg-primary/90"
      >
        + Add Portfolio Item
      </Button>
    </div>
  );
}
