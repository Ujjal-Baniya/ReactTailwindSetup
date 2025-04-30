import { Save, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
}

export default function AppHeader({ onSave, onLoad, onExport }: AppHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Business Website Builder</h1>
        <div className="flex space-x-3">
          <Button 
            onClick={onLoad} 
            variant="outline" 
            className="flex items-center"
          >
            <Upload className="h-5 w-5 mr-1" />
            Load
          </Button>
          <Button 
            onClick={onSave} 
            className="bg-primary text-white flex items-center hover:bg-primary/90"
          >
            <Save className="h-5 w-5 mr-1" />
            Save Project
          </Button>
          <Button 
            onClick={onExport} 
            className="bg-secondary text-white flex items-center hover:bg-secondary/90"
          >
            <Download className="h-5 w-5 mr-1" />
            Export Code
          </Button>
        </div>
      </div>
    </header>
  );
}
