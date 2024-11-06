import React, { useState, useEffect } from "react";
import { Link, useLocation } from "@remix-run/react";
import { useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  Maximize,
  Minimize,
  ArrowLeftToLine,
  ArrowRightFromLine,
  Bell,
  ArrowUp,
} from "lucide-react";
import AdminMenu from "./AdminMenu";
import StationMenu from "./StationMenu";
import WarehouseMenu from "./WarehouseMenu";
import { toast, Toaster } from "react-hot-toast";
import CallFor from "../utilities/CallFor";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [roleId, setRoleId] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [openMenus, setOpenMenus] = useState([]);
  const [remixdata, setremixdata] = useState([]);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme === "dark" ? "dark" : "light";
    }
    return "light";
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const remixdatas = sessionStorage.getItem("remixdata");
      if (remixdatas) {
        const storedRoleIds = JSON.parse(atob(remixdatas));
        const pathname = location.pathname;
        setremixdata(storedRoleIds)
        console.log(storedRoleIds, "dataremix");
        const storedRoleId = storedRoleIds?.roleid;
        // console.log(storedRoleId,"pathname");

        if (storedRoleId) {
          setRoleId(Number(storedRoleId));
          if (
            (storedRoleId == '2' && (pathname.startsWith('/station') || pathname.startsWith('/warehouse'))) ||
            (storedRoleId == '1' && (pathname.startsWith('/admin') || pathname.startsWith('/warehouse'))) ||
            (storedRoleId == '3' && (pathname.startsWith('/admin') || pathname.startsWith('/station')))
          ) {
            toast.error('Unauthorized access.');
            navigate('/'); // Redirect to login page if route is not allowed for the role
          }
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }
  }, [navigate,location]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      // Remove session data
      sessionStorage.removeItem("remixdata");
      sessionStorage.removeItem("token");
    }
  
    // Send POST request to /auth/logout
    try {
      const response = await CallFor('auth/logout','post', {ulid: remixdata.ulid},'withoutAuth');
  
      if (response.data.success) {
        // If the response is successful, redirect to the homepage or login page
        navigate("/");
      } else {
        // Handle error (e.g., show toast notification)
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      toast.error("An error occurred. Please try again.");
    }
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
    setOpenMenus((prevOpenMenus) =>
      prevOpenMenus.includes(menuName)
        ? prevOpenMenus.filter((name) => name !== menuName)
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
    setIsAvatarDropdownOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`flex min-h-screen dark:bg-black dark:text-white  bg-white text-black'`}
    >
      <Toaster />
      <aside
        className={`fixed left-0 shadow  top-0 h-full transition-all duration-300 dark:bg-black dark:text-white  bg-white text-gray-80'}  border border-t-0 border-gray-300 ${
          isSidebarOpen ? "w-64 overflow-y-auto" : "w-18 "
        }`}
      >
        <div className="p-4 pt-5 dark:text-white text-black text-center text-2xl  border border-r-0 border-gray-300">
          {/* {isSidebarOpen ? 'ResPos' : 'RP'} */}
          <h1
            className={` ${
              isSidebarOpen ? "text-[40px]" : "text-[25px] "
            }  `}
          >
            {isSidebarOpen ? (
              <>
                {" "}
                Res<span className="text-gray-500">POS</span>
              </>
            ) : (
              <>
                {" "}
                R<span className="text-gray-500">P</span>
              </>
            )}
          </h1>
        </div>
        <nav className="mt-5">
          <ul>
            {roleId == 2 && (
              <AdminMenu
                isActive={isActive}
                isSidebarOpen={isSidebarOpen}
                toggleMenu={toggleMenu}
                isMenuOpen={isMenuOpen}
                hoveredMenu={hoveredMenu}
                handleMenuHover={handleMenuHover}
                handleMenuLeave={handleMenuLeave}
              />
            )}
            {roleId == 1 && (
              <StationMenu isActive={isActive} isSidebarOpen={isSidebarOpen} />
            )}
            {roleId == 3 && (
              <WarehouseMenu
                isActive={isActive}
                isSidebarOpen={isSidebarOpen}
              />
            )}
          </ul>
        </nav>
      </aside>

      <div
        className={`flex flex-col flex-grow transition-all duration-75 ${
          isSidebarOpen ? "ml-64" : "ml-[70px]"
        }`}
      >
        <header
          className={`dark:bg-black dark:text-white  bg-white text-black hadow p-4 pb-3 border border-l-0 border-gray-300  sticky top-0 z-50`}
        >
          <div className=" flex justify-between items-center">
            <div className="flex items-center">
              <button
                className="text-black dark:text-white focus:outline-none"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? (
                  <ArrowLeftToLine className="w-6 h-5" />
                ) : (
                  <ArrowRightFromLine className="w-6 h-5" />
                )}
              </button>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleTheme}
                className="relative w-14 mr-4 h-6 rounded-full p-1 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-300 dark:bg-gray-600 flex items-center justify-center"
                aria-label="Toggle theme"
              >
                <span
                  className={`absolute inset-0 w-1/2 h-full rounded-full shadow-lg transform transition-transform duration-500 ease-in-out ${
                    theme === "dark"
                      ? "translate-x-full bg-gray-800"
                      : "bg-white"
                  }`}
                />
                <Sun
                  className={`absolute left-1 h-4 w-4 text-yellow-500 transition-all duration-500 ${
                    theme === "dark"
                      ? "opacity-0 -translate-x-2"
                      : "opacity-100 translate-x-0"
                  }`}
                />
                <Moon
                  className={`absolute right-1 h-4 w-4 text-gray-400 transition-all duration-500 ${
                    theme === "dark"
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-2"
                  }`}
                />
              </button>
              <button
                className="text-black dark:text-white focus:outline-none mr-4"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="w-6 h-6" />
                ) : (
                  <Maximize className="w-6 h-6" />
                )}
              </button>
              <button
                className={`focus:outline-none rounded-full dark:hover:bg-white  dark:hover:text-black hover:bg-black  hover:text-white p-1 mr-4 ${
                  isNotificationDropdownOpen
                    ? "bg-black text-white dark:bg-white  dark:text-black"
                    : ""
                }`}
                onClick={toggleNotificationDropdown}
              >
                <Bell className="w-6 h-6" />
              </button>
              {isNotificationDropdownOpen && (
                <div className="absolute right-5 top-20 mt-2 w-60 bg-white shadow-lg py-2 z-50 max-h-[500px] overflow-y-auto text-gray-700">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
                    <span className="font-semibold">Notifications</span>
                    <button
                      onClick={toggleNotificationDropdown}
                      className="text-gray-500 hover:text-gray-800"
                    >
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

              <div className="relative">
                <button
                  onClick={toggleAvatarDropdown}
                  className="focus:outline-none rounded-full border-2 dark:border-white border-black bg-red-500 text-white w-10 h-10 flex items-center justify-center"
                >
                  {remixdata && remixdata.ulid} 
                </button>
                {isAvatarDropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-36 bg-white dark:text-black shadow-lg rounded-lg py-2`}
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2  dark:text-black hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 dark:text-black hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-5 flex-grow overflow-y-auto bg-gray-100 dark:bg-[#262A2D] ">
          {children}
        </main>
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 dark:bg-white dark:text-black bg-black text-white p-2 rounded-full hover:bg-black transition-all animate-bounceUpDown"
        >
          <ArrowUp />
        </button>
      )}
    </div>
  );
};

export default Layout;
