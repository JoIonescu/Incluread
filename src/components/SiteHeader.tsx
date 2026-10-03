import { useEffect, useState } from "react";
import { Compass, Upload, BookOpen, Activity, User, Sliders } from "lucide-react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../lib/firebase";
import NaraLogo from "./NaraLogo";

export type DashboardTab = "library" | "upload" | "resume" | "stats" | "profile" | "settings";

interface SiteHeaderProps {
  onOpenTab: (tab: DashboardTab) => void;
}

const TABS: { id: DashboardTab; label: string; icon: typeof Compass }[] = [
  { id: "library", label: "Library", icon: Compass },
  { id: "upload", label: "My Documents", icon: Upload },
  { id: "resume", label: "Continue Reading", icon: BookOpen },
  { id: "stats", label: "Reading Stats", icon: Activity },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Sliders },
];

// Same beta banner + top navigation bar as the dashboard, used on public pages (/about).
// Clicking a tab opens that tab in the dashboard.
export default function SiteHeader({ onOpenTab }: SiteHeaderProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    try {
      unsubscribe = onAuthStateChanged(auth, (usr) => setCurrentUser(usr));
    } catch (err) {
      console.warn("Firebase auth listener could not be established:", err);
    }
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  return (
    <>
      {/* Beta Banner */}
      <div className="w-full bg-[#1a1a2e] text-center py-2 px-4 text-[11px] font-semibold text-gray-300 flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00A795] animate-pulse flex-shrink-0" />
        Incluread is in beta — we're actively improving. Your feedback shapes what comes next.{" "}
        <a href="mailto:hello@incluread.click" className="underline text-[#00A795] hover:text-white transition-colors">Share feedback →</a>
      </div>

      <nav className="h-16 border-b px-8 flex items-center justify-between backdrop-blur-sm shadow-xs sticky top-0 z-40 bg-white/50 border-[#DCD9D0] text-[#111111] font-sans">
        <NaraLogo showText={true} size="lg" className="hidden md:flex" /><NaraLogo showText={true} size="sm" className="flex md:hidden" />

        <div className="hidden md:flex gap-8">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onOpenTab(tab.id)}
                className="text-xs font-black uppercase flex items-center gap-1.5 pb-1 border-b-2 transition-colors touch-target border-transparent text-[#444444] hover:text-[#5B8FB9]"
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile-only profile icon */}
        <button
          className="flex md:hidden items-center justify-center w-9 h-9 rounded-full bg-[#5B8FB9]/10 border border-[#5B8FB9]/20"
          onClick={() => onOpenTab("profile")}
          aria-label="Profile"
        >
          {currentUser ? (
            <span className="text-[10px] font-black text-[#5B8FB9]">
              {currentUser.email?.substring(0, 2).toUpperCase() || "U"}
            </span>
          ) : (
            <User className="w-4 h-4 text-[#5B8FB9]" />
          )}
        </button>

        <div className="hidden md:flex items-center gap-2 font-sans">
          {currentUser ? (
            <button
              onClick={() => onOpenTab("profile")}
              className="px-3 h-10 rounded-full bg-[#5B8FB9]/10 text-[#3D729E] border border-[#5B8FB9]/20 flex items-center gap-2 hover:bg-[#5B8FB9]/20 transition-all cursor-pointer touch-target"
              aria-label="View user profile"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#3D729E] to-[#6FA6CD] text-white flex items-center justify-center text-[10px] font-black">
                {currentUser.email ? currentUser.email.substring(0, 2).toUpperCase() : "U"}
              </div>
              <span className="text-xs font-bold truncate max-w-[120px]">{currentUser.email}</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenTab("profile")}
              className="px-4 h-10 rounded-full bg-[#5B8FB9] hover:bg-[#4C7C9E] text-white font-black text-xs transition-all cursor-pointer shadow-xs touch-target"
              aria-label="Register or sign in"
            >
              Register or sign in
            </button>
          )}
        </div>
      </nav>
    </>
  );
}