"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navigation = [
        { name: "Overview", href: "/dashboard", icon: "📊" },
        { name: "Reports", href: "/dashboard/reports", icon: "📝" },
        { name: "Incidents", href: "/dashboard/incidents", icon: "⚡" },
        { name: "Intelligence Map", href: "/dashboard/map", icon: "🗺️" },
        { name: "Analytics", href: "/dashboard/analytics", icon: "📈" },
        { name: "Departments", href: "/dashboard/departments", icon: "🏢" },
        { name: "AI Assistant", href: "/dashboard/assistant", icon: "🤖" },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <div className="w-72 bg-slate-900 text-white flex flex-col flex-shrink-0 shadow-xl z-20">
                <div className="p-8 border-b border-slate-800">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 mb-4 shadow-lg shadow-blue-900/50">
                        <span className="font-bold text-white tracking-tighter">CF</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">CivicFlow AI</h1>
                    <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Municipal Command</p>
                </div>
                
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`}
                            >
                                <span className="text-lg opacity-80">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 border border-slate-600">
                            JD
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">John Doe</p>
                            <p className="text-xs text-slate-400">Ward Officer</p>
                        </div>
                    </div>
                    <Link href="/" className="flex items-center justify-center w-full py-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition text-xs font-semibold tracking-wide">
                        EXIT COMMAND CENTER
                    </Link>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
