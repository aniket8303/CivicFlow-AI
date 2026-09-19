"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteReportButtonProps {
    reportId: number;
}

export default function DeleteReportButton({
    reportId,
}: DeleteReportButtonProps) {
    const router = useRouter();

    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this report?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/reports/${reportId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete report");
            }

            await response.json();

            router.refresh();
        } catch (error) {
            console.error(error);

            setIsDeleting(false);

            window.alert(
                "Failed to delete the report. Please try again."
            );
        }
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isDeleting ? "Deleting..." : "Delete"}
        </button>
    );
}