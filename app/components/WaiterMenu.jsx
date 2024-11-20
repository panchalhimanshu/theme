import React from 'react';
import { Link } from '@remix-run/react';
import { LayoutDashboard, User, Settings, FileCheck2, Circle, ChevronDown, ChevronRight } from 'lucide-react';

export const WaiterMenu = ({
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
            path: '/waiter/dashboard',
            icon: <LayoutDashboard className="w-5 h-5" />
        },
        {
            name: 'Tabel Management',
            path: '/waiter/tabelmanagement',
            icon: <User className="w-5 h-5" />,
        },
        // {
        //     name: 'Inventory Management',
        //     path: '/waiter/inventorymanagment/product',
        //     icon: <FileCheck2 className="w-5 h-5" />,
        //     submenu: [
        //         { name: 'Product', path: '/waiter/inventorymanagment/product' },
        //         { name: 'Recipe', path: '/waiter/inventorymanagment/recipe' },
        //         { name: 'Physical Stock', path: '/waiter/inventorymanagment/physical-stock' },
        //         { name: 'Purchase Request', path: '/waiter/inventorymanagment/purchaserequest' },
        //         { name: 'Wastage Details', path: '/waiter/inventorymanagment/wastage' }
        //     ]
        // }
        {
            name: 'Order Menu',
            path: '/waiter/ordermenu',
            icon: <Settings className="w-5 h-5" />
        },
        {
            name: 'Orders',
            path: '/waiter/orders',
            icon: <User className="w-5 h-5" />,
            submenu: [
                { name: 'Today Orders', path: '/waiter/orders/todayorders' },
                { name: 'Orders History', path: '/waiter/orders/orderhistory' }
            ]
        },
    ];

    return (
        <>
            {menuItems.map((item, index) => {
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
                        {isSidebarOpen && item.submenu && (
                            <ul
                                className={`ml-0 px-2 mt-2 border border-gray-300 bg-white dark:bg-black dark:text-white text-black rounded-lg shadow-lg transition-all duration-300 ease-in-out 
                                    ${isSubmenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                                style={{ transition: 'max-height 0.3s ease, opacity 0.3s ease' }}
                            >
                                {item.submenu &&
                                    item.submenu.map((submenuItem, subIndex) => {
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

export default WaiterMenu;