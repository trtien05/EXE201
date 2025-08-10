import React from "react";
import {
  User,
  Clock,
  GraduationCap,
  Briefcase,
  Star,
  MapPin,
} from "lucide-react";
// import { Doctor, hospitals } from "../../data/mockData";

interface DoctorInfoProps {
  doctor: any; // Use API response type
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
            <img
              src={doctor.doctorAvatar}
              alt={doctor.doctorName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {doctor.doctorName}
          </h1>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            {doctor.doctorDescription}
          </p>

          <div className="flex items-center mb-3">
            <User className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700 text-sm md:text-base">
              Bệnh viện: {doctor.hospitalName || "Unknown Hospital"}
            </span>
          </div>
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700 text-sm md:text-base">
              Phí tư vấn:{" "}
              <span className="font-medium text-[#0077B6]">
                {new Intl.NumberFormat("vi-VN").format(doctor.doctorPrice || 0)}
                đ
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Professional Information Section */}
      <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <GraduationCap className="h-5 w-5 text-[#0077B6] mr-2" />
          Thông tin chuyên môn
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Bệnh viện</p>
              <p className="font-medium text-gray-800">
                {doctor.hospitalName || "Unknown Hospital"}
              </p>
            </div>
            {/* Add more fields as needed from API */}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User className="h-5 w-5 text-[#0077B6] mr-2" />
          Giới thiệu
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {doctor.doctorDescription}
        </p>
      </div>
    </div>
  );
};

export default DoctorInfo;
