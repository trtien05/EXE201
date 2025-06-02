import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import Button from '../ui/Button';

const SearchSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<'hospital' | 'doctor' | 'service'>('hospital');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.set('query', searchQuery);
    if (location) searchParams.set('location', location);
    
    navigate(`/${searchType}s?${searchParams.toString()}`);
  };

  return (
    <div className="relative bg-gradient-to-r from-[#0077B6] to-[#48CAE4] py-12 md:py-16 lg:py-24">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-52 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-6 md:mb-8">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            Đặt lịch khám bệnh dễ dàng và nhanh chóng
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg opacity-90 px-4 sm:px-0">
            Đặt lịch khám bệnh với bác sĩ giỏi tại các bệnh viện và phòng khám hàng đầu chỉ trong vài phút
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
          <div className="flex mb-4 border-b overflow-x-auto">
            <button
              className={`pb-3 px-3 sm:px-4 text-sm md:text-base font-medium transition-colors whitespace-nowrap ${
                searchType === 'hospital' 
                  ? 'text-[#0077B6] border-b-2 border-[#0096C7]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSearchType('hospital')}
            >
              Bệnh viện
            </button>
            <button
              className={`pb-3 px-3 sm:px-4 text-sm md:text-base font-medium transition-colors whitespace-nowrap ${
                searchType === 'doctor' 
                  ? 'text-[#0077B6] border-b-2 border-[#0096C7]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSearchType('doctor')}
            >
              Bác sĩ
            </button>
            <button
              className={`pb-3 px-3 sm:px-4 text-sm md:text-base font-medium transition-colors whitespace-nowrap ${
                searchType === 'service' 
                  ? 'text-[#0077B6] border-b-2 border-[#0096C7]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSearchType('service')}
            >
              Dịch vụ
            </button>
          </div>
          
          <form onSubmit={handleSearch}>
            <div className="flex flex-col lg:grid lg:grid-cols-7 gap-3 md:gap-4">
              <div className="lg:col-span-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={`Tìm ${
                    searchType === 'hospital' ? 'bệnh viện' : 
                    searchType === 'doctor' ? 'bác sĩ' : 'dịch vụ'
                  }`}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="lg:col-span-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Địa điểm (tỉnh, thành phố)"
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="lg:col-span-1">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  fullWidth
                  className="py-2.5 sm:py-3 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Tìm kiếm</span>
                  <span className="sm:hidden">Tìm</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;