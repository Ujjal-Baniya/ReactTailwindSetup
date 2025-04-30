import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import TabContent from "@/components/TabContent";
import PreviewModal from "@/components/PreviewModal";
import ExportModal from "@/components/ExportModal";
import { DEFAULT_STATE, WebsiteState, TABS } from "@/lib/constants";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].id);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [websiteState, setWebsiteState] = useState<WebsiteState>(DEFAULT_STATE);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Handle saving project
  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('websiteState', JSON.stringify(websiteState));
    alert('Project saved successfully!');
  };

  // Handle loading project
  const handleLoad = () => {
    const savedState = localStorage.getItem('websiteState');
    if (savedState) {
      try {
        setWebsiteState(JSON.parse(savedState));
        alert('Project loaded successfully!');
      } catch (error) {
        console.error('Error loading project:', error);
        alert('Failed to load project. The saved data may be corrupted.');
      }
    } else {
      alert('No saved project found.');
    }
  };

  // Handle preview
  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  // Handle export
  const handleExport = () => {
    setIsExportOpen(true);
  };

  // Update site data
  const updateWebsiteState = (updates: Partial<WebsiteState>) => {
    setWebsiteState(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader 
        onSave={handleSave}
        onLoad={handleLoad}
        onExport={handleExport}
      />

      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onPreview={handlePreview}
        />

        <main className="flex-1 p-4">
          <TabContent 
            activeTab={activeTab}
            websiteState={websiteState}
            updateWebsiteState={updateWebsiteState}
          />
        </main>
      </div>

      {isPreviewOpen && (
        <PreviewModal 
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          websiteState={websiteState}
          previewDevice={previewDevice}
          setPreviewDevice={setPreviewDevice}
          onExport={handleExport}
        />
      )}

      {isExportOpen && (
        <ExportModal 
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)} 
          websiteState={websiteState}
        />
      )}
    </div>
  );
}
