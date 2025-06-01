import React from 'react';
import { Link } from 'react-router-dom';
import { Hospital, services as allServices } from '../../data/mockData';
import Card, { CardBody } from '../ui/Card';
import { FileText } from 'lucide-react';

interface HospitalServicesProps {
  hospital: Hospital;
}

const HospitalServices: React.FC<HospitalServicesProps> = ({ hospital }) => {
  // Filter services available at this hospital
  const hospitalServices = allServices.filter(service => 
    service.hospitalIds.includes(hospital.id)
  );

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Dịch vụ y tế</h3>
      
      {hospitalServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitalServices.map(service => (
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
      ) : (
        <p className="text-gray-500">Không có dịch vụ nào được hiển thị.</p>
      )}
    </div>
  );
};

export default HospitalServices;