import React, { useState } from "react";
import { Heart, Calendar } from "lucide-react";
import Button from "../ui/Button";
import { toast } from "react-toastify";

const OvulationCalculator: React.FC = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [results, setResults] = useState<{
    ovulationDate: Date;
    fertileStart: Date;
    fertileEnd: Date;
    nextPeriod: Date;
  } | null>(null);

  const calculateOvulation = () => {
    if (!lastPeriodDate) {
      toast.error("Vui lòng nhập ngày kinh nguyệt cuối cùng!");
      return;
    }

    const lastPeriod = new Date(lastPeriodDate);
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(ovulationDate.getDate() + (cycleLength - 14));

    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    setResults({
      ovulationDate,
      fertileStart,
      fertileEnd,
      nextPeriod,
    });

    toast.success("Đã tính toán chu kỳ rụng trứng!");
  };

  const resetCalculator = () => {
    setLastPeriodDate("");
    setCycleLength(28);
    setResults(null);
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={calculateOvulation}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Heart className="h-4 w-4 mr-2" />
          Tính toán
        </Button>
        <Button onClick={resetCalculator} variant="outline">
          Làm mới
        </Button>
      </div>

      {results && (
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Heart className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-800">
              Kết quả tính toán
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">
                Ngày rụng trứng dự kiến
              </p>
              <p className="text-lg font-bold text-blue-600">
                {results.ovulationDate.toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Thời kỳ dễ thụ thai</p>
              <p className="text-lg font-bold text-blue-600">
                {results.fertileStart.toLocaleDateString("vi-VN")} -{" "}
                {results.fertileEnd.toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">
                Kinh nguyệt tiếp theo
              </p>
              <p className="text-lg font-bold text-blue-600">
                {results.nextPeriod.toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Chu kỳ hiện tại</p>
              <p className="text-lg font-bold text-blue-600">
                {cycleLength} ngày
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Lưu ý:</strong> Thời điểm rụng trứng có thể thay đổi tùy
              theo chu kỳ cá nhân. Kết quả này chỉ mang tính chất tham khảo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OvulationCalculator;
