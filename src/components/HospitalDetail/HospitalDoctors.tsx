import React from 'react';
import { Link } from 'react-router-dom';
import { Hospital } from '../../lib/api';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface HospitalDoctorsProps {
  hospital: Hospital;
}

const HospitalDoctors: React.FC<HospitalDoctorsProps> = ({ hospital }) => {
  const hospitalDoctors = hospital.doctors || [];

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Bác sĩ ({hospitalDoctors.length})
      </h3>
      
      {hospitalDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitalDoctors.map(doctor => (
            <Card key={doctor.doctorId} hoverable className="text-center">
              <div className="pt-6 px-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={doctor.doctorAvatar} 
                    alt={doctor.doctorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                  {doctor.doctorName}
                </h3>
                <p className="text-gray-600 mb-2 text-sm line-clamp-2">
                  {doctor.doctorDescription}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Phí tư vấn: <span className="font-medium text-[#0077B6]">${doctor.doctorPrice}</span>
                </p>
                <div className="text-xs text-gray-500 mb-3">
                  <p>Học vấn: {doctor.educations.length} bằng cấp</p>
                  <p>Kinh nghiệm: {doctor.workExperiences.length} vị trí</p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Link to={`/doctors/${doctor.doctorId}`}>
                  <Button fullWidth>Xem chi tiết</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Hiện tại chưa có thông tin bác sĩ tại bệnh viện này.</p>
        </div>
      )}
    </div>
  );
};

export default HospitalDoctors;