import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Download, X, FileText, FileCode, File, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebsiteState } from "@/lib/constants";
import { generateHTML } from "@/lib/generateHTML";
import { generateCSS, generateJavaScript } from "@/lib/generateCSS";
import { formatFileName } from "@/lib/utils";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  websiteState: WebsiteState;
}

export default function ExportModal({ isOpen, onClose, websiteState }: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);

  // Function to handle website export
  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Generate the HTML, CSS, and JS
      const html = generateHTML(websiteState);
      const css = generateCSS(websiteState);
      const js = generateJavaScript();
      
      // Initialize JSZip
      const zip = new JSZip();
      
      // Add files to the zip
      zip.file("index.html", html);
      
      // Add CSS folder and file
      const cssFolder = zip.folder("css");
      cssFolder?.file("styles.css", css);
      
      // Add JS folder and file
      const jsFolder = zip.folder("js");
      jsFolder?.file("script.js", js);
      
      // Add images folder (empty for now, users would add their own images)
      zip.folder("images");
      
      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      // Create a safe filename
      const filename = websiteState.businessName 
        ? formatFileName(websiteState.businessName) + "-website.zip" 
        : "business-website.zip";
      
      // Save the zip file
      saveAs(zipBlob, filename);
      
      setIsExporting(false);
      onClose();
    } catch (error) {
      console.error("Error exporting website:", error);
      alert("An error occurred while exporting the website. Please try again.");
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Export Website</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            disabled={isExporting}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="mb-4">Your website is ready to be exported. You can download the files as a ZIP package.</p>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">index.html</span>
                </div>
                <span className="text-xs text-gray-500">Main HTML file</span>
              </div>
            </div>
            
            <div className="p-3 bg-gray-100 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileCode className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">css/styles.css</span>
                </div>
                <span className="text-xs text-gray-500">Stylesheet</span>
              </div>
            </div>
            
            <div className="p-3 bg-gray-100 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">js/script.js</span>
                </div>
                <span className="text-xs text-gray-500">JavaScript file</span>
              </div>
            </div>
            
            <div className="p-3 bg-gray-100 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Folder className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">images/</span>
                </div>
                <span className="text-xs text-gray-500">Image folder</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-primary text-white hover:bg-primary/90 flex items-center"
          >
            {isExporting ? (
              <>Generating...</>
            ) : (
              <>
                <Download className="h-5 w-5 mr-1" />
                Download ZIP
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
