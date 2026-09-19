"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportForm() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setMessage("Submitting...");

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/reports",
                {
                    method: "POST",
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
                throw new Error("Failed to create report");
            }

            const data = await response.json();

            console.log("Created report:", data);

            setMessage("Report submitted successfully!");

            setTitle("");
            setDescription("");
            setLocation("");

            router.refresh();
        } catch (error) {
            console.error(error);

            setMessage("Failed to submit report.");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* Title */}
            <div>
                <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Issue Title
                </label>

                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    placeholder="Example: Broken streetlight"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Description
                </label>

                <textarea
                    id="description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    placeholder="Describe the civic issue in detail..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                />
            </div>

            {/* Location */}
            <div>
                <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Location
                </label>

                <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(event) =>
                        setLocation(event.target.value)
                    }
                    placeholder="Example: Ward 5, Pune"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                />
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                    Please provide accurate information about the issue.
                </p>

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
                >
                    Submit Report
                </button>
            </div>

            {/* Message */}
            {message && (
                <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                    {message}
                </div>
            )}
        </form>
    );
}