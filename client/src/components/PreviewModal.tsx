import { useState, useEffect, useRef } from "react";
import { Smartphone, Tablet, Monitor, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateHTML } from "@/lib/generateHTML";
import { generateCSS } from "@/lib/generateCSS";
import { WebsiteState } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  websiteState: WebsiteState;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  onExport: () => void;
}

export default function PreviewModal({
  isOpen,
  onClose,
  websiteState,
  previewDevice,
  setPreviewDevice,
  onExport
}: PreviewModalProps) {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      const generatedHtml = generateHTML(websiteState);
      const generatedCss = generateCSS(websiteState);
      
      setHtml(generatedHtml);
      setCss(generatedCss);
      
      // Apply content to the iframe
      const iframe = iframeRef.current;
      if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(generatedHtml);
          
          // Add the CSS
          const style = iframeDoc.createElement('style');
          style.innerHTML = generatedCss;
          iframeDoc.head.appendChild(style);
          
          iframeDoc.close();
        }
      }
    }
  }, [isOpen, websiteState]);
  
  const getPreviewWidth = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'max-w-full';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Website Preview</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden p-4">
          <div className={cn("w-full h-full overflow-auto border border-gray-300 rounded-md transition-all duration-300", getPreviewWidth())}>
            <iframe 
              ref={iframeRef}
              className="w-full h-full"
              title="Website Preview"
            />
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-between">
          <div className="flex space-x-2">
            <Button
              variant={previewDevice === 'mobile' ? 'default' : 'outline'}
              onClick={() => setPreviewDevice('mobile')}
              className="flex items-center"
            >
              <Smartphone className="h-4 w-4 mr-1" />
              Mobile
            </Button>
            <Button
              variant={previewDevice === 'tablet' ? 'default' : 'outline'}
              onClick={() => setPreviewDevice('tablet')}
              className="flex items-center"
            >
              <Tablet className="h-4 w-4 mr-1" />
              Tablet
            </Button>
            <Button
              variant={previewDevice === 'desktop' ? 'default' : 'outline'}
              onClick={() => setPreviewDevice('desktop')}
              className="flex items-center"
            >
              <Monitor className="h-4 w-4 mr-1" />
              Desktop
            </Button>
          </div>
          <Button
            onClick={onExport}
            className="bg-secondary text-white hover:bg-secondary/90 flex items-center"
          >
            <Download className="h-4 w-4 mr-1" />
            Export Code
          </Button>
        </div>
      </div>
    </div>
  );
}
