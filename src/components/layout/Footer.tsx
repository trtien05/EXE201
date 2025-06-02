import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-8 sm:pt-12 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-52">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Sencare</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
              Nền tảng đặt lịch khám bệnh trực tuyến hàng đầu Việt Nam, kết nối bệnh nhân với các bác sĩ và cơ sở y tế uy tín.
            </p>
            <div className="flex space-x-4 mt-3 sm:mt-4">
              <a href="#" className="text-white hover:text-teal-400 transition-colors duration-200">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-white hover:text-teal-400 transition-colors duration-200">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-white hover:text-teal-400 transition-colors duration-200">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Truy cập nhanh</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/hospitals" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Bệnh viện
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Bác sĩ
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Dịch vụ y tế
                </Link>
              </li>
              <li>
                <Link to="/departments" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Chuyên khoa
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Dịch vụ</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to="/services/s1" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Khám Sản - Phụ khoa
                </Link>
              </li>
              <li>
                <Link to="/services/s2" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Siêu âm thai
                </Link>
              </li>
              <li>
                <Link to="/services/s3" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Nội soi dạ dày
                </Link>
              </li>
              <li>
                <Link to="/services/s4" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Khám Nhi khoa
                </Link>
              </li>
              <li>
                <Link to="/services/s5" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  MRI - Cộng hưởng từ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Liên hệ</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">123 Nguyễn Văn Linh, Quận 7, Thành phố Hồ Chí Minh</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">+84 28 1234 5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">support@medibook.vn</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-6 sm:my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Sencare. Tất cả các quyền được bảo lưu.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-3 sm:space-x-4">
            <Link to="/terms" className="text-gray-400 hover:text-white text-xs sm:text-sm">
              Điều khoản sử dụng
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-xs sm:text-sm">
              Chính sách bảo mật
            </Link>
            <Link to="/faq" className="text-gray-400 hover:text-white text-xs sm:text-sm">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;