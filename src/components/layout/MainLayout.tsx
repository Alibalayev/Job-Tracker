import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout() {
    return (
        <div className="flex min-h-screen bg-gray-950 text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-60">
                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
