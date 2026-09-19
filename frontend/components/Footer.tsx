export default function Footer() {
    return (
        <footer className="mt-16 border-t bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <div>
                    <p className="font-semibold text-slate-900">
                        CivicFlow-AI
                    </p>

                    <p className="text-sm text-slate-500">
                        AI-powered civic issue reporting platform
                    </p>
                </div>

                <p className="text-sm text-slate-400">
                    Built with Next.js, FastAPI & PostgreSQL
                </p>
            </div>
        </footer>
    );
}