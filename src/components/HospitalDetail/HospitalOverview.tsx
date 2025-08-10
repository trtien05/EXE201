import React from "react";
import { Users, Award, Building, MapPin } from "lucide-react";

interface HospitalOverviewProps {
  hospital: any; // Use API response type
}

const HospitalOverview: React.FC<HospitalOverviewProps> = ({ hospital }) => {
  // API fields: hospitalName, hospitalAddress, hospitalPhone, hosServs, hospitalSpecs, hospitalAvatar, etc.
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Giới thiệu</h3>
        <p className="text-gray-600 leading-relaxed">
          {hospital?.hospitalDescription || "Chưa có mô tả."}
        </p>
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
              <span className="text-gray-600">
                {hospital?.hospitalName || "-"}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-[#0077B6] mr-3 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-700">Địa chỉ: </span>
              <span className="text-gray-600">
                {hospital?.hospitalAddress || "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Thống kê */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Thống kê</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-[#0077B6] mr-3" />
              <div>
                <p className="text-2xl font-bold text-[#0077B6]">
                  {hospital?.doctors ? hospital.doctors.length : 0}
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
                  {hospital?.hosServs ? hospital.hosServs.length : 0}
                </p>
                <p className="text-sm text-gray-600">Dịch vụ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Đánh giá */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Đánh giá</h3>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Award className="h-6 w-6 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {hospital?.hospitalRating
                  ? hospital.hospitalRating.toFixed(1)
                  : "-"}
                /5
              </p>
              <p className="text-sm text-gray-600">
                ({hospital?.hospitalReviewCount || 0} đánh giá)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalOverview;
