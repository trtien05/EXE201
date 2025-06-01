import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ServiceInfo from '../components/ServiceDetail/ServiceInfo';
import ServiceDoctors from '../components/ServiceDetail/ServiceDoctors';
import ServiceHospitals from '../components/ServiceDetail/ServiceHospitals';
import Button from '../components/ui/Button';
import { services } from '../data/mockData';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <MainLayout>
        <div className="container mx-auto px-52 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Dịch vụ không tồn tại</h1>
          <p className="text-gray-600 mb-6">Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/services">
            <Button>Quay lại danh sách dịch vụ</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-52 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="lg:w-2/3">
            <ServiceInfo service={service} />
            <ServiceDoctors service={service} />
            <ServiceHospitals service={service} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Đặt lịch dịch vụ</h3>
              <p className="text-gray-600 mb-2">Giá dịch vụ:</p>
              <p className="text-2xl font-bold text-[#0077B6] mb-6">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
              </p>
              <p className="text-gray-600 mb-6">
                Đặt lịch dịch vụ {service.name} ngay hôm nay để được chăm sóc tốt nhất.
              </p>
              <Link to={`/booking?serviceId=${service.id}`}>
                <Button fullWidth size="lg">Đặt lịch ngay</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceDetailPage;