import React, { useState } from "react";
import { Scale, TrendingUp } from "lucide-react";
import Button from "../ui/Button";
import { toast } from "react-toastify";

const PregnancyWeight: React.FC = () => {
  const [prePregnancyWeight, setPrePregnancyWeight] = useState("");
  const [height, setHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [weeksPregnant, setWeeksPregnant] = useState("");
  const [results, setResults] = useState<{
    preBMI: number;
    category: string;
    recommendedGain: string;
    currentGain: number;
    status: string;
  } | null>(null);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Thiếu cân", gainRange: "12.5-18 kg" };
    if (bmi < 25) return { category: "Bình thường", gainRange: "11.5-16 kg" };
    if (bmi < 30) return { category: "Thừa cân", gainRange: "7-11.5 kg" };
    return { category: "Béo phì", gainRange: "5-9 kg" };
  };

  const calculatePregnancyWeight = () => {
    if (!prePregnancyWeight || !height || !currentWeight || !weeksPregnant) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const weightKg = parseFloat(prePregnancyWeight);
    const heightM = parseFloat(height) / 100;
    const currentWeightKg = parseFloat(currentWeight);
    const weeks = parseInt(weeksPregnant);

    const preBMI = weightKg / (heightM * heightM);
    const bmiInfo = getBMICategory(preBMI);
    const currentGain = currentWeightKg - weightKg;

    let status = "Bình thường";
    if (weeks > 12) {
      const expectedGainMin = weeks * 0.3; // Simplified calculation
      const expectedGainMax = weeks * 0.5;

      if (currentGain < expectedGainMin) {
        status = "Dưới mức khuyến nghị";
      } else if (currentGain > expectedGainMax) {
        status = "Trên mức khuyến nghị";
      }
    }

    setResults({
      preBMI: parseFloat(preBMI.toFixed(1)),
      category: bmiInfo.category,
      recommendedGain: bmiInfo.gainRange,
      currentGain: parseFloat(currentGain.toFixed(1)),
      status,
    });

    toast.success("Đã tính toán cân nặng thai kỳ!");
  };

  const resetCalculator = () => {
    setPrePregnancyWeight("");
    setHeight("");
    setCurrentWeight("");
    setWeeksPregnant("");
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cân nặng trước khi mang thai (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={prePregnancyWeight}
            onChange={(e) => setPrePregnancyWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="VD: 55.0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chiều cao (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="VD: 160"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cân nặng hiện tại (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="VD: 58.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tuần thai hiện tại
          </label>
          <input
            type="number"
            min="1"
            max="42"
            value={weeksPregnant}
            onChange={(e) => setWeeksPregnant(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="VD: 20"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={calculatePregnancyWeight}
          className="bg-green-600 hover:bg-green-700"
        >
          <Scale className="h-4 w-4 mr-2" />
          Tính toán
        </Button>
        <Button onClick={resetCalculator} variant="outline">
          Làm mới
        </Button>
      </div>

      {results && (
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">
              Kết quả tính toán
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">BMI trước thai kỳ</p>
              <p className="text-lg font-bold text-green-600">
                {results.preBMI} ({results.category})
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Tăng cân khuyến nghị</p>
              <p className="text-lg font-bold text-green-600">
                {results.recommendedGain}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Tăng cân hiện tại</p>
              <p className="text-lg font-bold text-green-600">
                {results.currentGain > 0 ? "+" : ""}
                {results.currentGain} kg
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Tình trạng</p>
              <p
                className={`text-lg font-bold ${
                  results.status === "Bình thường"
                    ? "text-green-600"
                    : results.status === "Dưới mức khuyến nghị"
                    ? "text-blue-600"
                    : "text-orange-600"
                }`}
              >
                {results.status}
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>Lưu ý:</strong> Mức tăng cân trong thai kỳ phụ thuộc vào
              nhiều yếu tố. Vui lòng tham khảo ý kiến bác sĩ để có kế hoạch dinh
              dưỡng phù hợp.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PregnancyWeight;
