import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { hospitalsApi, Hospital } from "../../lib/api";

const PopularHospitals: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const res = await hospitalsApi.getAllHospitals(0, 3);
        setHospitals(res.data.content);
      } catch (err) {
        setError("Không thể tải danh sách bệnh viện.");
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-52">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Bệnh viện nổi bật
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-lg">
              Các bệnh viện và phòng khám hàng đầu với cơ sở vật chất hiện đại
            </p>
          </div>
          <Link
            to="/hospitals"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {hospitals.map((hospital) => (
              <Card
                key={hospital.hospitalId}
                hoverable
                className="h-full flex flex-col"
              >
                <div className="h-40 sm:h-48 overflow-hidden">
                  <img
                    src={hospital.hospitalAvatar}
                    alt={hospital.hospitalName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {hospital.hospitalName}
                  </h3>
                  <div className="flex items-center mb-3">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 text-xs sm:text-sm">
                      {hospital.hospitalPhone}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2 flex-grow">
                    {hospital.hospitalDescription}
                  </p>
                  {/* You can add hospital specialties or services here if needed */}
                  <div className="mt-auto">
                    <Link to={`/hospitals/${hospital.hospitalId}`}>
                      <Button
                        fullWidth
                        className="text-sm sm:text-base py-2 sm:py-3"
                      >
                        Đặt lịch khám
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularHospitals;
