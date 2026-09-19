"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Report } from "@/types/report";

interface EditReportFormProps {
    report: Report;
}

export default function EditReportForm({
    report,
}: EditReportFormProps) {
    const router = useRouter();

    const [title, setTitle] = useState(report.title);
    const [description, setDescription] = useState(
        report.description
    );
    const [location, setLocation] = useState(report.location);

    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setMessage("Updating...");

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/reports/${report.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        location,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update report");
            }

            await response.json();

            setMessage("Report updated successfully!");
            setIsEditing(false);

            router.refresh();
        } catch (error) {
            console.error(error);

            setMessage("Failed to update report.");
        }
    }

    if (!isEditing) {
        return (
            <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
            >
                Edit
            </button>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 rounded-xl bg-slate-50 p-4"
        >
            <div>
                <label
                    htmlFor={`title-${report.id}`}
                    className="mb-1 block text-sm font-semibold text-slate-700"
                >
                    Title
                </label>

                <input
                    id={`title-${report.id}`}
                    type="text"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                />
            </div>

            <div>
                <label
                    htmlFor={`description-${report.id}`}
                    className="mb-1 block text-sm font-semibold text-slate-700"
                >
                    Description
                </label>

                <textarea
                    id={`description-${report.id}`}
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    rows={4}
                    className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                />
            </div>

            <div>
                <label
                    htmlFor={`location-${report.id}`}
                    className="mb-1 block text-sm font-semibold text-slate-700"
                >
                    Location
                </label>

                <input
                    id={`location-${report.id}`}
                    type="text"
                    value={location}
                    onChange={(event) =>
                        setLocation(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                />
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    Save Changes
                </button>

                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                    Cancel
                </button>
            </div>

            {message && (
                <p className="text-sm font-medium text-slate-600">
                    {message}
                </p>
            )}
        </form>
    );
}