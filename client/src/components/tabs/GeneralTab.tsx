import { ChangeEvent } from "react";
import { WebsiteState } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { readFileAsDataURL } from "@/lib/utils";

interface GeneralTabProps {
  websiteState: WebsiteState;
  updateWebsiteState: (updates: Partial<WebsiteState>) => void;
}

export default function GeneralTab({ websiteState, updateWebsiteState }: GeneralTabProps) {
  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        updateWebsiteState({ logoImage: dataUrl });
      } catch (error) {
        console.error("Error reading logo file:", error);
        alert("Failed to upload logo. Please try again with a different image.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">General Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
            Business Name
          </Label>
          <Input 
            id="businessName"
            value={websiteState.businessName} 
            onChange={(e) => updateWebsiteState({ businessName: e.target.value })} 
            placeholder="Your Business Name" 
          />
        </div>
        
        <div>
          <Label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
            Headline
          </Label>
          <Input 
            id="headline"
            value={websiteState.headline} 
            onChange={(e) => updateWebsiteState({ headline: e.target.value })} 
            placeholder="Your main headline" 
          />
        </div>
        
        <div>
          <Label htmlFor="subheadline" className="block text-sm font-medium text-gray-700 mb-1">
            Subheadline
          </Label>
          <Input 
            id="subheadline"
            value={websiteState.subheadline} 
            onChange={(e) => updateWebsiteState({ subheadline: e.target.value })} 
            placeholder="Secondary headline or tagline" 
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Logo (optional)
          </Label>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
              {websiteState.logoImage ? (
                <img 
                  src={websiteState.logoImage} 
                  alt="Logo" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div>
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('logo-upload')?.click()}
                className="flex items-center"
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload Logo
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="footerDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Footer Description
          </Label>
          <Textarea 
            id="footerDescription"
            value={websiteState.footerDescription} 
            onChange={(e) => updateWebsiteState({ footerDescription: e.target.value })} 
            placeholder="Brief description for the footer section" 
            rows={3} 
          />
        </div>
      </div>
    </div>
  );
}
