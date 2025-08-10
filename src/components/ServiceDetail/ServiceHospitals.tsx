import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { hospitalsApi } from "../../lib/api";
import Card from "../ui/Card";
import Button from "../ui/Button";

interface ServiceHospitalsProps {
  service: any; // Use API response type
}

const ServiceHospitals: React.FC<ServiceHospitalsProps> = ({ service }) => {
  const [hospital, setHospital] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchHospital = async () => {
      if (!service.hospitalId) return;
      setLoading(true);
      setError("");
      try {
        const res = await hospitalsApi.getHospitalById(service.hospitalId);
        if (res && res.flag && res.data) {
          setHospital(res.data);
        } else {
          setError("Không thể tải thông tin bệnh viện.");
        }
      } catch (err) {
        setError("Không thể tải thông tin bệnh viện.");
      } finally {
        setLoading(false);
      }
    };
    fetchHospital();
  }, [service.hospitalId]);
  console.log("hospital:", hospital);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Bệnh viện cung cấp dịch vụ
      </h2>
      {loading ? (
        <p className="text-gray-500">Đang tải bệnh viện...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : hospital ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            key={hospital.hospitalId}
            hoverable
            className="h-full flex flex-col"
          >
            <div className="h-40 md:h-48 overflow-hidden">
              <img
                src={hospital.hospitalAvatar}
                alt={hospital.hospitalName}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4 md:p-5 flex flex-col flex-grow">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                {hospital.hospitalName}
              </h3>
              <div className="flex items-center mb-2">
                <Phone className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  {hospital.hospitalPhone}
                </span>
              </div>
              <p className="text-gray-600 text-sm md:text-base mb-3 line-clamp-2 flex-grow">
                {hospital.hospitalDescription}
              </p>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Chuyên khoa:</p>
                <div className="flex flex-wrap gap-1">
                  {hospital.hospitalSpecs &&
                    hospital.hospitalSpecs.slice(0, 3).map((spec: any) => (
                      <span
                        key={spec.id}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {spec.specName}
                      </span>
                    ))}
                  {hospital.hospitalSpecs &&
                    hospital.hospitalSpecs.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{hospital.hospitalSpecs.length - 3} khác
                      </span>
                    )}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Dịch vụ nổi bật:</p>
                <div className="flex flex-wrap gap-1">
                  {hospital.hosServs &&
                    hospital.hosServs.slice(0, 3).map((serv: any) => (
                      <span
                        key={serv.servId}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {serv.servName}
                      </span>
                    ))}
                  {hospital.hosServs && hospital.hosServs.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{hospital.hosServs.length - 3} khác
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-auto">
                <Link to={`/hospitals/${hospital.hospitalId}`}>
                  <Button fullWidth>Xem chi tiết</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <p className="text-gray-500">Không có bệnh viện nào được hiển thị.</p>
      )}
    </div>
  );
};

export default ServiceHospitals;
