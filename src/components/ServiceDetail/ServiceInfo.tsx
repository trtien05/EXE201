import React from "react";
import { FileText } from "lucide-react";

interface ServiceInfoProps {
  service: any; // Use API response type
}

const ServiceInfo: React.FC<ServiceInfoProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start mb-6">
        <div className="rounded-full bg-blue-100 p-3 mr-4 flex-shrink-0">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {service.servName}
          </h1>
          <p className="text-lg text-[#0077B6] font-medium mb-4">
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
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Mô tả dịch vụ
        </h2>
        <p className="text-gray-600">{service.servDesc}</p>
      </div>
    </div>
  );
};

export default ServiceInfo;
