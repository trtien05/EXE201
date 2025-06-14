import React from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DoctorInfo from "../components/DoctorDetail/DoctorInfo";
import DoctorTimeSlots from "../components/DoctorDetail/DoctorTimeSlots";
import DoctorReviews from "../components/DoctorDetail/DoctorReviews";
import Button from "../components/ui/Button";
import { doctors, hospitals } from "../data/mockData";

const DoctorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const doctor = doctors.find((d) => d.id === id);
  const hospital = doctor
    ? hospitals.find((h) => h.id === doctor.hospitalId)
    : null;

  if (!doctor) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Bác sĩ không tồn tại
          </h1>
          <p className="text-gray-600 mb-6">
            Bác sĩ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link to="/doctors">
            <Button>Quay lại danh sách bác sĩ</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="lg:w-2/3">
            <DoctorInfo doctor={doctor} />
            <DoctorTimeSlots doctor={doctor} />
            <DoctorReviews doctor={doctor} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 sticky top-24">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                Thông tin nhanh
              </h3>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Bệnh viện</p>
                  <p className="font-medium">
                    {hospital?.name || "Unknown Hospital"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Phí tư vấn</p>
                  <p className="font-medium text-[#0077B6]">
                    {new Intl.NumberFormat("vi-VN").format(
                      doctor.consultationFee
                    )}
                    đ
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Chuyên khoa</p>
                  <p className="font-medium">{doctor.specialty}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Đánh giá</p>
                  <p className="font-medium">
                    {doctor.rating}/5 ({doctor.reviews.length} đánh giá)
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Khung giờ khả dụng</p>
                  <p className="font-medium">
                    {
                      doctor.availableTimeSlots.filter(
                        (slot) => slot.isAvailable
                      ).length
                    }{" "}
                    khung giờ
                  </p>
                </div>
              </div>
              <Link to={`/booking?doctorId=${doctor.id}`}>
                <Button fullWidth size="lg">
                  Đặt lịch ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorDetailPage;
