"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { AnalyticsOverview } from "@/types/analytics";

interface AnalyticsChartsProps {
    analytics: AnalyticsOverview;
}

export default function AnalyticsCharts({
    analytics,
}: AnalyticsChartsProps) {

    return (
        <section className="charts-section">

            <div className="chart-card">

                <h2>Category Distribution</h2>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.categories}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            radius={[6, 6, 0, 0]}
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>


            <div className="chart-card">

                <h2>Severity Distribution</h2>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.severity}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            radius={[6, 6, 0, 0]}
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>


            <div className="chart-card">

                <h2>Priority Distribution</h2>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.priority}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            radius={[6, 6, 0, 0]}
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>

        </section>
    );
}