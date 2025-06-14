import React, { useState } from "react";
import { Calendar, Baby } from "lucide-react";
import Button from "../ui/Button";
import { toast } from "react-toastify";

const DueDateCalculator: React.FC = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);

  const calculateDueDate = () => {
    if (!lastPeriodDate) {
      toast.error("Vui lòng nhập ngày kinh nguyệt cuối cùng!");
      return;
    }

    const lastPeriod = new Date(lastPeriodDate);
    const calculatedDueDate = new Date(lastPeriod);
    calculatedDueDate.setDate(calculatedDueDate.getDate() + 280); // 40 weeks

    const today = new Date();
    const timeDiff = today.getTime() - lastPeriod.getTime();
    const weeksPassed = Math.floor(timeDiff / (1000 * 3600 * 24 * 7));

    setDueDate(calculatedDueDate);
    setCurrentWeek(weeksPassed > 0 ? weeksPassed : 0);
    toast.success("Đã tính toán ngày sinh dự kiến!");
  };

  const resetCalculator = () => {
    setLastPeriodDate("");
    setCycleLength(28);
    setDueDate(null);
    setCurrentWeek(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày kinh nguyệt cuối cùng
          </label>
          <input
            type="date"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chu kỳ kinh nguyệt (ngày)
          </label>
          <input
            type="number"
            min="21"
            max="35"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={calculateDueDate}
          className="bg-pink-600 hover:bg-pink-700"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Tính toán
        </Button>
        <Button onClick={resetCalculator} variant="outline">
          Làm mới
        </Button>
      </div>

      {dueDate && (
        <div className="bg-pink-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Baby className="h-6 w-6 text-pink-600 mr-2" />
            <h3 className="text-lg font-semibold text-pink-800">
              Kết quả tính toán
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Ngày sinh dự kiến</p>
              <p className="text-xl font-bold text-pink-600">
                {dueDate.toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Tuần thai hiện tại</p>
              <p className="text-xl font-bold text-pink-600">
                {currentWeek !== null ? `${currentWeek} tuần` : "Chưa xác định"}
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-pink-100 rounded-lg">
            <p className="text-sm text-pink-700">
              <strong>Lưu ý:</strong> Đây chỉ là ước tính dựa trên chu kỳ kinh
              nguyệt. Ngày sinh thực tế có thể chênh lệch 1-2 tuần so với dự
              kiến.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DueDateCalculator;
