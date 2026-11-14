"use client";
import Image from "next/image";
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  Tag,
  Newspaper,
  Settings,
  LogOut,
  ChevronRight,
  FileText,
  Handshake,
  FileSpreadsheet,
  Package, // <-- Added
} from "lucide-react";

export type AdminTab =
  | "dashboard"
  | "services"
  | "forms"
  | "quotes"
  | "partners"
  | "offers"
  | "rates"
  | "bookings" // <-- Added
  | "blogs"
  | "settings";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onLogout: () => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  onLogout,
}: AdminSidebarProps) {
  const navItems = [
    { id: "dashboard" as AdminTab, label: "Dashboard", icon: LayoutDashboard },
    { id: "services" as AdminTab, label: "Services", icon: Boxes },
    { id: "forms" as AdminTab, label: "Forms", icon: ClipboardList },
    { id: "quotes" as AdminTab, label: "Quotes", icon: FileText },
    { id: "bookings" as AdminTab, label: "Bookings", icon: Package }, // <-- Added
    { id: "partners" as AdminTab, label: "Partners", icon: Handshake },
    { id: "offers" as AdminTab, label: "Offers", icon: Tag },
    { id: "rates" as AdminTab, label: "Rate Sheet", icon: FileSpreadsheet },
    { id: "blogs" as AdminTab, label: "Blogs", icon: Newspaper },
    { id: "settings" as AdminTab, label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-72 bg-[#0b2f3a] text-white flex flex-col h-screen sticky top-0 shrink-0 border-r border-[#14434f] shadow-2xl select-none z-30">
      <div className="p-6 border-b border-[#14434f]/80 flex items-center gap-3 bg-[#08242c]">
        <div className="w-10 h-10 rounded-xl bg-white p-2 flex items-center justify-center shadow-md shrink-0">
          <Image
            src="/images/logo-icon.svg"
            alt="DCW"
            width={26}
            height={26}
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-xl font-black text-white tracking-tight">
          DCW Admin
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="px-3 mb-2 text-[10px] font-black tracking-widest text-[#d5dcdb]/40 uppercase">
          Menu
        </div>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                type="button"
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group text-left ${
                  isActive
                    ? "bg-[#f05a28] text-white shadow-lg shadow-[#f05a28]/20 font-semibold translate-x-1"
                    : "text-[#d5dcdb] hover:bg-[#14434f] hover:text-white hover:translate-x-1"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={`transition-transform duration-200 ${
                      isActive
                        ? "text-white scale-105"
                        : "text-[#ffd100] group-hover:scale-110"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                <ChevronRight
                  size={14}
                  className={`transition-all duration-200 ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[#14434f]/80 bg-[#08242c]/90">
        <button
          onClick={onLogout}
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/30 text-red-300 hover:text-white hover:bg-red-600 hover:border-red-600 font-semibold text-xs tracking-wide transition-all duration-200 shadow-sm hover:shadow-red-600/20 active:scale-[0.99]"
        >
          <LogOut size={15} />
          <span>Terminate Session (Logout)</span>
        </button>
      </div>
    </aside>
  );
}
