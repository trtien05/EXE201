import React from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { doctors, hospitals } from "../../data/mockData";

const TopDoctors: React.FC = () => {
  const topDoctors = doctors.slice(0, 4); // Get first 4 doctors

  // Helper function to get hospital name
  const getHospitalName = (hospitalId: string) => {
    const hospital = hospitals.find((h) => h.id === hospitalId);
    return hospital?.name || "Unknown Hospital";
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-52">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Bác sĩ nổi bật
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-lg">
              Các bác sĩ có chuyên môn cao và được đánh giá tốt từ bệnh nhân
            </p>
          </div>
          <Link
            to="/doctors"
            className="text-[#0077B6] hover:text-[#0077B6] font-medium text-sm sm:text-base whitespace-nowrap"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {topDoctors.map((doctor) => (
            <Card key={doctor.id} hoverable className="text-center">
              <div className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 line-clamp-2">
                  {doctor.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-2 line-clamp-1">
                  {getHospitalName(doctor.hospitalId)}
                </p>
                <p className="text-sm font-medium text-[#0077B6] mb-2">
                  {new Intl.NumberFormat("vi-VN").format(
                    doctor.consultationFee
                  )}
                  đ
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 line-clamp-2">
                  {doctor.specialty}
                </p>
              </div>
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <Link to={`/doctors/${doctor.id}`}>
                  <Button
                    fullWidth
                    className="text-sm sm:text-base py-2 sm:py-3"
                  >
                    Đặt lịch khám
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;
