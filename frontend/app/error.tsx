"use client";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main>
            <h2>Something went wrong.</h2>

            <p>
                We could not load the CivicFlow-AI reports.
            </p>

            <button onClick={() => reset()}>
                Try Again
            </button>
        </main>
    );
}