import { Report } from "@/types/report";
import EditReportForm from "./EditReportForm";
import DeleteReportButton from "./DeleteReportButton";

interface ReportCardProps {
    report: Report;
}

export default function ReportCard({
    report,
}: ReportCardProps) {
    return (
        <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md">

            {/* Report Header */}
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        Civic Issue
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-slate-900">
                        {report.title}
                    </h3>
                </div>

                <span className="text-sm font-medium text-slate-400">
                    #{report.id}
                </span>
            </div>

            {/* Description */}
            <p className="flex-1 text-sm leading-6 text-slate-600">
                {report.description}
            </p>

            {/* Location */}
            <div className="mt-5 rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Location
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                    {report.location}
                </p>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                <EditReportForm report={report} />

                <DeleteReportButton
                    reportId={report.id}
                />
            </div>
        </article>
    );
}