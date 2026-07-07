"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  Layers,
  Search,
  LayoutDashboard,
  Video,
  FileClock,
  Sparkles,
  BarChart3,
  UserCircle,
  GraduationCap,
  MessageSquareText,
  MoreHorizontal,
  Settings,
  LogOut,
  UserCog,
  Sun,
  Moon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sidebarVariants = {
  expanded: { width: "270px" },
  collapsed: { width: "68px" },
};

const transitionProps = {
  type: "spring",
  stiffness: 450,
  damping: 35,
};

export interface SessionNavBarProps {
  activeTab?: string;
  setActiveTab?: (tab: any) => void;
  unreadAlertsCount?: number;
  theme?: "light" | "dark";
  setTheme?: (theme: "light" | "dark") => void;
}

export function SessionNavBar({
  activeTab = "overview",
  setActiveTab = () => {},
  unreadAlertsCount = 0,
  theme,
  setTheme
}: SessionNavBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [localTheme, setLocalTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved as "light" | "dark";
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });

  const currentTheme = theme || localTheme;
  const changeTheme = (newTheme: "light" | "dark") => {
    if (setTheme) {
      setTheme(newTheme);
    } else {
      setLocalTheme(newTheme);
    }
  };

  const isDark = currentTheme === "dark";

  // Handle dark mode side-effects and local storage state persistence
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderSectionTitle = (title: string, isFirst?: boolean) => {
    if (isCollapsed) return <div className="my-2 mx-auto h-px w-5 bg-slate-100 dark:bg-[#1E293B]" />;
    return (
      <div className={cn("px-2.5 select-none", isFirst ? "mt-2 mb-1.5" : "mt-3.5 mb-1.5")}>
        <p className="text-[9.5px] font-bold tracking-[0.15em] text-[#9CA3AF] dark:text-[#6B7280] uppercase font-sans">
          {title}
        </p>
      </div>
    );
  };

  const renderNavItem = (
    tabId: string,
    label: string,
    Icon: React.ElementType,
    extraElement?: React.ReactNode
  ) => {
    const isSelected = activeTab === tabId;
    return (
      <button
        key={tabId}
        onClick={() => handleNav(tabId)}
        title={isCollapsed ? label : undefined}
        className={cn(
          "group relative flex w-full items-center justify-between transition-all duration-150 outline-hidden select-none",
          isCollapsed
            ? "size-[38px] justify-center mx-auto rounded-[14px]"
            : "h-[38px] rounded-[14px] px-3 py-2",
          isSelected
            ? "bg-[#EEF4FF] dark:bg-[#1E293B] text-[#2563EB] dark:text-[#60A5FA] font-semibold"
            : "text-[#6B7280] dark:text-[#CBD5E1] font-medium hover:bg-slate-50 dark:hover:bg-[#1E293B]/65 hover:text-[#111827] dark:hover:text-[#E5E7EB]"
        )}
      >
        <div className={cn("flex min-w-0 items-center gap-2.5", isCollapsed && "justify-center")}>
          <Icon
            className={cn(
              "size-4 shrink-0 transition-colors duration-150 stroke-[1.75]",
              isSelected
                ? "text-[#2563EB] dark:text-[#60A5FA]"
                : "text-[#6B7280] dark:text-[#CBD5E1] group-hover:text-[#111827] dark:group-hover:text-[#E5E7EB]"
            )}
          />
          {!isCollapsed && (
            <span className="truncate text-[13px] tracking-tight text-left leading-none">
              {label}
            </span>
          )}
        </div>
        {!isCollapsed && extraElement && (
          <div className="shrink-0 ml-1.5 flex items-center">
            {extraElement}
          </div>
        )}
        {isCollapsed && tabId === "alerts" && unreadAlertsCount > 0 && (
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#EF4444] ring-1 ring-white dark:ring-[#071224]" />
        )}
      </button>
    );
  };

  return (
    <div 
      className="h-screen sticky top-0 py-5 pl-5 z-40 shrink-0 flex select-none"
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.aside
        className="h-full rounded-[32px] border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#071224] flex flex-col justify-between overflow-hidden font-sans shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-colors duration-200"
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={transitionProps as any}
      >
        {/* Top Section: Header & Navigation */}
        <div className="flex flex-col flex-1 min-h-0 w-full">
          {/* Header (Exact 70px height with traffic lights in expanded mode) */}
          <div className={cn(
            "shrink-0 px-4 bg-white dark:bg-[#071224] border-b border-[#E5E7EB] dark:border-[#1E293B] flex flex-col justify-between transition-colors duration-200",
            isCollapsed ? "py-3.5 gap-2.5" : "h-[70px] pt-3.5 pb-2.5"
          )}>
            {/* Mac Traffic Light Dots */}
            <div className={cn("flex items-center gap-1.5", isCollapsed && "justify-center")}>
              <span className="size-[8px] rounded-full bg-[#FF5F56] opacity-90" />
              <span className="size-[8px] rounded-full bg-[#FFBD2E] opacity-90" />
              <span className="size-[8px] rounded-full bg-[#27C93F] opacity-90" />
            </div>

            {/* Branding & Controls Row */}
            <div className={cn(
              "flex items-center justify-between w-full",
              isCollapsed ? "flex-col gap-2.5" : ""
            )}>
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex size-[26px] shrink-0 items-center justify-center rounded-md bg-[#111827] dark:bg-[#E5E7EB] text-white dark:text-[#111827] shadow-2xs">
                  <Layers className="size-3.5 stroke-[2]" />
                </div>
                {!isCollapsed && (
                  <div className="flex items-baseline gap-1.5 truncate">
                    <span className="text-[13.5px] font-extrabold text-[#111827] dark:text-[#E5E7EB] tracking-tight">
                      VisionAI
                    </span>
                    <span className="text-[9.5px] font-mono font-semibold text-[#9CA3AF] dark:text-[#6B7280]">
                      v2.4
                    </span>
                  </div>
                )}
              </div>

              {isCollapsed ? (
                <div className="flex flex-col items-center gap-2.5">
                  <button className="size-6 rounded-md flex items-center justify-center text-[#9CA3AF] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#111827] dark:hover:text-[#E5E7EB] transition-colors">
                    <Search className="size-3.5 stroke-[2]" />
                  </button>

                  {/* Dark Mode Toggle Switch */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      changeTheme(isDark ? "light" : "dark");
                    }}
                    aria-label="Toggle dark mode"
                    className={cn(
                      "relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-hidden",
                      isDark ? "bg-[#111827] border border-slate-800" : "bg-[#F3F4F6] border border-transparent"
                    )}
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center size-[16px] rounded-full transition-all duration-200 ease-in-out shadow-xs",
                        isDark ? "translate-x-[20px] bg-white text-[#111827]" : "translate-x-[2px] bg-[#111827] text-white"
                      )}
                    >
                      {isDark ? (
                        <Moon className="size-[9px] stroke-[2.5]" />
                      ) : (
                        <Sun className="size-[9px] stroke-[2.5]" />
                      )}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button className="size-6 rounded-md flex items-center justify-center text-[#9CA3AF] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#111827] dark:hover:text-[#E5E7EB] transition-colors">
                    <Search className="size-3.5 stroke-[2]" />
                  </button>

                  {/* Dark Mode Toggle Switch */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      changeTheme(isDark ? "light" : "dark");
                    }}
                    aria-label="Toggle dark mode"
                    className={cn(
                      "relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-hidden",
                      isDark ? "bg-[#111827] border border-slate-800" : "bg-[#F3F4F6] border border-transparent"
                    )}
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center size-[16px] rounded-full transition-all duration-200 ease-in-out shadow-xs",
                        isDark ? "translate-x-[20px] bg-white text-[#111827]" : "translate-x-[2px] bg-[#111827] text-white"
                      )}
                    >
                      {isDark ? (
                        <Moon className="size-[9px] stroke-[2.5]" />
                      ) : (
                        <Sun className="size-[9px] stroke-[2.5]" />
                      )}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Navigation List */}
          <ScrollArea className="flex-1 min-h-0 w-full px-3 py-2">
            <div className="flex flex-col space-y-0.5 pb-2">
              {/* Main Section */}
              {renderSectionTitle("DASHBOARD", true)}
              {renderNavItem("overview", "Overview", LayoutDashboard)}
              {renderNavItem("live", "Live Vision Feeds", Video)}
              {renderNavItem("attendance", "Attendance Reports", FileClock)}

              {/* AI Copilot Section */}
              {renderSectionTitle("INTELLIGENCE")}
              {renderNavItem(
                "behaviour",
                "AI Copilot Chat",
                Sparkles,
                <span className="inline-flex h-4 items-center justify-center rounded-full bg-[#EDE9FE] dark:bg-[#2E1065] px-1.5 font-mono text-[9px] font-bold text-[#7C3AED] dark:text-[#D8B4FE]">
                  BETA
                </span>
              )}

              {/* Management Section */}
              {renderSectionTitle("MANAGEMENT")}
              {renderNavItem("analytics", "Analytics & Trends", BarChart3)}
              {renderNavItem("users", "User Accounts", UserCircle)}
              {renderNavItem("classes", "Course Modules", GraduationCap)}

              {/* System Section */}
              {renderSectionTitle("SYSTEM")}
              {renderNavItem(
                "alerts",
                "System Alerts",
                MessageSquareText,
                unreadAlertsCount > 0 ? (
                  <span className="flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white shadow-2xs">
                    {unreadAlertsCount}
                  </span>
                ) : null
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Bottom Section: Floating Profile Card (Height ~54px) */}
        <div className="shrink-0 p-3 bg-white dark:bg-[#071224] w-full border-t border-[#E5E7EB] dark:border-[#1E293B] transition-colors duration-200">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="w-full focus:outline-hidden" asChild>
              <button
                className={cn(
                  "group relative flex w-full items-center justify-between rounded-[18px] border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] transition-all duration-150 hover:border-gray-300 dark:hover:border-slate-500 hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] text-left shadow-[0_2px_8px_rgba(0,0,0,0.02)]",
                  isCollapsed ? "size-[38px] justify-center p-0 border-none shadow-none mx-auto" : "h-[54px] px-2.5 py-1.5"
                )}
              >
                <div className={cn("flex items-center gap-2 min-w-0", isCollapsed && "justify-center")}>
                  <Avatar className="size-[32px] shrink-0 rounded-full ring-1 ring-[#E5E7EB] dark:ring-[#1E293B]">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      alt="Dr. Aileen Pavey"
                    />
                    <AvatarFallback className="bg-[#2563EB] text-[10px] font-bold text-white">
                      AP
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="truncate pr-1">
                      <p className="text-[12.5px] font-semibold text-[#111827] dark:text-[#CBD5E1] leading-tight truncate">
                        Dr. Aileen Pavey
                      </p>
                      <p className="text-[10px] font-mono text-[#6B7280] dark:text-[#9CA3AF] leading-tight truncate mt-0.5">
                        admin@univ.edu
                      </p>
                    </div>
                  )}
                </div>
                {!isCollapsed && (
                  <MoreHorizontal className="size-3.5 shrink-0 text-[#9CA3AF] group-hover:text-[#111827] dark:group-hover:text-[#CBD5E1] transition-colors" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" sideOffset={12} className="z-50 w-60 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] p-2 shadow-xl font-sans">
              <div className="flex items-center gap-2.5 p-2 mb-1 bg-[#F8FAFC] dark:bg-[#0F172A]/50 rounded-xl">
                <Avatar className="size-9 shrink-0 rounded-full">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" />
                  <AvatarFallback className="bg-[#2563EB] text-xs font-bold text-white">AP</AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                  <span className="text-[13px] font-bold text-[#111827] dark:text-[#E5E7EB]">Dr. Aileen Pavey</span>
                  <span className="font-mono text-[11px] text-[#6B7280] dark:text-[#9CA3AF] truncate">admin@univ.edu</span>
                </div>
              </div>
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-[#111827] dark:text-[#E5E7EB] hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]/50">
                <UserCog className="size-4 text-[#6B7280] dark:text-[#9CA3AF]" /> Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-[#111827] dark:text-[#E5E7EB] hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]/50">
                <Settings className="size-4 text-[#6B7280] dark:text-[#9CA3AF]" /> Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 bg-[#F1F5F9] dark:bg-[#334155]" />
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#FEF2F2]/10">
                <LogOut className="size-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.aside>
    </div>
  );
}
