import { Link, useLocation } from "react-router-dom";
import { MdWork } from "react-icons/md";

function Header() {
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case "/": return "Dashboard";
            case "/jobs": return "Jobs";
            default: return "Job Tracker";
        }
    };

    return (
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-8">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-indigo-400 no-underline">
                <MdWork className="text-2xl" />
                <span>JobTracker</span>
            </Link>
            <h1 className="text-base font-semibold text-gray-100">{getPageTitle()}</h1>
            <div />
        </header>
    );
}

export default Header;
