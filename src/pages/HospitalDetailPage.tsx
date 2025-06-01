import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';
import HospitalOverview from '../components/HospitalDetail/HospitalOverview';
import HospitalServices from '../components/HospitalDetail/HospitalServices';
import HospitalDoctors from '../components/HospitalDetail/HospitalDoctors';
import HospitalReviews from '../components/HospitalDetail/HospitalReviews';
import BookingSection from '../components/HospitalDetail/BookingSection';
import { hospitals } from '../data/mockData';

const HospitalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const hospital = hospitals.find(h => h.id === id);

  if (!hospital) {
    return (
      <MainLayout>
        <div className="container mx-auto px-52 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Bệnh viện không tồn tại</h1>
          <p className="text-gray-600 mb-6">Bệnh viện bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
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
    {
      id: 'services',
      label: 'Dịch vụ',
      content: <HospitalServices hospital={hospital} />
    },
    {
      id: 'doctors',
      label: 'Bác sĩ',
      content: <HospitalDoctors hospital={hospital} />
    },
    {
      id: 'reviews',
      label: 'Đánh giá',
      content: <HospitalReviews hospital={hospital} />
    }
  ];

  return (
    <MainLayout>
      {/* Hospital header with background image */}
      <div 
        className="w-full h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${hospital.thumbnail})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="container mx-auto px-52 h-full flex items-end pb-6 relative z-10">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">{hospital.name}</h1>
            <div className="flex items-center mb-3">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{hospital.address}</span>
            </div>
            <div className="flex items-center">
              <Rating value={hospital.rating} className="mr-2" />
              <span>({hospital.reviews.length} đánh giá)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Book appointment button for mobile */}
      <div className="md:hidden bg-white shadow-md py-4 px-4 sticky top-16 z-30">
        <Link to={`/booking?hospitalId=${hospital.id}`}>
          <Button fullWidth>Đặt lịch khám</Button>
        </Link>
      </div>

      {/* Content section */}
      <div className="container mx-auto px-52 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="lg:w-2/3">
            <Tabs tabs={tabs} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <BookingSection hospital={hospital} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HospitalDetailPage;