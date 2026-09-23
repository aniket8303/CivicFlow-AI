export default function PriorityBadge({ priority }: { priority: string }) {
    const getStyles = () => {
        switch (priority.toUpperCase()) {
            case "P1":
                return "bg-red-100 text-red-800 ring-red-600/20";
            case "P2":
                return "bg-orange-100 text-orange-800 ring-orange-600/20";
            case "P3":
                return "bg-green-100 text-green-800 ring-green-600/20";
            default:
                return "bg-slate-100 text-slate-800 ring-slate-600/20";
        }
    };

    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStyles()}`}>
            {priority}
        </span>
    );
}
