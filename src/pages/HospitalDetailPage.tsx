import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Phone, Users, Award } from 'lucide-react';
import { Spin } from 'antd';
import MainLayout from '../components/layout/MainLayout';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import HospitalOverview from '../components/HospitalDetail/HospitalOverview';
import HospitalServices from '../components/HospitalDetail/HospitalServices';
import HospitalDoctors from '../components/HospitalDetail/HospitalDoctors';
import HospitalReviews from '../components/HospitalDetail/HospitalReviews';
import BookingSection from '../components/HospitalDetail/BookingSection';
import { hospitalsApi } from '../lib/api';

const HospitalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: hospitalResponse, isLoading, error } = useQuery({
    queryKey: ['hospital', id],
    queryFn: () => hospitalsApi.getHospitalById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const hospital = hospitalResponse?.data;

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 py-16 text-center">
          <Spin size="large" />
          <p className="text-gray-600 mt-4">Đang tải thông tin bệnh viện...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !hospital) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Bệnh viện không tồn tại</h1>
          <p className="text-gray-600 mb-6">
            {error instanceof Error ? error.message : 'Bệnh viện bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}
          </p>
          <Link to="/hospitals">
            <Button>Quay lại danh sách bệnh viện</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const tabs = [
    {
      id: 'overview',
      label: 'Tổng quan',
      content: <HospitalOverview hospital={hospital} />
    },
    // {
    //   id: 'services',
    //   label: 'Dịch vụ',
    //   content: <HospitalServices hospital={hospital} />
    // },
    {
      id: 'doctors',
      label: 'Bác sĩ',
      content: <HospitalDoctors hospital={hospital} />
    },
    // {
    //   id: 'reviews',
    //   label: 'Đánh giá',
    //   content: <HospitalReviews hospital={hospital} />
    // }
  ];

  return (
    <MainLayout>
      {/* Hospital header with background image */}
      <div 
        className="w-full h-48 md:h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${hospital.hospitalAvatar})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 h-full flex items-end pb-4 md:pb-6 relative z-10">
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{hospital.hospitalName}</h1>
            <div className="flex items-center mb-2 md:mb-3">
              <Phone className="h-4 w-4 md:h-5 md:w-5 mr-1" />
              <span className="text-sm md:text-base">{hospital.hospitalPhone}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm md:text-base">
              <div className="flex items-center">
                <Users className="h-4 w-4 md:h-5 md:w-5 mr-1" />
                <span>{hospital.doctors.length} bác sĩ</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 md:h-5 md:w-5 mr-1" />
                <span>{hospital.hospitalSpecs.length} chuyên khoa</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book appointment button for mobile */}
      <div className="md:hidden bg-white shadow-md py-4 px-4 sticky top-16 z-30">
        <Link to={`/booking?hospitalId=${hospital.hospitalId}`}>
          <Button fullWidth>Đặt lịch khám</Button>
        </Link>
      </div>

      {/* Content section */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="lg:w-2/3">
            <Tabs tabs={tabs} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <Card className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Thông tin nhanh</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-gray-600 text-sm">Tên bệnh viện</p>
                    <p className="font-medium">{hospital.hospitalName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Số điện thoại</p>
                    <p className="font-medium">{hospital.hospitalPhone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Số lượng bác sĩ</p>
                    <p className="font-medium">{hospital.doctors.length} bác sĩ</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Chuyên khoa</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {hospital.hospitalSpecs.slice(0, 4).map((spec) => (
                        <span key={spec.id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {spec.specName}
                        </span>
                      ))}
                      {hospital.hospitalSpecs.length > 4 && (
                        <span className="text-xs text-gray-500">+{hospital.hospitalSpecs.length - 4} khác</span>
                      )}
                    </div>
                  </div>
                </div>
                <Link to={`/booking?hospitalId=${hospital.hospitalId}`}>
                  <Button fullWidth size="lg">Đặt lịch khám</Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HospitalDetailPage;