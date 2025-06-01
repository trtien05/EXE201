import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
    >
      <div className="container mx-auto px-52">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="text-[#0077B6] font-bold text-2xl">Sencare</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-[#0077B6] font-medium">Trang chủ</Link>
            <Link to="/hospitals" className="text-gray-700 hover:text-[#0077B6] font-medium">Bệnh viện</Link>
            <Link to="/doctors" className="text-gray-700 hover:text-[#0077B6] font-medium">Bác sĩ</Link>
            <Link to="/services" className="text-gray-700 hover:text-[#0077B6] font-medium">Dịch vụ</Link>
            <Link to="/departments" className="text-gray-700 hover:text-[#0077B6] font-medium">Chuyên khoa</Link>
          </nav>

          {/* Search and Login buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-md bg-[#0096C7] text-white hover:bg-[#0077B6] transition-colors duration-200"
            >
              Đăng nhập
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700"
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
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <div className="px-4 py-2 space-y-1">
            <Link 
              to="/" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link 
              to="/hospitals" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bệnh viện
            </Link>
            <Link 
              to="/doctors" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bác sĩ
            </Link>
            <Link 
              to="/services" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dịch vụ
            </Link>
            <Link 
              to="/departments" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Chuyên khoa
            </Link>
            <Link 
              to="/login" 
              className="block py-3 px-4 text-white bg-[#0096C7] hover:bg-[#0077B6] rounded-md mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;