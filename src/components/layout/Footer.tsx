import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-52">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Sencare</h3>
            <p className="text-gray-400 mb-4">
              Nền tảng đặt lịch khám bệnh trực tuyến hàng đầu Việt Nam, kết nối bệnh nhân với các bác sĩ và cơ sở y tế uy tín.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-teal-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-teal-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-teal-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Truy cập nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/hospitals" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Bệnh viện
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Bác sĩ
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Dịch vụ y tế
                </Link>
              </li>
              <li>
                <Link to="/departments" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Chuyên khoa
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/s1" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Khám Sản - Phụ khoa
                </Link>
              </li>
              <li>
                <Link to="/services/s2" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Siêu âm thai
                </Link>
              </li>
              <li>
                <Link to="/services/s3" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Nội soi dạ dày
                </Link>
              </li>
              <li>
                <Link to="/services/s4" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Khám Nhi khoa
                </Link>
              </li>
              <li>
                <Link to="/services/s5" className="text-gray-400 hover:text-white transition-colors duration-200">
                  MRI - Cộng hưởng từ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-teal-500 mr-2 mt-1" />
                <span className="text-gray-400">123 Nguyễn Văn Linh, Quận 7, Thành phố Hồ Chí Minh</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-gray-400">+84 28 1234 5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-gray-400">support@medibook.vn</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Sencare. Tất cả các quyền được bảo lưu.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
              Điều khoản sử dụng
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
              Chính sách bảo mật
            </Link>
            <Link to="/faq" className="text-gray-400 hover:text-white text-sm">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;