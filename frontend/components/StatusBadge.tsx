export default function StatusBadge({ status }: { status: string }) {
    const getStyles = () => {
        switch (status.toUpperCase()) {
            case "OPEN":
                return "bg-blue-100 text-blue-800 ring-blue-600/20";
            case "ACKNOWLEDGED":
                return "bg-purple-100 text-purple-800 ring-purple-600/20";
            case "IN PROGRESS":
                return "bg-orange-100 text-orange-800 ring-orange-600/20";
            case "RESOLVED":
                return "bg-green-100 text-green-800 ring-green-600/20";
            default:
                return "bg-slate-100 text-slate-800 ring-slate-600/20";
        }
    };

    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStyles()}`}>
            {status}
        </span>
    );
}
