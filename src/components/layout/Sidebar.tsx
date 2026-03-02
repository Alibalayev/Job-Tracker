import { NavLink } from "react-router-dom";
import { MdDashboard, MdWork } from "react-icons/md";

function Sidebar() {
    return (
        <aside className="fixed top-0 left-0 w-60 h-screen bg-gray-900 border-r border-gray-800 flex flex-col p-6 z-50">
            <nav className="flex flex-col gap-1 mt-6">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all no-underline ${isActive
                            ? "text-indigo-400 bg-indigo-500/10"
                            : "text-gray-400 hover:text-gray-100 hover:bg-indigo-500/5"
                        }`
                    }
                >
                    <MdDashboard className="text-xl shrink-0" />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink
                    to="/jobs"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all no-underline ${isActive
                            ? "text-indigo-400 bg-indigo-500/10"
                            : "text-gray-400 hover:text-gray-100 hover:bg-indigo-500/5"
                        }`
                    }
                >
                    <MdWork className="text-xl shrink-0" />
                    <span>Jobs</span>
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;
