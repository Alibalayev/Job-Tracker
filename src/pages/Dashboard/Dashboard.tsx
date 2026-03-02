import { useAppSelector } from "../../store/hooks";
import { MdWork, MdSend, MdPeople, MdCheckCircle, MdCancel } from "react-icons/md";

function Dashboard() {
    const jobs = useAppSelector((state) => state.jobs.jobs);

    const stats = {
        total: jobs.length,
        applied: jobs.filter((j) => j.status === "applied").length,
        interview: jobs.filter((j) => j.status === "interview").length,
        offer: jobs.filter((j) => j.status === "offer").length,
        rejected: jobs.filter((j) => j.status === "rejected").length,
    };

    const cards = [
        { label: "Total Jobs", value: stats.total, icon: <MdWork />, color: "text-indigo-400 bg-indigo-500/10" },
        { label: "Applied", value: stats.applied, icon: <MdSend />, color: "text-blue-400 bg-blue-500/10" },
        { label: "Interview", value: stats.interview, icon: <MdPeople />, color: "text-amber-400 bg-amber-500/10" },
        { label: "Offer", value: stats.offer, icon: <MdCheckCircle />, color: "text-emerald-400 bg-emerald-500/10" },
        { label: "Rejected", value: stats.rejected, icon: <MdCancel />, color: "text-red-400 bg-red-500/10" },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-700 transition-all"
                    >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${card.color}`}>
                            {card.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold leading-none">{card.value}</span>
                            <span className="text-sm text-gray-400 mt-1">{card.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {jobs.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
                    <MdWork className="text-6xl mb-4 text-indigo-400 opacity-30" />
                    <h2 className="text-xl text-gray-400 mb-2">No applications yet</h2>
                    <p className="text-sm">Go to the Jobs section and add your first application</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
