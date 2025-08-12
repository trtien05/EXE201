import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Doctor } from "../../data/mockData";
import Button from "../ui/Button";

const DoctorTimeSlots = (data: {
  hospital?: any;
  doctor?: any;
  service?: any;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // Generate next 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const morningSlots = ["07:00 - 09:00", "09:00 - 11:00", "11:00 - 13:00"];
  const afternoonSlots = ["15:00 - 17:00", "17:00 - 19:00"];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Lịch trống gần nhất
      </h2>

      <div className="mb-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Sáng ({morningSlots.length})</h3>
            <div className="grid grid-cols-4 gap-2">
              {morningSlots.map((time, index) => (
                <Link
                  key={index}
                  to={`/booking?time=${time}&doctorId=${data.doctor?.doctorId}&serviceId=${data.service?.servId}&hospitalId=${data.hospital?.hospitalId}`}
                  className="text-center py-2 px-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm"
                >
                  {time}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">
              Chiều ({afternoonSlots.length})
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {afternoonSlots.map((time, index) => (
                <Link
                  key={index}
                  to={`/booking?time=${time}&doctorId=${data.doctor?.doctorId}&serviceId=${data.service?.servId}&hospitalId=${data.hospital?.hospitalId}`}
                  className="text-center py-2 px-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm"
                >
                  {time}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorTimeSlots;
