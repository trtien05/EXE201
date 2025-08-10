import React from "react";
import { Link } from "react-router-dom";
import Card, { CardBody } from "../ui/Card";
import { FileText } from "lucide-react";

interface HospitalServicesProps {
  hospital: any; // Use API response type
}

const HospitalServices: React.FC<HospitalServicesProps> = ({ hospital }) => {
  // API: hospital.hosServs is an array of services
  const hospitalServices = hospital?.hosServs || [];

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Dịch vụ y tế</h3>
      {hospitalServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitalServices.map((service: any) => (
            <Link to={`/services/${service.servId}`} key={service.servId}>
              <Card hoverable className="h-full">
                <CardBody className="flex items-start">
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
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">
                      {service.servName}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {service.servDesc}
                    </p>
                    <p className="text-[#0077B6] font-medium mt-2">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(service.servPrice || 0)}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Không có dịch vụ nào được hiển thị.</p>
      )}
    </div>
  );
};

export default HospitalServices;
