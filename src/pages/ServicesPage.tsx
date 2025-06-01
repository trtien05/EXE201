import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardBody } from '../components/ui/Card';
import { services } from '../data/mockData';

const ServicesPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12">
        <div className="container mx-auto px-52">
          <h1 className="text-3xl font-bold text-white mb-4">Dịch vụ y tế</h1>
          <p className="text-white text-opacity-90">
            Các dịch vụ y tế chất lượng cao từ các bệnh viện và phòng khám hàng đầu
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-52 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link to={`/services/${service.id}`} key={service.id} className="block h-full">
              <Card hoverable className="h-full">
                <CardBody className="flex items-start h-full">
                  <div className="rounded-full bg-blue-100 p-3 mr-4 flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col h-full">
                    <h3 className="font-medium text-gray-800 mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 flex-grow">{service.description}</p>
                    <p className="text-[#0077B6] font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ServicesPage;