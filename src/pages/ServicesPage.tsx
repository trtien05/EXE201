import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import Card, { CardBody } from "../components/ui/Card";
import { hosservApi } from "../lib/api";

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await hosservApi.getAllServices(0, 20); // page 0, size 20
        if (res && res.flag && res.data) {
          setServices(res.data.content);
        } else {
          setServices([]);
          setError("Không thể tải danh sách dịch vụ.");
        }
      } catch (err) {
        setServices([]);
        setError("Không thể tải danh sách dịch vụ.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12">
        <div className="container mx-auto px-52">
          <h1 className="text-3xl font-bold text-white mb-4">Dịch vụ y tế</h1>
          <p className="text-white text-opacity-90">
            Các dịch vụ y tế chất lượng cao từ các bệnh viện và phòng khám hàng
            đầu
          </p>
        </div>
      </div>
      <div className="container mx-auto px-52 py-8">
        {loading ? (
          <div className="text-center text-gray-500 py-8">
            Đang tải dịch vụ...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                to={`/services/${service.servId}`}
                key={service.servId}
                className="block h-full"
              >
                <Card hoverable className="h-full">
                  <CardBody className="flex items-start h-full">
                    {service.servImage ? (
                      <img
                        src={service.servImage}
                        alt={service.servName}
                        className="w-14 h-14 object-cover rounded-full mr-4 flex-shrink-0 border border-blue-200"
                      />
                    ) : (
                      <div className="rounded-full bg-blue-100 p-3 mr-4 flex-shrink-0">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                    <div className="flex flex-col h-full">
                      <h3 className="font-medium text-gray-800 mb-2">
                        {service.servName}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 flex-grow">
                        {service.servDesc}
                      </p>
                      <p className="text-[#0077B6] font-medium">
                        {(() => {
                          // If price is a string with currency, extract number
                          let price = service.servPrice;
                          if (typeof price === "string") {
                            // Remove non-digit characters except comma and dot
                            price = price.replace(/[^\d.,]/g, "");
                            // Replace comma with empty (for thousands separator)
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
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ServicesPage;
