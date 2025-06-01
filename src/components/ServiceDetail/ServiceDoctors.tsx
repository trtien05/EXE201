import React from 'react';
import { Link } from 'react-router-dom';
import { Service, doctors as allDoctors } from '../../data/mockData';
import Card from '../ui/Card';
import Rating from '../ui/Rating';
import Button from '../ui/Button';

interface ServiceDoctorsProps {
  service: Service;
}

const ServiceDoctors: React.FC<ServiceDoctorsProps> = ({ service }) => {
  // Filter doctors providing this service
  const serviceDoctors = allDoctors.filter(doctor => 
    service.doctorIds.includes(doctor.id)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Bác sĩ thực hiện dịch vụ</h2>
      
      {serviceDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceDoctors.map(doctor => (
            <Card key={doctor.id} hoverable className="text-center">
              <div className="pt-6 px-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={doctor.photo} 
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{doctor.name}</h3>
                <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                <div className="flex justify-center mb-3">
                  <Rating value={doctor.rating} showValue />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Phí tư vấn: <span className="font-medium text-[#0077B6]">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(doctor.consultationFee)}
                  </span>
                </p>
              </div>
              <div className="px-6 pb-6">
                <Link to={`/booking?doctorId=${doctor.id}&serviceId=${service.id}`}>
                  <Button fullWidth>Đặt lịch với bác sĩ</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Không có bác sĩ nào được hiển thị.</p>
      )}
    </div>
  );
};

export default ServiceDoctors;