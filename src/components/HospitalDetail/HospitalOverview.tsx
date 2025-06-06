import React from 'react';
import { Phone, Users, Award, Building } from 'lucide-react';
import { Hospital } from '../../lib/api';

interface HospitalOverviewProps {
  hospital: Hospital;
}

const HospitalOverview: React.FC<HospitalOverviewProps> = ({ hospital }) => {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Giới thiệu</h3>
        <p className="text-gray-600 leading-relaxed">{hospital.hospitalDescription}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Thông tin liên hệ</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <Building className="h-5 w-5 text-[#0077B6] mr-3 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-700">Tên bệnh viện: </span>
              <span className="text-gray-600">{hospital.hospitalName}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-[#0077B6] mr-3 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-700">Số điện thoại: </span>
              <span className="text-gray-600">{hospital.hospitalPhone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Thống kê</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-[#0077B6] mr-3" />
              <div>
                <p className="text-2xl font-bold text-[#0077B6]">{hospital.doctors.length}</p>
                <p className="text-sm text-gray-600">Bác sĩ</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Award className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-green-600">{hospital.hospitalSpecs.length}</p>
                <p className="text-sm text-gray-600">Chuyên khoa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Chuyên khoa</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {hospital.hospitalSpecs.map((spec) => (
            <div key={spec.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Award className="h-4 w-4 text-[#0077B6] mr-2 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{spec.specName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalOverview;