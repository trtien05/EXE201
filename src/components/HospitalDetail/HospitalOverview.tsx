import React from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { Hospital } from '../../data/mockData';

interface HospitalOverviewProps {
  hospital: Hospital;
}

const HospitalOverview: React.FC<HospitalOverviewProps> = ({ hospital }) => {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Giới thiệu</h3>
        <p className="text-gray-600">{hospital.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Địa chỉ</h3>
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-[#0077B6] mt-0.5 mr-2 flex-shrink-0" />
          <span className="text-gray-600">{hospital.address}</span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Giờ làm việc</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(hospital.openingHours).map(([day, hours]) => (
            <div key={day} className="flex items-center">
              <Calendar className="h-5 w-5 text-[#0077B6] mr-2 flex-shrink-0" />
              <span className="text-gray-700 font-medium mr-2">{day}:</span>
              <span className="text-gray-600">{hours}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalOverview;