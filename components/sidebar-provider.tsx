"use client";

import { createContext, useContext, useEffect, useState } from "react";

type SidebarContextValue = { isOpen: boolean; toggle: () => void };
const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((open) => !open);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 720px)");
    const syncToViewport = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsOpen(!event.matches);
    };

    syncToViewport(mobileQuery);
    mobileQuery.addEventListener("change", syncToViewport);
    return () => mobileQuery.removeEventListener("change", syncToViewport);
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      <div className={`site-layout${isOpen ? "" : " sidebar-collapsed"}`}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used inside SidebarProvider");
  return context;
}
