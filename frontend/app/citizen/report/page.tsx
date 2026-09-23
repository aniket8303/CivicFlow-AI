import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReportForm from "@/components/ReportForm";

export default function CitizenReportPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            
            <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Report a Civic Issue</h1>
                    <p className="mt-2 text-slate-600">Your report will be analyzed by our AI and automatically routed to the correct department.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                    <ReportForm />
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
