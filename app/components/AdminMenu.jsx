import React from 'react';
import { Link } from '@remix-run/react';
import { LayoutDashboard, User, Settings,Circle, ChevronDown, ChevronRight } from 'lucide-react';

const AdminMenu = ({
    isActive,
    isSidebarOpen,
    toggleMenu,
    isMenuOpen,
    hoveredMenu,
    handleMenuHover,
    handleMenuLeave
}) => {
    const isUserRouteActive = isActive('/admin/user1') || isActive('/admin/user2');
    const isManageUsersOpen = isMenuOpen('manageUsers') || isUserRouteActive;

    const isManageSettingsOpen = isMenuOpen('manageSettings');
    const isManageRolesOpen = isMenuOpen('manageRoles');

    const isStaffManagementRouteActive = isActive('/admin/waiter') || isActive('/admin/dummy-text');
    const isStaffManagementOpen = isMenuOpen('staffManagement') || isStaffManagementRouteActive;
    

    return (
        <>
            {/* Dashboard Menu Item */}
            <li className="px-4 py-2">
                <Link
                    to="/admin/dashboard"
                    className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/dashboard') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                    onMouseEnter={() => handleMenuHover('dashboard')}
                    onMouseLeave={handleMenuLeave}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    {isSidebarOpen && <span> Dashboard</span>}
                    {hoveredMenu === 'dashboard' && !isSidebarOpen && <span className="absolute left-full z-50 ml-2 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md "> Dashboard</span>}
                </Link>
            </li>

            {/* Staff Management Menu Item */}
            <li className="px-4 py-2 relative">
                <div
                    className={`p-2 rounded-md flex items-center gap-2 cursor-pointer ${isStaffManagementOpen ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                    onClick={() => toggleMenu('staffManagement')}
                    onMouseEnter={() => handleMenuHover('staffManagement')}
                    onMouseLeave={handleMenuLeave}
                >
                    <User className="w-5 h-5" />
                   {/* <Link to={'/admin/waiter'}> <User className="w-5 h-5" /> </Link> */}

                    {isSidebarOpen && (
                        <>
                            <span>Staff Management</span>
                            {isStaffManagementOpen ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
                        </>
                    )}
                    {hoveredMenu === 'staffManagement' && !isSidebarOpen && (
                        <span className="absolute left-full z-50 ml-2 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md ">
                            Staff Management
                        </span>
                    )}
                </div>
                {isSidebarOpen && isStaffManagementOpen && (
                    <ul className={`ml-6 mt-2 px-2 border border-gray-300 bg-white dark:bg-black dark:text-white text-black rounded-lg shadow-lg transition-all duration-300 ease-in-out`}>
                        <li className="my-2">
                            <Link
                                to="/admin/waiter"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/waiter') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                              <Circle className="w-3 h-3"/>  <span>  Waiter Management</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/admin/dummy-text"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/dummy-text') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                               <Circle className="w-3 h-3"/> <span>Dummy Text</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </li>

            {/* Manage Users Menu Item */}
            <li className="px-4 py-2 relative">
                <div
                    className={`p-2 rounded-md flex items-center gap-2 cursor-pointer ${isManageUsersOpen ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                    onClick={() => toggleMenu('manageUsers')}
                    onMouseEnter={() => handleMenuHover('manageUsers')}
                    onMouseLeave={handleMenuLeave}
                >
                    <User className="w-5 h-5" />
                    {isSidebarOpen && (
                        <>
                            <span>Manage Users</span>
                            {isManageUsersOpen ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
                        </>
                    )}
                    {hoveredMenu === 'manageUsers' && !isSidebarOpen && <span className="absolute left-full z-50 ml-2 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md ">Manage Users</span>}
                </div>
                {isSidebarOpen && isManageUsersOpen && (
                    <ul className={`ml-6 mt-2 px-2 border border-gray-300 bg-white dark:bg-black dark:text-white text-black rounded-lg shadow-lg transition-all duration-300 ease-in-out`}>
                        <li className="my-2">
                            <Link
                                to="/admin/user1"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/user1') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                                <span>User1</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/admin/user2"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/user2') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                                <span>User2</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </li>

            {/* Manage Roles Menu Item */}
            <li className="px-4 py-2 relative">
                <div
                    className={`p-2 rounded-md flex items-center gap-2 cursor-pointer ${isManageRolesOpen ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                    onClick={() => toggleMenu('manageRoles')}
                    onMouseEnter={() => handleMenuHover('manageRoles')}
                    onMouseLeave={handleMenuLeave}
                >
                    <User className="w-5 h-5" />
                    {isSidebarOpen && (
                        <>
                            <span>Manage Roles</span>
                            {isManageRolesOpen ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
                        </>
                    )}
                    {hoveredMenu === 'manageRoles' && !isSidebarOpen && <span className="absolute left-full z-50 ml-2 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md ">Manage Roles</span>}
                </div>
                {isSidebarOpen && isManageRolesOpen && (
                    <ul className={`ml-6 mt-2 px-2 border border-gray-300 bg-white dark:bg-black dark:text-white text-black rounded-lg shadow-lg transition-all duration-300 ease-in-out`}>
                        <li className="my-2">
                            <Link
                                to="/admin/role1"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/role1') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                                <span>Role1</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/admin/role2"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/role2') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                                <span>Role2</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </li>

            {/* Manage Settings Menu Item */}
            <li className="px-4 py-2 relative">
                <div
                    className={`p-2 rounded-md flex items-center gap-2 cursor-pointer ${isManageSettingsOpen ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                    onClick={() => toggleMenu('manageSettings')}
                    onMouseEnter={() => handleMenuHover('manageSettings')}
                    onMouseLeave={handleMenuLeave}
                >
                    <Settings className="w-5 h-5" />
                    {isSidebarOpen && (
                        <>
                            <span>Manage Settings</span>
                            {isManageSettingsOpen ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
                        </>
                    )}
                    {hoveredMenu === 'manageSettings' && !isSidebarOpen && <span className="absolute left-full z-50 ml-2 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md ">Manage Settings</span>}
                </div>
                {isSidebarOpen && isManageSettingsOpen && (
                    <ul className={`ml-6 mt-2 px-2 border border-gray-300 bg-white dark:bg-black dark:text-white text-black rounded-lg shadow-lg transition-all duration-300 ease-in-out`}>
                        <li className="my-2">
                            <Link
                                to="/admin/setting1"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/setting1') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                                <span>Setting1</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/admin/setting2"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/setting2') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                                <span>Setting2</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </li>
        </>
    );
};

export default AdminMenu;
