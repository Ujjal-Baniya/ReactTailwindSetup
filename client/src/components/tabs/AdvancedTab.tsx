import { WebsiteState } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface AdvancedTabProps {
  websiteState: WebsiteState;
  updateWebsiteState: (updates: Partial<WebsiteState>) => void;
}

export default function AdvancedTab({ websiteState, updateWebsiteState }: AdvancedTabProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Advanced Options</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Meta Information</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </Label>
              <Textarea 
                id="metaDescription"
                value={websiteState.metaDescription} 
                onChange={(e) => updateWebsiteState({ metaDescription: e.target.value })} 
                placeholder="Brief description of your business for search engines" 
                rows={2} 
              />
            </div>
            
            <div>
              <Label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 mb-1">
                Meta Keywords
              </Label>
              <Input 
                id="metaKeywords"
                value={websiteState.metaKeywords} 
                onChange={(e) => updateWebsiteState({ metaKeywords: e.target.value })} 
                placeholder="keyword1, keyword2, keyword3" 
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Custom Scripts</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="headScripts" className="block text-sm font-medium text-gray-700 mb-1">
                Head Scripts
              </Label>
              <Textarea 
                id="headScripts"
                value={websiteState.headScripts} 
                onChange={(e) => updateWebsiteState({ headScripts: e.target.value })} 
                placeholder="<!-- Scripts to be added to the head section -->" 
                className="font-mono text-sm"
                rows={3} 
              />
            </div>
            
            <div>
              <Label htmlFor="bodyScripts" className="block text-sm font-medium text-gray-700 mb-1">
                Body Scripts (End)
              </Label>
              <Textarea 
                id="bodyScripts"
                value={websiteState.bodyScripts} 
                onChange={(e) => updateWebsiteState({ bodyScripts: e.target.value })} 
                placeholder="<!-- Scripts to be added before </body> -->" 
                className="font-mono text-sm"
                rows={3} 
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Add analytics, tracking, or other custom scripts to your website.</p>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Export Options</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Switch 
                id="includeSourceFiles"
                checked={websiteState.includeSourceFiles} 
                onCheckedChange={(checked) => updateWebsiteState({ includeSourceFiles: checked })} 
                className="mr-2"
              />
              <Label htmlFor="includeSourceFiles" className="text-sm text-gray-700">
                Include source files in export
              </Label>
            </div>
            
            <div className="flex items-center">
              <Switch 
                id="minifyOutput"
                checked={websiteState.minifyOutput} 
                onCheckedChange={(checked) => updateWebsiteState({ minifyOutput: checked })} 
                className="mr-2"
              />
              <Label htmlFor="minifyOutput" className="text-sm text-gray-700">
                Minify HTML/CSS output
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
