import React from "react";
import { Phone, Users, Award, Building, MapPin } from "lucide-react";
import { Hospital } from "../../data/mockData";

interface HospitalOverviewProps {
  hospital: Hospital;
}

const HospitalOverview: React.FC<HospitalOverviewProps> = ({ hospital }) => {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Giới thiệu</h3>
        <p className="text-gray-600 leading-relaxed">{hospital.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Thông tin liên hệ
        </h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <Building className="h-5 w-5 text-[#0077B6] mr-3 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-700">Tên bệnh viện: </span>
              <span className="text-gray-600">{hospital.name}</span>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-[#0077B6] mr-3 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-700">Địa chỉ: </span>
              <span className="text-gray-600">{hospital.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Giờ làm việc
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(hospital.openingHours).map(([day, hours]) => (
            <div
              key={day}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span className="font-medium text-gray-700">{day}:</span>
              <span className="text-gray-600">{hours}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Thống kê</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-[#0077B6] mr-3" />
              <div>
                <p className="text-2xl font-bold text-[#0077B6]">
                  {hospital.doctors.length}
                </p>
                <p className="text-sm text-gray-600">Bác sĩ</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Award className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {hospital.services.length}
                </p>
                <p className="text-sm text-gray-600">Dịch vụ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Đánh giá</h3>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Award className="h-6 w-6 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {hospital.rating}/5
              </p>
              <p className="text-sm text-gray-600">
                ({hospital.reviews.length} đánh giá)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalOverview;
