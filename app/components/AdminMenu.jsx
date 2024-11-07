import React from 'react';
import { Link } from '@remix-run/react';
import { LayoutDashboard, User, Settings, FileCheck2, Circle, ChevronDown, ChevronRight } from 'lucide-react';

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
    const isStaffManagementRouteActive = isActive('/admin/employee') || isActive('/admin/waiter') ;
    const isStaffManagementOpen = isMenuOpen('staffManagement') || isStaffManagementRouteActive;

    // Updated Inventory Management States
    const isInventoryRouteActive = isActive('/admin/inventorymanagment/product') || isActive('/admin/inventorymanagment/recipe') || isActive('/admin/inventorymanagment/physical-stock') || isActive('/admin/inventorymanagment/purchase-request') || isActive('/admin/inventorymanagment/wastage-details') || isActive('/admin/inventorymanagment/product/productadd')   ;
    const isInventoryManagementOpen = isMenuOpen('inventoryManagement') || isInventoryRouteActive;

    return (
        <>
            {/* Dashboard Menu Item */} 
            <li className="px-4 py-2">
                <Link
                    to="/admin/dashboard"
                    className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/dashboard') ? 'bg-black text-white dark:bg-white  dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
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
                     <Link
                                to="/admin/employee"><User className="w-5 h-5" /></Link>
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
                                to="/admin/employee"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/employee') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                                <Circle className="w-3 h-3" /> <span>Employee Management</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/admin/waiter"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/waiter') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                                <Circle className="w-3 h-3" /> <span>Waiter-Management</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </li>

            {/* Inventory Management Menu Item */}
            <li className="px-4 py-2 relative">
                <div
                    className={`p-2 rounded-md flex items-center gap-2 cursor-pointer ${isInventoryManagementOpen ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                    onClick={() => toggleMenu('inventoryManagement')}
                    onMouseEnter={() => handleMenuHover('inventoryManagement')}
                    onMouseLeave={handleMenuLeave}
                >
                    <Link
                                to="/admin/inventorymanagment/product"><FileCheck2 className="w-5 h-5" /></Link>
                    {isSidebarOpen && ( 
                        <>
                            <span>Inventory Management</span>
                            {isInventoryManagementOpen ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
                        </>
                    )}
                    {hoveredMenu === 'inventoryManagement' && !isSidebarOpen && (
                        <span className="absolute left-full z-50 ml-2 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md ">Inventory Management</span>
                    )}
                </div>
                {isSidebarOpen && isInventoryManagementOpen && (
                    <ul className={`ml-6 mt-2 px-2 border border-gray-300 bg-white dark:bg-black dark:text-white text-black rounded-lg shadow-lg transition-all duration-300 ease-in-out`}>
                        <li className="my-2">
                            <Link
                                to="/admin/inventorymanagment/product"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/inventorymanagment/product') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                               <Circle className="w-3 h-3" />  <span>Product</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/admin/inventorymanagment/recipe"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/inventorymanagment/recipe') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                               <Circle className="w-3 h-3" />  <span>Recipe</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/admin/inventorymanagment/physical-stock"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/inventorymanagment/physical-stock') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                               <Circle className="w-3 h-3" />  <span>Physical Stock</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/admin/inventorymanagment/purchase-request"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/inventorymanagment/purchase-request') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                               <Circle className="w-3 h-3" />  <span>Purchase Request</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/admin/inventorymanagment/wastage-details"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/inventorymanagment/wastage-details') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                               <Circle className="w-3 h-3" />  <span>Wastage Details</span>
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
                    {hoveredMenu === 'manageUsers' && !isSidebarOpen && (
                        <span className="absolute left-full z-50 ml-2 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md ">Manage Users</span>
                    )}
                </div>
                {isSidebarOpen && isManageUsersOpen && (
                    <ul className={`ml-6 mt-2 px-2 border border-gray-300 bg-white dark:bg-black dark:text-white text-black rounded-lg shadow-lg transition-all duration-300 ease-in-out`}>
                        <li className="my-2">
                            <Link
                                to="/admin/user1"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/user1') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                               <Circle className="w-3 h-3" /> <span>User1</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/admin/user2"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/user2') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                               <Circle className="w-3 h-3" /> <span>User2</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </li>

            {/* Settings Menu Item */}
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
                    {hoveredMenu === 'manageSettings' && !isSidebarOpen && (
                        <span className="absolute left-full z-50 ml-2 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md ">Manage Settings</span>
                    )}
                </div>
                {isSidebarOpen && isManageSettingsOpen && (
                    <ul className={`ml-6 mt-2 px-2 border border-gray-300 bg-white dark:bg-black dark:text-white text-black rounded-lg shadow-lg transition-all duration-300 ease-in-out`}>
                        <li className="my-2">
                            <Link
                                to="/admin/manage-account"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/manage-account') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                               <Circle className="w-3 h-3" /> <span>Manage Account</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/admin/logs"
                                className={`p-2 rounded-md flex items-center gap-2 ${isActive('/admin/logs') ? 'bg-black text-white dark:bg-white dark:text-black' : 'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'}`}
                            >
                               <Circle className="w-3 h-3" /> <span>Logs</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </li>
        </>
    );
};

export default AdminMenu;
