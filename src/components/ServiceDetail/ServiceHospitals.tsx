import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Service, hospitals as allHospitals } from '../../data/mockData';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ServiceHospitalsProps {
  service: Service;
}

const ServiceHospitals: React.FC<ServiceHospitalsProps> = ({ service }) => {
  // Filter hospitals offering this service
  const serviceHospitals = allHospitals.filter(hospital => 
    service.hospitalIds.includes(hospital.id)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Bệnh viện cung cấp dịch vụ</h2>
      
      {serviceHospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceHospitals.map(hospital => (
            <Card key={hospital.id} hoverable className="flex flex-col">
              <div className="h-40 overflow-hidden">
                <img 
                  src={hospital.thumbnail} 
                  alt={hospital.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{hospital.name}</h3>
                <div className="flex items-start mb-3">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{hospital.address}</span>
                </div>
                <div className="mt-auto">
                  <Link to={`/booking?hospitalId=${hospital.id}&serviceId=${service.id}`}>
                    <Button fullWidth>Đặt lịch tại bệnh viện</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Không có bệnh viện nào được hiển thị.</p>
      )}
    </div>
  );
};

export default ServiceHospitals;