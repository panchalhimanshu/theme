import React from 'react';
import { Link } from '@remix-run/react';
import { LayoutDashboard, User, Settings, FileCheck2, Circle, ChevronDown, ChevronRight } from 'lucide-react';

export const StationMenu = ({
    isActive,
    isSidebarOpen,
    toggleMenu,
    isMenuOpen,
    hoveredMenu,
    handleMenuHover,
    handleMenuLeave
}) => {
    // Helper function to check if current path is under a parent path
    const isUnderPath = (currentPath, parentPath) => {
        return currentPath.startsWith(parentPath);
    };

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/admin/dashboard',
            icon: <LayoutDashboard className="w-5 h-5" />
        },
        {
            name: 'Staff Management',
            path: '/admin/employee',
            icon: <User className="w-5 h-5" />,
            submenu: [
                { name: 'Employee Management', path: '/admin/employee' },
                { name: 'Waiter Management', path: '/admin/waiter' }
            ]
        },
        {
            name: 'Inventory Management',
            path: '/admin/inventorymanagment/product',
            icon: <FileCheck2 className="w-5 h-5" />,
            submenu: [
                { name: 'Product', path: '/admin/inventorymanagment/product' },
                { name: 'Recipe', path: '/admin/inventorymanagment/recipe' },
                { name: 'Physical Stock', path: '/admin/inventorymanagment/physical-stock' },
                { name: 'Purchase Request', path: '/admin/inventorymanagment/purchaserequest' },
                { name: 'Wastage Details', path: '/admin/inventorymanagment/wastage' }
            ]
        },
        {
            name: 'Manage Users',
            path: '/admin/user1',
            icon: <User className="w-5 h-5" />,
            submenu: [
                { name: 'User1', path: '/admin/user1' },
                { name: 'User2', path: '/admin/user2' }
            ]
        },
        {
            name: 'Settings',
            path: '/admin/settings',
            icon: <Settings className="w-5 h-5" />
        }
    ];

    return (
        <>
            {menuItems.map((item, index) => {
                // Check if current path is under this menu item's path
                const isItemActive = item.submenu
                    ? item.submenu.some(subitem => isUnderPath(window.location.pathname, subitem.path))
                    : isActive(item.path);

                const isSubmenuOpen = isMenuOpen(item.name.toLowerCase().replace(/ /g, '')) || isItemActive;

                return (
                    <li key={index} className="px-4 py-2 relative">
                        <div
                            className={`p-2 text-sm rounded-md flex items-center gap-2 cursor-pointer ${isItemActive ? 'bg-black text-white dark:bg-white dark:text-black' :
                                    'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'
                                }`}
                            onClick={() => toggleMenu(item.name.toLowerCase().replace(/ /g, ''))}
                            onMouseEnter={() => handleMenuHover(item.name)}
                            onMouseLeave={handleMenuLeave}
                        >
                            <Link to={item.path}>{item.icon}</Link>
                            {isSidebarOpen && (
                                <>
                                    {item.submenu ? <span>{item.name}</span> :
                                        <Link to={item.path}><span>{item.name}</span></Link>
                                    }
                                    {item.submenu && (
                                        isSubmenuOpen ?
                                            <ChevronDown className="w-4 h-4 ml-auto" /> :
                                            <ChevronRight className="w-4 h-4 ml-auto" />
                                    )}
                                </>
                            )}
                            {hoveredMenu === item.name && !isSidebarOpen && (
                                <span className="absolute left-full z-50 ml-2 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md">
                                    {item.name}
                                </span>
                            )}
                        </div>
                        {isSidebarOpen && isSubmenuOpen && item.submenu && (
                            <ul className="ml-0 mt-2 px-2 border border-gray-300 bg-white dark:bg-black dark:text-white text-black rounded-lg shadow-lg transition-all duration-300 ease-in-out">
                                {item.submenu.map((submenuItem, subIndex) => {
                                    const isSubmenuItemActive = isUnderPath(window.location.pathname, submenuItem.path);

                                    return (
                                        <li key={subIndex} className="my-2">
                                            <Link
                                                to={submenuItem.path}
                                                className={`p-2 text-sm rounded-md flex items-center gap-2 ${isSubmenuItemActive ?
                                                        'bg-black text-white dark:bg-white dark:text-black' :
                                                        'dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white'
                                                    }`}
                                            >
                                                <Circle className="w-3 h-3" />
                                                <span>{submenuItem.name}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </li>
                );
            })}
        </>
    );
};

export default StationMenu;