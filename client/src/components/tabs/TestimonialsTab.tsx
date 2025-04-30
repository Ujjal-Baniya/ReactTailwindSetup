import { ChangeEvent } from "react";
import { WebsiteState } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash, Upload, User } from "lucide-react";
import { readFileAsDataURL } from "@/lib/utils";

interface TestimonialsTabProps {
  websiteState: WebsiteState;
  updateWebsiteState: (updates: Partial<WebsiteState>) => void;
}

export default function TestimonialsTab({ websiteState, updateWebsiteState }: TestimonialsTabProps) {
  const handleAddTestimonial = () => {
    const newTestimonial = {
      name: `Client Name`,
      role: "Role / Company",
      text: "This is a testimonial about your product or service.",
      image: null
    };
    
    updateWebsiteState({
      testimonials: [...websiteState.testimonials, newTestimonial]
    });
  };

  const handleRemoveTestimonial = (index: number) => {
    const newTestimonials = [...websiteState.testimonials];
    newTestimonials.splice(index, 1);
    updateWebsiteState({ testimonials: newTestimonials });
  };

  const handleTestimonialChange = (index: number, field: string, value: string) => {
    const newTestimonials = [...websiteState.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    updateWebsiteState({ testimonials: newTestimonials });
  };

  const handleImageUpload = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        const newTestimonials = [...websiteState.testimonials];
        newTestimonials[index] = { ...newTestimonials[index], image: dataUrl };
        updateWebsiteState({ testimonials: newTestimonials });
      } catch (error) {
        console.error("Error reading testimonial image:", error);
        alert("Failed to upload image. Please try again with a different image.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Testimonials</h2>
      
      {websiteState.testimonials.map((testimonial, index) => (
        <div 
          key={index} 
          className="border border-gray-200 rounded-md p-4 mb-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Testimonial {index + 1}</h3>
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => handleRemoveTestimonial(index)}
              className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
            >
              <Trash className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  id={`testimonial-image-${index}`}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(index, e)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById(`testimonial-image-${index}`)?.click()}
                  className="flex items-center"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload Photo
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor={`testimonial-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </Label>
              <Input
                id={`testimonial-name-${index}`}
                value={testimonial.name}
                onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor={`testimonial-role-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                Role/Company
              </Label>
              <Input
                id={`testimonial-role-${index}`}
                value={testimonial.role}
                onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor={`testimonial-text-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                Testimonial
              </Label>
              <Textarea
                id={`testimonial-text-${index}`}
                value={testimonial.text}
                onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>
      ))}
      
      <Button
        onClick={handleAddTestimonial}
        className="mt-4 bg-primary text-white hover:bg-primary/90"
      >
        + Add New Testimonial
      </Button>
    </div>
  );
}
