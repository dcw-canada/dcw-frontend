"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar, { AdminTab } from "../../components/AdminSidebar";
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  Tag,
  Newspaper,
  Settings,
  Plus,
  RefreshCw,
  FolderOpen,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  // Auth guard – redirect if not logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("adminAuth");
      if (!auth) router.replace("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("adminAuth");
    router.replace("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-[#eef1f0] text-[#0b2f3a] font-sans antialiased overflow-hidden">
      {/* 1. Permanent Full-Height Sidebar on Left */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Canvas on Right (Always stays /admin) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-20 bg-white border-b border-[#d5dcdb] px-8 flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28] bg-[#f05a28]/10 px-2.5 py-1 rounded-md">
              DCW System
            </span>
            <h1 className="text-xl font-black text-[#0b2f3a] tracking-tight capitalize">
              {activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#1f8a5b]/10 text-[#1f8a5b] border border-[#1f8a5b]/20">
              <span className="w-2 h-2 rounded-full bg-[#1f8a5b] animate-pulse"></span>
              Admin Session Active
            </span>
          </div>
        </header>

        {/* Scrollable Right Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* -------------------- 1. DASHBOARD -------------------- */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm">
                  <div className="flex items-center justify-between pb-6 border-b border-[#d5dcdb]">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#0b2f3a] text-white rounded-xl shadow-sm">
                        <LayoutDashboard size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-[#0b2f3a]">Dashboard</h2>
                        <p className="text-xs text-[#51626a] mt-0.5">Overview of website activities and administrative tools</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#eef1f0] text-[#51626a] flex items-center justify-center mb-4 border border-[#d5dcdb]">
                      <FolderOpen size={30} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b2f3a]">Dashboard Content Area</h3>
                    <p className="text-sm text-[#51626a] mt-1 max-w-md">
                      This page is ready for your dashboard widgets, analytics graphs, and performance metrics.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- 2. SERVICES -------------------- */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm">
                  <div className="flex items-center justify-between pb-6 border-b border-[#d5dcdb]">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#0b2f3a] text-white rounded-xl shadow-sm">
                        <Boxes size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-[#0b2f3a]">Services</h2>
                        <p className="text-xs text-[#51626a] mt-0.5">Manage services offered on the platform</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="bg-[#f05a28] hover:bg-[#c2410c] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2"
                    >
                      <Plus size={15} /> Add Service
                    </button>
                  </div>

                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#eef1f0] text-[#51626a] flex items-center justify-center mb-4 border border-[#d5dcdb]">
                      <Boxes size={30} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b2f3a]">Services Management</h3>
                    <p className="text-sm text-[#51626a] mt-1 max-w-md">
                      Manage, edit, and organize all logistics and warehousing services listed on your website.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- 3. FORMS -------------------- */}
            {activeTab === "forms" && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm">
                  <div className="flex items-center justify-between pb-6 border-b border-[#d5dcdb]">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#0b2f3a] text-white rounded-xl shadow-sm">
                        <ClipboardList size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-[#0b2f3a]">Forms</h2>
                        <p className="text-xs text-[#51626a] mt-0.5">Form submissions, contact inquiries, and quote requests</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#eef1f0] text-[#51626a] flex items-center justify-center mb-4 border border-[#d5dcdb]">
                      <ClipboardList size={30} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b2f3a]">Form Submissions & Records</h3>
                    <p className="text-sm text-[#51626a] mt-1 max-w-md">
                      Submissions from contact forms, cost estimator inquiries, and customer feedback will be managed here.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- 4. OFFERS -------------------- */}
            {activeTab === "offers" && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm">
                  <div className="flex items-center justify-between pb-6 border-b border-[#d5dcdb]">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#0b2f3a] text-white rounded-xl shadow-sm">
                        <Tag size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-[#0b2f3a]">Offers</h2>
                        <p className="text-xs text-[#51626a] mt-0.5">Promotions, special freight rates, and seasonal discounts</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="bg-[#f05a28] hover:bg-[#c2410c] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2"
                    >
                      <Plus size={15} /> Create Offer
                    </button>
                  </div>

                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#eef1f0] text-[#51626a] flex items-center justify-center mb-4 border border-[#d5dcdb]">
                      <Tag size={30} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b2f3a]">Promotional Offers</h3>
                    <p className="text-sm text-[#51626a] mt-1 max-w-md">
                      Configure custom discount banners, seasonal specials, or customized freight deals.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- 5. BLOGS -------------------- */}
            {activeTab === "blogs" && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm">
                  <div className="flex items-center justify-between pb-6 border-b border-[#d5dcdb]">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#0b2f3a] text-white rounded-xl shadow-sm">
                        <Newspaper size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-[#0b2f3a]">Blogs</h2>
                        <p className="text-xs text-[#51626a] mt-0.5">Manage articles, shipping updates, and industry insights</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="bg-[#f05a28] hover:bg-[#c2410c] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2"
                    >
                      <Plus size={15} /> Write New Article
                    </button>
                  </div>

                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#eef1f0] text-[#51626a] flex items-center justify-center mb-4 border border-[#d5dcdb]">
                      <Newspaper size={30} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b2f3a]">Blog Posts & Articles</h3>
                    <p className="text-sm text-[#51626a] mt-1 max-w-md">
                      Draft, publish, and curate blog posts or logistics market updates for your customers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- 6. SETTINGS -------------------- */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm">
                  <div className="flex items-center justify-between pb-6 border-b border-[#d5dcdb]">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#0b2f3a] text-white rounded-xl shadow-sm">
                        <Settings size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-[#0b2f3a]">Settings</h2>
                        <p className="text-xs text-[#51626a] mt-0.5">System preferences, credentials, and configuration</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#eef1f0] text-[#51626a] flex items-center justify-center mb-4 border border-[#d5dcdb]">
                      <Settings size={30} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b2f3a]">Admin & System Settings</h3>
                    <p className="text-sm text-[#51626a] mt-1 max-w-md">
                      Manage administrator accounts, email notification preferences, and API keys.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
