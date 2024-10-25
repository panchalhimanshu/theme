import React from 'react';
import { Link } from '@remix-run/react';
import { LayoutDashboard } from 'lucide-react';


const StationMenu = ({ isActive, isSidebarOpen }) => {
    return (
        <li className="p-4">
            <Link
                to="/station/dashboard"
                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/station/dashboard') ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
            >
                <LayoutDashboard className="w-5 h-5" />
                {isSidebarOpen && <span>Station Dashboard</span>}
            </Link>
        </li>
    );
};

export default StationMenu;
