import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TABS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  onPreview: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onPreview }: SidebarProps) {
  return (
    <aside className="w-full md:w-64 bg-white shadow-md md:h-screen md:sticky top-0">
      <nav className="p-4">
        <ul className="space-y-1">
          {TABS.map((tab) => (
            <li key={tab.id}>
              <button
                className={cn(
                  "w-full text-left px-4 py-2 rounded-md font-medium",
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={onPreview}
          className="w-full bg-accent text-textDark hover:bg-accent/90 flex items-center justify-center font-medium"
        >
          <Eye className="h-5 w-5 mr-1" />
          Preview Website
        </Button>
      </div>
    </aside>
  );
}
