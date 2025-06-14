import React from "react";
import {
  User,
  Clock,
  GraduationCap,
  Briefcase,
  Star,
  MapPin,
} from "lucide-react";
import { Doctor, hospitals } from "../../data/mockData";

interface DoctorInfoProps {
  doctor: Doctor;
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => {
  // Get hospital information
  const hospital = hospitals.find((h) => h.id === doctor.hospitalId);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {doctor.name}
          </h1>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            {doctor.bio}
          </p>

          <div className="flex items-center mb-3">
            <User className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700 text-sm md:text-base">
              Chuyên khoa: {doctor.specialty}
            </span>
          </div>

          <div className="flex items-center mb-3">
            <MapPin className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700 text-sm md:text-base">
              Bệnh viện: {hospital?.name || "Unknown Hospital"}
            </span>
          </div>

          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700 text-sm md:text-base">
              Phí tư vấn:{" "}
              <span className="font-medium text-[#0077B6]">
                {new Intl.NumberFormat("vi-VN").format(doctor.consultationFee)}đ
              </span>
            </span>
          </div>

          <div className="flex items-center mb-3">
            <Star className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700 text-sm md:text-base">
              Đánh giá: {doctor.rating}/5 ({doctor.reviews.length} đánh giá)
            </span>
          </div>

          <div className="flex items-center">
            <Briefcase className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700 text-sm md:text-base">
              Khung giờ khả dụng:{" "}
              {
                doctor.availableTimeSlots.filter((slot) => slot.isAvailable)
                  .length
              }{" "}
              khung giờ
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
              <p className="text-sm text-gray-600">Chức danh</p>
              <p className="font-medium text-gray-800">{doctor.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Chuyên khoa</p>
              <p className="font-medium text-gray-800">{doctor.specialty}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bệnh viện</p>
              <p className="font-medium text-gray-800">
                {hospital?.name || "Unknown Hospital"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Đánh giá</p>
              <p className="font-medium text-gray-800">{doctor.rating}/5 ⭐</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User className="h-5 w-5 text-[#0077B6] mr-2" />
          Giới thiệu
        </h3>
        <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
      </div>
    </div>
  );
};

export default DoctorInfo;
