import Navbar from "@/components/Navbar";
import ReportCard from "@/components/ReportCard";
import ReportForm from "@/components/ReportForm";
import { getReports } from "@/services/reportService";
import Footer from "@/components/Footer";

export default async function Home() {
  const reports = await getReports();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Hero Section */}
        <section className="mb-10">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Civic Intelligence Platform
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Report civic issues.
              <br />
              Improve your community.
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              CivicFlow-AI helps citizens report local issues and
              provides a foundation for intelligent civic issue
              management.
            </p>
          </div>
        </section>

        {/* Report Form */}
        <section
          id="report-form"
          className="mb-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Report a Civic Issue
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tell us about an issue in your area.
            </p>
          </div>

          <ReportForm />
        </section>

        {/* Reports */}
        <section id="reports">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Civic Reports
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Recently submitted community issues
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              {reports.length} Reports
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                No reports yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Be the first person to report a civic issue.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}