import { COLOR_THEMES, ColorTheme, WebsiteState } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckIcon } from "lucide-react";

interface DesignTabProps {
  websiteState: WebsiteState;
  updateWebsiteState: (updates: Partial<WebsiteState>) => void;
}

export default function DesignTab({ websiteState, updateWebsiteState }: DesignTabProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Design & Theme</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Color Theme</h3>
          <RadioGroup
            value={websiteState.colorTheme}
            onValueChange={(value) => updateWebsiteState({ colorTheme: value as ColorTheme })}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {Object.entries(COLOR_THEMES).map(([key, theme]) => (
              <div key={key} className="relative">
                <RadioGroupItem 
                  value={key} 
                  id={`theme-${key}`} 
                  className="sr-only"
                />
                <Label
                  htmlFor={`theme-${key}`}
                  className="relative border border-gray-200 rounded-md p-3 cursor-pointer hover:border-primary block"
                >
                  <div className="flex flex-col">
                    <span className="font-medium mb-2">{theme.name}</span>
                    <div className="flex space-x-2">
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: theme.secondary }}
                      />
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: theme.accent }}
                      />
                    </div>
                  </div>
                  {websiteState.colorTheme === key && (
                    <div className="absolute top-2 right-2 text-primary">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Custom CSS (Advanced)</h3>
          <div className="mb-2">
            <Textarea
              value={websiteState.customCSS}
              onChange={(e) => updateWebsiteState({ customCSS: e.target.value })}
              placeholder="/* Add your custom CSS here */"
              className="font-mono text-sm"
              rows={6}
            />
          </div>
          <p className="text-sm text-gray-600">Add custom CSS to further customize your website design.</p>
        </div>
      </div>
    </div>
  );
}
