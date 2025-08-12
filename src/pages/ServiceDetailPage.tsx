import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ServiceInfo from "../components/ServiceDetail/ServiceInfo";
import ServiceDoctors from "../components/ServiceDetail/ServiceDoctors";
import ServiceHospitals from "../components/ServiceDetail/ServiceHospitals";
import Button from "../components/ui/Button";
import DoctorTimeSlots from "../components/DoctorDetail/DoctorTimeSlots";
import { hosservApi } from "../lib/api";

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("id:", id);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await hosservApi.getServiceById(id as string);
        if (data) {
          setService(data);
        } else {
          setError("Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.");
        }
      } catch (err) {
        setError("Không thể tải thông tin dịch vụ.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchService();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-52 py-16 text-center">
          <p className="text-gray-600">Đang tải thông tin dịch vụ...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !service) {
    return (
      <MainLayout>
        <div className="container mx-auto px-52 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Dịch vụ không tồn tại
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/services">
            <Button>Quay lại danh sách dịch vụ</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-52 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="lg:w-2/3">
            <ServiceInfo service={service} />
            <DoctorTimeSlots service={service} />

            {/* <ServiceDoctors service={service} /> */}
            <ServiceHospitals service={service} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Đặt lịch dịch vụ
              </h3>
              <p className="text-gray-600 mb-2">Giá dịch vụ:</p>
              <p className="text-2xl font-bold text-[#0077B6] mb-6">
                {(() => {
                  let price = service.servPrice;
                  if (typeof price === "string") {
                    price = price.replace(/[^\d.,]/g, "");
                    price = price.replace(/,/g, "");
                  }
                  const priceNumber = Number(price);
                  return isNaN(priceNumber)
                    ? service.servPrice
                    : new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(priceNumber);
                })()}
              </p>

              <p className="text-gray-600 mb-6">
                Đặt lịch dịch vụ {service.servName} ngay hôm nay để được chăm
                sóc tốt nhất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceDetailPage;
