import React from 'react';
import { Link } from 'react-router-dom';
import { Hospital, doctors as allDoctors } from '../../data/mockData';
import Card from '../ui/Card';
import Rating from '../ui/Rating';
import Button from '../ui/Button';

interface HospitalDoctorsProps {
  hospital: Hospital;
}

const HospitalDoctors: React.FC<HospitalDoctorsProps> = ({ hospital }) => {
  // Filter doctors working at this hospital
  const hospitalDoctors = allDoctors.filter(doctor => 
    doctor.hospitalId === hospital.id
  );

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Bác sĩ</h3>
      
      {hospitalDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitalDoctors.map(doctor => (
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
                <Link to={`/doctors/${doctor.id}`}>
                  <Button fullWidth>Đặt lịch khám</Button>
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

export default HospitalDoctors;