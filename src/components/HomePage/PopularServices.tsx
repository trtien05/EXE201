import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import Card, { CardBody } from '../ui/Card';
import { services } from '../../data/mockData';

const PopularServices: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-52">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Dịch vụ phổ biến</h2>
            <p className="text-gray-600">Các dịch vụ y tế được tìm kiếm và đặt lịch nhiều nhất</p>
          </div>
          <Link to="/services" className="text-[#0077B6] hover:text-[#0077B6] font-medium mt-4 md:mt-0">
            Xem tất cả
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <Link to={`/services/${service.id}`} key={service.id}>
              <Card hoverable className="h-full">
                <CardBody className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-3 mr-4 flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>
                    <p className="text-[#0077B6] font-medium mt-2">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;