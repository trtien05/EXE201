import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { doctorsApi, hospitalsApi, Doctor, Hospital } from "../../lib/api";

const TopDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [doctorRes, hospitalRes] = await Promise.all([
          doctorsApi.getAllDoctors(0, 4),
          hospitalsApi.getAllHospitals(0, 50),
        ]);
        setDoctors(doctorRes.data.content);
        setHospitals(hospitalRes.data.content);
      } catch (err) {
        setError("Không thể tải danh sách bác sĩ hoặc bệnh viện.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper function to get hospital name
  const getHospitalName = (hospitalId: string) => {
    const hospital = hospitals.find((h) => h.hospitalId === hospitalId);
    return hospital?.hospitalName || "Unknown Hospital";
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

        {loading ? (
          <div className="text-center py-10 text-gray-500">Đang tải...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {doctors.map((doctor) => (
              <Card key={doctor.doctorId} hoverable className="text-center">
                <div className="pt-4 sm:pt-6 px-4 sm:px-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden">
                    <img
                      src={doctor.doctorAvatar}
                      alt={doctor.doctorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 line-clamp-2">
                    {doctor.doctorName}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-2 line-clamp-1">
                    {getHospitalName(doctor.hospitalId)}
                  </p>
                  <p className="text-sm font-medium text-[#0077B6] mb-2">
                    {new Intl.NumberFormat("vi-VN").format(doctor.doctorPrice)}đ
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 line-clamp-2">
                    {doctor.doctorDescription}
                  </p>
                </div>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <Link to={`/doctors/${doctor.doctorId}`}>
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
        )}
      </div>
    </section>
  );
};

export default TopDoctors;
