import React from 'react';
import { User, Clock } from 'lucide-react';
import { Doctor, hospitals } from '../../data/mockData';
import Rating from '../ui/Rating';

interface DoctorInfoProps {
  doctor: Doctor;
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => {
  const hospital = hospitals.find(h => h.id === doctor.hospitalId);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
          <div className="w-40 h-40 rounded-full overflow-hidden">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{doctor.name}</h1>
          <p className="text-gray-600 mb-3">{doctor.title} - {doctor.specialty}</p>
          
          <div className="flex items-center mb-4">
            <Rating value={doctor.rating} showValue className="mr-4" />
            <span className="text-gray-500 text-sm">
              ({doctor.reviews.length} đánh giá)
            </span>
          </div>
          
          {hospital && (
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-[#0077B6] mr-2" />
              <span className="text-gray-700">Bệnh viện: {hospital.name}</span>
            </div>
          )}
          
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700">
              Phí tư vấn: <span className="font-medium text-[#0077B6]">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(doctor.consultationFee)}
              </span>
            </span>
          </div>
          
          <p className="text-gray-600">{doctor.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;