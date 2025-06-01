import React from 'react';
import { FileText } from 'lucide-react';
import { Service, departments } from '../../data/mockData';

interface ServiceInfoProps {
  service: Service;
}

const ServiceInfo: React.FC<ServiceInfoProps> = ({ service }) => {
  const department = departments.find(d => d.id === service.departmentId);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start mb-6">
        <div className="rounded-full bg-blue-100 p-3 mr-4 flex-shrink-0">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{service.name}</h1>
          {department && (
            <p className="text-gray-600 mb-3">Chuyên khoa: {department.name}</p>
          )}
          <p className="text-lg text-[#0077B6] font-medium mb-4">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Mô tả dịch vụ</h2>
        <p className="text-gray-600">{service.description}</p>
      </div>
      
      {department && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Thông tin chuyên khoa</h2>
          <p className="text-gray-600">{department.description}</p>
        </div>
      )}
    </div>
  );
};

export default ServiceInfo;