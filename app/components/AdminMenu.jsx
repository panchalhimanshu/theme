import React from 'react';
import { Link } from '@remix-run/react';
import { LayoutDashboard, User, Settings, ChevronDown, ChevronRight } from 'lucide-react';

const AdminMenu = ({ isActive, isSidebarOpen, toggleMenu, isMenuOpen, hoveredMenu, handleMenuHover, handleMenuLeave }) => {
    const isUserRouteActive = isActive('/admin/user1') || isActive('/admin/user2');
    const isManageUsersOpen = isMenuOpen('manageUsers') || isUserRouteActive;

    // New state for Manage Settings and Manage Roles
    const isManageSettingsOpen = isMenuOpen('manageSettings');
    const isManageRolesOpen = isMenuOpen('manageRoles');

    return (
        <>
            <li className="px-4 py-2">
                <Link
                    to="/admin/dashboard"
                    className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/dashboard') ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    {isSidebarOpen && <span>Admin Dashboard</span>}
                </Link>
            </li>

            <li
                className="px-4 py-2 relative"
                onMouseEnter={() => handleMenuHover('manageUsers')}
                onMouseLeave={handleMenuLeave}
            >
                <div
                    className={`p-2 rounded-md flex items-center gap-2 cursor-pointer ${isManageUsersOpen ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
                    onClick={() => {
                        if (!isManageUsersOpen || !isUserRouteActive) {
                            toggleMenu('manageUsers');
                        }
                    }}
                >
                    <User className="w-5 h-5" />
                    {isSidebarOpen && (
                        <>
                            <span>Manage Users</span>
                            {isManageUsersOpen ? (
                                <ChevronDown className="w-4 h-4 ml-auto" />
                            ) : (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </>
                    )}
                </div>
                {((isSidebarOpen && isManageUsersOpen) || (!isSidebarOpen && hoveredMenu === 'manageUsers')) && (
                    <ul className={`${isSidebarOpen ? 'ml-6 mt-2 px-2' : 'absolute p-2 top-0 z-50 left-full mt-2'} border border-gray-300 bg-white text-black rounded-lg shadow-lg transition-opacity duration-300`}>
                        <li className={`${isSidebarOpen ? ' my-2 ' : ''}`}>
                            <Link
                                to="/admin/user1"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/user1') ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
                            >
                                <span>User1</span>
                            </Link>
                        </li>
                        <li className={`${isSidebarOpen ? ' my-2 ' : ''}`}>
                            <Link
                                to="/admin/user2"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/user2') ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
                            >
                                <span>User2</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </li>

            {/* New Manage Roles Menu */}
            <li
                className="px-4 py-2 relative"
                onMouseEnter={() => handleMenuHover('manageRoles')}
                onMouseLeave={handleMenuLeave}
            >
                <div
                    className={`p-2 rounded-md flex items-center gap-2 cursor-pointer ${isManageRolesOpen ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
                    onClick={() => toggleMenu('manageRoles')}
                >
                    <User className="w-5 h-5" /> {/* Replace with a different icon if desired */}
                    {isSidebarOpen && (
                        <>
                            <span>Manage Roles</span>
                            {isManageRolesOpen ? (
                                <ChevronDown className="w-4 h-4 ml-auto" />
                            ) : (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </>
                    )}
                </div>
                {((isSidebarOpen && isManageRolesOpen) || (!isSidebarOpen && hoveredMenu === 'manageRoles')) && (
                    <ul className={`${isSidebarOpen ? 'ml-6 mt-2 px-2' : 'absolute p-2 top-0 z-50 left-full mt-2'} border border-gray-300 bg-white text-black rounded-lg shadow-lg transition-opacity duration-300`}>
                        <li className={`${isSidebarOpen ? ' my-2 ' : ''}`}>
                            <Link
                                to="/admin/role1"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/role1') ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
                            >
                                <span>Role1</span>
                            </Link>
                        </li>
                        <li className={`${isSidebarOpen ? ' my-2 ' : ''}`}>
                            <Link
                                to="/admin/role2"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/role2') ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
                            >
                                <span>Role2</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </li>

            {/* Manage Settings Menu */}
            <li
                className="px-4 py-2 relative"
                onMouseEnter={() => handleMenuHover('manageSettings')}
                onMouseLeave={handleMenuLeave}
            >
                <div
                    className={`p-2 rounded-md flex items-center gap-2 cursor-pointer ${isManageSettingsOpen ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
                    onClick={() => toggleMenu('manageSettings')}
                >
                    <Settings className="w-5 h-5" />
                    {isSidebarOpen && (
                        <>
                            <span>Manage Settings</span>
                            {isManageSettingsOpen ? (
                                <ChevronDown className="w-4 h-4 ml-auto" />
                            ) : (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </>
                    )}
                </div>
                {((isSidebarOpen && isManageSettingsOpen) || (!isSidebarOpen && hoveredMenu === 'manageSettings')) && (
                    <ul className={`${isSidebarOpen ? 'ml-6 mt-2 px-2' : 'absolute p-2 top-0 z-50 left-full mt-2'} border border-gray-300 bg-white text-black rounded-lg shadow-lg transition-opacity duration-300`}>
                        <li className={`${isSidebarOpen ? ' my-2 ' : ''}`}>
                            <Link
                                to="/admin/general-settings"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/general-settings') ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
                            >
                                <span>General Settings</span>
                            </Link>
                        </li>
                        <li className={`${isSidebarOpen ? ' my-2 ' : ''}`}>
                            <Link
                                to="/admin/security-settings"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/security-settings') ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
                            >
                                <span>Security Settings</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </li>

            <li className="px-4 py-2">
                <Link
                    to="/admin/settings"
                    className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/settings') ? 'bg-[#836bfa] text-white' : 'hover:bg-[#836bfa] hover:text-white'}`}
                >
                    <Settings className="w-5 h-5" />
                    {isSidebarOpen && <span>Admin Settings</span>}
                </Link>
            </li>
        </>
    );
};

export default AdminMenu;
