import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addJob, deleteJob } from "../../store/jobsSlice";
import type { Job } from "../../types/job";
import { MdAdd, MdDelete, MdClose, MdWork } from "react-icons/md";

function Jobs() {
    const jobs = useAppSelector((state) => state.jobs.jobs);
    const dispatch = useAppDispatch();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        company: "",
        position: "",
        status: "applied" as Job["status"],
        salary: "",
        url: "",
        notes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newJob: Job = {
            ...form,
            id: crypto.randomUUID(),
            appliedDate: new Date().toISOString().split("T")[0],
            createdAt: new Date().toISOString(),
        };
        dispatch(addJob(newJob));
        setForm({ company: "", position: "", status: "applied", salary: "", url: "", notes: "" });
        setShowForm(false);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteJob(id));
    };

    const statusConfig: Record<Job["status"], { label: string; classes: string }> = {
        applied: { label: "Applied", classes: "bg-blue-500/10 text-blue-400" },
        interview: { label: "Interview", classes: "bg-amber-500/10 text-amber-400" },
        offer: { label: "Offer", classes: "bg-emerald-500/10 text-emerald-400" },
        rejected: { label: "Rejected", classes: "bg-red-500/10 text-red-400" },
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">My Jobs ({jobs.length})</h2>
                <button
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 hover:-translate-y-px hover:shadow-lg hover:shadow-indigo-500/30 transition-all cursor-pointer"
                    onClick={() => setShowForm(true)}
                >
                    <MdAdd className="text-lg" /> Add Job
                </button>
            </div>

            {/* Modal */}
            {showForm && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] animate-in fade-in"
                    onClick={() => setShowForm(false)}
                >
                    <div
                        className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-5 border-b border-gray-800">
                            <h3 className="text-lg font-semibold">New Job Application</h3>
                            <button
                                className="text-xl text-gray-500 p-1 rounded hover:text-gray-100 hover:bg-gray-800 transition-colors cursor-pointer"
                                onClick={() => setShowForm(false)}
                            >
                                <MdClose />
                            </button>
                        </div>
                        <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-400">Company *</label>
                                <input
                                    type="text"
                                    required
                                    value={form.company}
                                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                                    placeholder="Company name"
                                    className="px-3.5 py-2.5 rounded-lg border border-gray-800 bg-gray-950 text-gray-100 text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-400">Position *</label>
                                <input
                                    type="text"
                                    required
                                    value={form.position}
                                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                                    placeholder="Frontend Developer"
                                    className="px-3.5 py-2.5 rounded-lg border border-gray-800 bg-gray-950 text-gray-100 text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-400">Status</label>
                                    <select
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value as Job["status"] })}
                                        className="px-3.5 py-2.5 rounded-lg border border-gray-800 bg-gray-950 text-gray-100 text-sm outline-none focus:border-indigo-500 transition-colors"
                                    >
                                        <option value="applied">Applied</option>
                                        <option value="interview">Interview</option>
                                        <option value="offer">Offer</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-400">Salary</label>
                                    <input
                                        type="text"
                                        value={form.salary}
                                        onChange={(e) => setForm({ ...form, salary: e.target.value })}
                                        placeholder="$80,000"
                                        className="px-3.5 py-2.5 rounded-lg border border-gray-800 bg-gray-950 text-gray-100 text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-400">URL</label>
                                <input
                                    type="url"
                                    value={form.url}
                                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                                    placeholder="https://..."
                                    className="px-3.5 py-2.5 rounded-lg border border-gray-800 bg-gray-950 text-gray-100 text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-400">Notes</label>
                                <textarea
                                    value={form.notes}
                                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                    placeholder="Additional info..."
                                    rows={3}
                                    className="px-3.5 py-2.5 rounded-lg border border-gray-800 bg-gray-950 text-gray-100 text-sm outline-none focus:border-indigo-500 transition-colors resize-y placeholder:text-gray-600"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2.5 rounded-lg bg-indigo-500 text-white font-semibold text-sm hover:bg-indigo-400 transition-colors cursor-pointer"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Content */}
            {jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
                    <MdWork className="text-6xl mb-4 text-indigo-400 opacity-30" />
                    <h3 className="text-lg text-gray-400 mb-1">No jobs yet</h3>
                    <p className="text-sm">Click "Add Job" to create your first entry</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 hover:-translate-y-0.5 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${statusConfig[job.status].classes}`}>
                                    {statusConfig[job.status].label}
                                </span>
                                <button
                                    className="text-lg text-gray-600 p-1 rounded hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                                    onClick={() => handleDelete(job.id)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                            <h3 className="text-base font-semibold mb-1">{job.position}</h3>
                            <p className="text-sm text-gray-400 mb-2">{job.company}</p>
                            {job.salary && <p className="text-sm text-emerald-400 font-semibold mb-1">{job.salary}</p>}
                            <p className="text-xs text-gray-600 mb-2">{job.appliedDate}</p>
                            {job.url && (
                                <a
                                    href={job.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                                >
                                    View listing →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Jobs;
