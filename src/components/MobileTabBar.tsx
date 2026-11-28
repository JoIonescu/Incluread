import { Compass, Upload, BookOpen, Activity, User } from "lucide-react";
import type { DashboardTab } from "./SiteHeader";

const TABS: { id: DashboardTab; label: string; icon: typeof Compass }[] = [
  { id: "library", label: "Library", icon: Compass },
  { id: "upload", label: "Documents", icon: Upload },
  { id: "resume", label: "Resume", icon: BookOpen },
  { id: "stats", label: "Stats", icon: Activity },
  { id: "profile", label: "Profile", icon: User },
];

interface MobileTabBarProps {
  /** Tab to highlight (the dashboard passes its current tab; other pages pass nothing) */
  activeTab?: DashboardTab | null;
  onSelect: (tab: DashboardTab) => void;
}

// Bottom navigation bar shown on phones (high-contrast, 44px tap targets).
export default function MobileTabBar({ activeTab = null, onSelect }: MobileTabBarProps) {
  return (
    <nav
      aria-label="Main"
      className="md:hidden bg-white border-t border-[#DCD9D0] px-4 py-2 fixed bottom-0 left-0 right-0 z-40 flex justify-around"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-bold ${
              isActive ? "text-[color:var(--accent-text,#19334A)]" : "text-[#666666]"
            } touch-target`}
          >
            <Icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}