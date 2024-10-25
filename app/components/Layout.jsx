import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@remix-run/react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Maximize2, Minimize2, ArrowLeftToLine, ArrowRightFromLine, Bell, ArrowUp } from 'lucide-react';
import AdminMenu from './AdminMenu';
import StationMenu from './StationMenu';
import WarehouseMenu from './WarehouseMenu';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [roleId, setRoleId] = useState(null);
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [openMenus, setOpenMenus] = useState([]);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme');
            return storedTheme === 'dark' ? 'dark' : 'light';
        }
        return 'light';
    });
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 250);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleNotificationDropdown = () => {
        setIsNotificationDropdownOpen(prevState => !prevState);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const remixdatas = sessionStorage.getItem('remixdata');
            if (remixdatas) {
                const storedRoleIds = JSON.parse(atob(remixdatas));
                const storedRoleId = storedRoleIds?.user.roleid;

                if (storedRoleId) {
                    setRoleId(Number(storedRoleId));
                } else {
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        }
    }, [navigate]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('remixdata');
            sessionStorage.removeItem('roleId');
        }
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuHover = (menuName) => {
        if (!isSidebarOpen) {
            setHoveredMenu(menuName);
        }
    };

    const handleMenuLeave = () => {
        if (!isSidebarOpen) {
            setHoveredMenu(null);
        }
    };

    const toggleMenu = (menuName) => {
        setOpenMenus(prevOpenMenus =>
            prevOpenMenus.includes(menuName)
                ? prevOpenMenus.filter(name => name !== menuName)
                : [...prevOpenMenus, menuName]
        );
    };

    const isMenuOpen = (menuName) => openMenus.includes(menuName);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.documentElement.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    const toggleAvatarDropdown = () => {
        setIsAvatarDropdownOpen(prevState => !prevState);
    };

    return (
        <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#29303d] text-white' : 'bg-gray-50 text-black'}`}>
            <aside className={`fixed left-0 shadow top-0 h-full transition-all duration-300 ${theme === 'dark' ? 'bg-[#29303d] text-white' : 'bg-gray-50 text-gray-800'} font-semibold border border-t-0 border-gray-300 ${isSidebarOpen ? 'w-64' : 'w-18'}`}>
                <div className="p-4 pb-6 text-[#836bfa] text-center text-2xl font-bold border border-r-0 border-gray-300">
                    {isSidebarOpen ? 'Dashboard' : 'D'}
                </div>
                <nav className="mt-10">
                    <ul>
                        {roleId === 3 && <AdminMenu isActive={isActive} isSidebarOpen={isSidebarOpen} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} hoveredMenu={hoveredMenu} handleMenuHover={handleMenuHover} handleMenuLeave={handleMenuLeave} />}
                        {roleId === 4 && <StationMenu isActive={isActive} isSidebarOpen={isSidebarOpen} />}
                        {roleId === 5 && <WarehouseMenu isActive={isActive} isSidebarOpen={isSidebarOpen} />}
                    </ul>
                </nav>
            </aside>

            <div className={`flex flex-col flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-[70px]'}`}>
                <header className={`${theme === 'dark' ? 'bg-[#29303d] text-white' : 'bg-white text-black'} shadow p-4 pb-3 border border-l-0 border-gray-300 py-5 sticky top-0 z-50`}>
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="text-gray-600 dark:text-gray-400 focus:outline-none" onClick={toggleSidebar}>
                                {isSidebarOpen ? <ArrowLeftToLine className="w-6 h-5" /> : <ArrowRightFromLine className="w-6 h-5" />}
                            </button>
                        </div>
                        <div className="flex items-center">
                            <button
                                className={`focus:outline-none rounded-full hover:bg-purple-600 hover:text-white p-1 mr-4 ${isNotificationDropdownOpen ? 'bg-[#836bfa] text-white' : 'text-gray-400'}`}
                                onClick={toggleNotificationDropdown}
                            >
                                <Bell className="w-6 h-6" />
                            </button>
                            {isNotificationDropdownOpen && (
                                <div className="absolute right-5 top-20 mt-2 w-60 bg-white shadow-lg py-2 z-50 max-h-[500px] overflow-y-auto text-gray-700">
                                    <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
                                        <span className="font-semibold">Notifications</span>
                                        <button onClick={toggleNotificationDropdown} className="text-gray-500 hover:text-gray-800">
                                            ✕
                                        </button>
                                    </div>
                                    <div>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>
                                        <p className="px-4 py-2">No new notifications</p>

                                    </div>
                                </div>
                            )}
                            <button className="text-gray-600 dark:text-gray-400 focus:outline-none mr-4" onClick={toggleTheme}>
                                {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6 text-yellow-500" />}
                            </button>
                            <button className="text-gray-600 dark:text-gray-400 focus:outline-none mr-4" onClick={toggleFullscreen}>
                                {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                            </button>
                            <div className="relative">
                                <button
                                    onClick={toggleAvatarDropdown}
                                    className="focus:outline-none rounded-full border-2 border-gray-300 bg-red-500 text-white w-10 h-10 flex items-center justify-center"
                                >
                                    H
                                </button>
                                {isAvatarDropdownOpen && (
                                    <div className={`absolute right-0 mt-2 w-36 bg-gray-100 dark:text-black dark:bg-gray-100 shadow-lg rounded-lg py-2`}>
                                        <Link to="/profile" className="block px-4 py-2 text-gray-700 dark:text-black hover:bg-gray-100 dark:hover:bg-[#836bfa] dark:hover:text-white">
                                            Profile
                                        </Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-black hover:bg-gray-100 dark:hover:bg-[#836bfa] dark:hover:text-white">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-5 flex-grow overflow-y-auto">{children}</main>
            </div>

            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-[#836bfa] text-white p-2 rounded-full hover:bg-purple-600 transition-all animate-bounceUpDown"
                >
                    <ArrowUp />
                </button>
            )}
        </div>
    );
};

export default Layout;
