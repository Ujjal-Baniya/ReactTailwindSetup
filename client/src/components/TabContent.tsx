import { WebsiteState } from "@/lib/constants";
import GeneralTab from "@/components/tabs/GeneralTab";
import FeaturesTab from "@/components/tabs/FeaturesTab";
import TestimonialsTab from "@/components/tabs/TestimonialsTab";
import PortfolioTab from "@/components/tabs/PortfolioTab";
import ContactTab from "@/components/tabs/ContactTab";
import DesignTab from "@/components/tabs/DesignTab";
import AdvancedTab from "@/components/tabs/AdvancedTab";

interface TabContentProps {
  activeTab: string;
  websiteState: WebsiteState;
  updateWebsiteState: (updates: Partial<WebsiteState>) => void;
}

export default function TabContent({
  activeTab,
  websiteState,
  updateWebsiteState,
}: TabContentProps) {
  return (
    <div className="space-y-6">
      {activeTab === "general" && (
        <GeneralTab 
          websiteState={websiteState} 
          updateWebsiteState={updateWebsiteState} 
        />
      )}
      
      {activeTab === "features" && (
        <FeaturesTab 
          websiteState={websiteState} 
          updateWebsiteState={updateWebsiteState} 
        />
      )}
      
      {activeTab === "testimonials" && (
        <TestimonialsTab 
          websiteState={websiteState} 
          updateWebsiteState={updateWebsiteState} 
        />
      )}
      
      {activeTab === "portfolio" && (
        <PortfolioTab 
          websiteState={websiteState} 
          updateWebsiteState={updateWebsiteState} 
        />
      )}
      
      {activeTab === "contact" && (
        <ContactTab 
          websiteState={websiteState} 
          updateWebsiteState={updateWebsiteState} 
        />
      )}
      
      {activeTab === "design" && (
        <DesignTab 
          websiteState={websiteState} 
          updateWebsiteState={updateWebsiteState} 
        />
      )}
      
      {activeTab === "advanced" && (
        <AdvancedTab 
          websiteState={websiteState} 
          updateWebsiteState={updateWebsiteState} 
        />
      )}
    </div>
  );
}
