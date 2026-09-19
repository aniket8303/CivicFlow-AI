export default function Navbar() {
    return (
        <nav className="border-b bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">
                        CivicFlow-AI
                    </h1>

                    <p className="text-xs text-slate-500">
                        Smart Civic Issue Management
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                    <a
                        href="/"
                        className="font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        Dashboard
                    </a>

                    <a
                        href="#reports"
                        className="font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        Reports
                    </a>

                    <a
                        href="#report-form"
                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                    >
                        Report Issue
                    </a>
                </div>
            </div>
        </nav>
    );
}