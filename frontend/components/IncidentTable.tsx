import Link from "next/link";
import { Incident } from "../types/incident";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function IncidentTable({ incidents }: { incidents: Incident[] }) {
    return (
        <div className="overflow-x-auto rounded-xl ring-1 ring-slate-200">
            <table className="min-w-full divide-y divide-slate-300">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900">ID</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Category</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Location</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Reports</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Priority</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Department</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Status</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                    {incidents.map((incident) => (
                        <tr key={incident.id} className="hover:bg-slate-50">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900">
                                INC-{incident.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                                {incident.category}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                                {incident.location}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                                {incident.report_count}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                                <PriorityBadge priority={incident.priority} />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                                {incident.department}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                                <StatusBadge status={incident.status} />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-600 font-medium hover:text-blue-800">
                                <Link href={`/dashboard/incidents/${incident.id}`}>
                                    View Details &rarr;
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {incidents.length === 0 && (
                        <tr>
                            <td colSpan={8} className="py-8 text-center text-sm text-slate-500">
                                No incidents found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
