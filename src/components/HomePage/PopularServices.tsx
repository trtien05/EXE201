import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import Card, { CardBody } from "../ui/Card";
import { hosservApi, HospitalService } from "../../lib/api";

const PopularServices: React.FC = () => {
  const [services, setServices] = useState<HospitalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await hosservApi.getAllServices(0, 8);
        setServices(res.data.content);
      } catch (err) {
        setError("Không thể tải danh sách dịch vụ.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-52">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Dịch vụ phổ biến
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-md">
              Các dịch vụ y tế được tìm kiếm và đặt lịch nhiều nhất
            </p>
          </div>
          <Link
            to="/services"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {services.map((service) => (
              <Link to={`/services/${service.id}`} key={service.id}>
                <Card hoverable className="h-full">
                  <CardBody className="flex items-start p-4 sm:p-5">
                    <div className="rounded-full bg-blue-100 p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-sm sm:text-base text-gray-800 mb-1 line-clamp-2">
                        {service.servName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-2">
                        {service.servDesc}
                      </p>
                      <p className="text-[#0077B6] font-medium text-sm sm:text-base">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(service.servPrice))}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularServices;
