import { ChangeEvent } from "react";
import { WebsiteState, SOCIAL_PLATFORMS } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash, Upload, Image } from "lucide-react";
import { readFileAsDataURL } from "@/lib/utils";

interface ContactTabProps {
  websiteState: WebsiteState;
  updateWebsiteState: (updates: Partial<WebsiteState>) => void;
}

export default function ContactTab({ websiteState, updateWebsiteState }: ContactTabProps) {
  const handleSocialLinkChange = (index: number, value: string) => {
    const newSocialLinks = [...websiteState.socialLinks];
    newSocialLinks[index] = { 
      ...newSocialLinks[index], 
      url: value 
    };
    updateWebsiteState({ socialLinks: newSocialLinks });
  };

  const handleAddPartnerLogo = () => {
    const newLogo = {
      name: `Partner ${websiteState.partnerLogos.length + 1}`,
      image: null
    };
    
    updateWebsiteState({
      partnerLogos: [...websiteState.partnerLogos, newLogo]
    });
  };

  const handleRemovePartnerLogo = (index: number) => {
    const newLogos = [...websiteState.partnerLogos];
    newLogos.splice(index, 1);
    updateWebsiteState({ partnerLogos: newLogos });
  };

  const handlePartnerLogoChange = (index: number, field: string, value: string) => {
    const newLogos = [...websiteState.partnerLogos];
    newLogos[index] = { ...newLogos[index], [field]: value };
    updateWebsiteState({ partnerLogos: newLogos });
  };

  const handleLogoUpload = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        const newLogos = [...websiteState.partnerLogos];
        newLogos[index] = { ...newLogos[index], image: dataUrl };
        updateWebsiteState({ partnerLogos: newLogos });
      } catch (error) {
        console.error("Error reading partner logo:", error);
        alert("Failed to upload logo. Please try again with a different image.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </Label>
          <Input 
            id="email"
            type="email"
            value={websiteState.email} 
            onChange={(e) => updateWebsiteState({ email: e.target.value })} 
            placeholder="contact@yourbusiness.com" 
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (optional)
          </Label>
          <Input 
            id="phone"
            type="tel"
            value={websiteState.phone} 
            onChange={(e) => updateWebsiteState({ phone: e.target.value })} 
            placeholder="(123) 456-7890" 
          />
        </div>
        
        <div>
          <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Business Address (optional)
          </Label>
          <Input 
            id="address"
            value={websiteState.address} 
            onChange={(e) => updateWebsiteState({ address: e.target.value })} 
            placeholder="123 Business St, City, State" 
          />
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Social Media Links</h3>
          
          {SOCIAL_PLATFORMS.map((platform, index) => {
            const socialLink = websiteState.socialLinks[index] || { 
              platform: platform.name,
              icon: platform.icon,
              url: '' 
            };
            
            return (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                  <platform.component className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`social-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    {platform.name}
                  </Label>
                  <Input 
                    id={`social-${index}`}
                    type="url"
                    value={socialLink.url} 
                    onChange={(e) => handleSocialLinkChange(index, e.target.value)} 
                    placeholder={`https://${platform.name.toLowerCase()}.com/yourbusiness`} 
                    className="text-sm"
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Contact Form</h3>
          <div className="flex items-center mb-4">
            <Switch 
              id="contactForm"
              checked={websiteState.contactFormEnabled} 
              onCheckedChange={(checked) => updateWebsiteState({ contactFormEnabled: checked })} 
              className="mr-2"
            />
            <Label htmlFor="contactForm" className="text-sm text-gray-700">
              Enable contact form on website
            </Label>
          </div>
          <p className="text-sm text-gray-600">When disabled, a newsletter subscription form will be shown instead.</p>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Partner Logos (optional)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {websiteState.partnerLogos.map((logo, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-sm">Partner {index + 1}</h4>
                  <Button
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemovePartnerLogo(index)}
                    className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center bg-gray-200 rounded-md h-24 overflow-hidden">
                    {logo.image ? (
                      <img 
                        src={logo.image} 
                        alt={logo.name} 
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <Image className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                  
                  <div>
                    <input
                      type="file"
                      id={`partner-logo-${index}`}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleLogoUpload(index, e)}
                    />
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center"
                      onClick={() => document.getElementById(`partner-logo-${index}`)?.click()}
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Logo
                    </Button>
                  </div>
                  
                  <div>
                    <Label htmlFor={`partner-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Partner Name
                    </Label>
                    <Input
                      id={`partner-name-${index}`}
                      value={logo.name}
                      onChange={(e) => handlePartnerLogoChange(index, 'name', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            onClick={handleAddPartnerLogo}
            className="bg-primary text-white hover:bg-primary/90 text-sm"
          >
            + Add Partner Logo
          </Button>
        </div>
      </div>
    </div>
  );
}
