import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, User, LogOut, Settings } from "lucide-react";
import Logo from "../ui/Logo";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name?: string;
    email?: string;
    avatar?: string;
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Try to decode JWT for user info (if available)
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsAuthenticated(true);
        setCurrentUser({
          name: payload.name || payload.sub || "User",
          email: payload.email || "",
          avatar: payload.avatar || "",
        });
      } catch {
        setIsAuthenticated(true);
        setCurrentUser({ name: "User" });
      }
    } else {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setCurrentUser(null);
    setShowUserMenu(false);
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-52">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo width={isScrolled ? 32 : 40} height={isScrolled ? 32 : 40} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-[#0077B6] font-medium"
            >
              Trang chủ
            </Link>
            <Link
              to="/hospitals"
              className="text-gray-700 hover:text-[#0077B6] font-medium"
            >
              Bệnh viện
            </Link>
            <Link
              to="/doctors"
              className="text-gray-700 hover:text-[#0077B6] font-medium"
            >
              Bác sĩ
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-[#0077B6] font-medium"
            >
              Dịch vụ
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-[#0077B6] font-medium"
            >
              Blog
            </Link>
          </nav>

          {/* Search and Login buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-[#0096C7] text-white rounded-full flex items-center justify-center text-sm font-medium overflow-hidden">
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {currentUser.name}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentUser.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Hồ sơ cá nhân
                    </Link>

                    {/* <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Cài đặt
                    </Link> */}

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-[#0096C7] text-white hover:bg-[#0077B6] transition-colors duration-200"
              >
                Đăng nhập
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="px-4 py-2 space-y-1 max-h-screen overflow-y-auto">
            <Link
              to="/"
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-[#0077B6] rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/hospitals"
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-[#0077B6] rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bệnh viện
            </Link>
            <Link
              to="/doctors"
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-[#0077B6] rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bác sĩ
            </Link>
            <Link
              to="/services"
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-[#0077B6] rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dịch vụ
            </Link>
            <Link
              to="/blog"
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-[#0077B6] rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>

            {/* Mobile search and login */}
            <div className="pt-2 border-t border-gray-200 mt-2">
              <button
                className="flex items-center w-full py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="h-5 w-5 mr-3" />
                Tìm kiếm
              </button>

              {isAuthenticated && currentUser ? (
                <div className="mt-2">
                  <div className="flex items-center py-3 px-4 border-b border-gray-100">
                    <div className="w-8 h-8 bg-[#0096C7] text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 overflow-hidden">
                      {currentUser.avatar ? (
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Hồ sơ cá nhân
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 px-4 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block py-3 px-4 text-white bg-[#0096C7] hover:bg-[#0077B6] rounded-md mt-2 text-center transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
