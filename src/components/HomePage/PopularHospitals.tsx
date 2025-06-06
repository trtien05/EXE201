import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Phone } from 'lucide-react';
import { Spin } from 'antd';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { hospitalsApi } from '../../lib/api';

const PopularHospitals: React.FC = () => {
  const { data: hospitalsResponse, isLoading, error } = useQuery({
    queryKey: ['popularHospitals'],
    queryFn: () => hospitalsApi.getAllHospitals(0, 3), // Get first 3 hospitals
    staleTime: 5 * 60 * 1000,
  });

  const hospitals = hospitalsResponse?.data?.content || [];

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-52">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Bệnh viện nổi bật
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-lg">
              Các bệnh viện và phòng khám hàng đầu với cơ sở vật chất hiện đại
            </p>
          </div>
          <Link 
            to="/hospitals" 
            className="text-[#0077B6] hover:text-[#0077B6] font-medium text-sm sm:text-base whitespace-nowrap"
          >
            Xem tất cả
          </Link>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <Spin size="large" />
            <p className="text-gray-600 mt-4">Đang tải danh sách bệnh viện...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">
              {error instanceof Error ? error.message : 'Không thể tải danh sách bệnh viện'}
            </p>
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {hospitals.map((hospital) => (
              <Card key={hospital.hospitalId} hoverable className="h-full flex flex-col">
                <div className="h-40 sm:h-48 overflow-hidden">
                  <img 
                    src={hospital.hospitalAvatar} 
                    alt={hospital.hospitalName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {hospital.hospitalName}
                  </h3>
                  <div className="flex items-center mb-3">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 text-xs sm:text-sm">{hospital.hospitalPhone}</span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2 flex-grow">
                    {hospital.hospitalDescription}
                  </p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 items-center">
                      {hospital.hospitalSpecs.slice(0, 2).map((spec) => (
                        <span key={spec.id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {spec.specName}
                        </span>
                      ))}
                      {hospital.hospitalSpecs.length > 2 && (
                        <span className="text-xs text-gray-500">+{hospital.hospitalSpecs.length - 2}</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link to={`/hospitals/${hospital.hospitalId}`}>
                      <Button fullWidth className="text-sm sm:text-base py-2 sm:py-3">
                        Đặt lịch khám
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularHospitals;