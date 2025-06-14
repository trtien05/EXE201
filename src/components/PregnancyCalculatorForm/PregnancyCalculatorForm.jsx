import { useState } from "react";
import "./PregnancyCalculatorForm.css";
import PregnancyCalculationResult from "../PregnancyCalculationResult/PregnancyCalculationResult";

const calculateBMI = (weight, height) => {
  const weightInKg =
    weight.unit === "lb" ? weight.value * 0.45359237 : weight.value;

  // Convert height to meters (meters + centimeters/100)
  const heightInMeters =
    Number(height.meters) + Number(height.centimeters) / 100;

  return weightInKg / (heightInMeters * heightInMeters);
};

const getWeightGainRange = (bmi, isTwins) => {
  if (isTwins) {
    return "17 đến 25 kg";
  }

  if (bmi < 18.5) {
    return "13 đến 18 kg";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "11.5 đến 16 kg";
  } else if (bmi >= 25 && bmi < 30) {
    return "7 đến 11.5 kg";
  } else {
    return "5 đến 9 kg";
  }
};

const PregnancyCalculatorForm = () => {
  const [formData, setFormData] = useState({
    prePregnancyWeight: "",
    prePregnancyUnit: "kg",
    currentWeight: "",
    currentWeightUnit: "kg",
    heightMeters: "",
    heightCentimeters: "",
    isCarryingTwins: false,
    pregnancyWeek: "",
  });

  const [errors, setErrors] = useState({
    prePregnancyWeight: "",
    currentWeight: "",
    heightMeters: "",
    heightCentimeters: "",
    pregnancyWeek: "",
  });

  const [showResults, setShowResults] = useState(false);
  const [calculationResults, setCalculationResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      prePregnancyWeight: "",
      currentWeight: "",
      heightMeters: "",
      heightCentimeters: "",
      pregnancyWeek: "",
    };

    // Validate pre-pregnancy weight
    if (!formData.prePregnancyWeight) {
      newErrors.prePregnancyWeight =
        "Vui lòng nhập cân nặng trước khi mang thai";
      isValid = false;
    } else if (parseFloat(formData.prePregnancyWeight) <= 0) {
      newErrors.prePregnancyWeight = "Cân nặng phải lớn hơn 0";
      isValid = false;
    }

    // Validate current weight
    if (!formData.currentWeight) {
      newErrors.currentWeight = "Vui lòng nhập cân nặng hiện tại";
      isValid = false;
    } else if (parseFloat(formData.currentWeight) <= 0) {
      newErrors.currentWeight = "Cân nặng phải lớn hơn 0";
      isValid = false;
    }

    // Validate height
    if (!formData.heightMeters) {
      newErrors.heightMeters = "Vui lòng nhập chiều cao (mét)";
      isValid = false;
    } else if (parseFloat(formData.heightMeters) < 0) {
      newErrors.heightMeters = "Chiều cao phải là số dương";
      isValid = false;
    }

    if (!formData.heightCentimeters && formData.heightCentimeters !== "0") {
      newErrors.heightCentimeters = "Vui lòng nhập chiều cao (cm)";
      isValid = false;
    } else if (
      parseFloat(formData.heightCentimeters) < 0 ||
      parseFloat(formData.heightCentimeters) >= 100
    ) {
      newErrors.heightCentimeters = "Centimeters phải từ 0 đến 99";
      isValid = false;
    }

    // Validate pregnancy week
    if (!formData.pregnancyWeek) {
      newErrors.pregnancyWeek = "Vui lòng chọn tuần thai";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsCalculating(true);

    // Simulate AI thinking with delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const bmi = calculateBMI(
      {
        value: Number(formData.prePregnancyWeight),
        unit: formData.prePregnancyUnit,
      },
      {
        meters: Number(formData.heightMeters),
        centimeters: Number(formData.heightCentimeters) || 0,
      }
    );

    const weightGainRange = getWeightGainRange(bmi, formData.isCarryingTwins);

    setCalculationResults({
      bmi,
      weightGainRange,
      currentPregnancyWeek: Number(formData.pregnancyWeek),
      prePregnancyWeight: {
        value: Number(formData.prePregnancyWeight),
        unit: formData.prePregnancyUnit,
      },
      currentWeight: {
        value: Number(formData.currentWeight),
        unit: formData.currentWeightUnit,
      },
    });

    setIsCalculating(false);
    setShowResults(true);
  };

  const handleStartOver = () => {
    setShowResults(false);
    setFormData({
      prePregnancyWeight: "",
      prePregnancyUnit: "kg",
      currentWeight: "",
      currentWeightUnit: "kg",
      heightMeters: "",
      heightCentimeters: "",
      isCarryingTwins: false,
      pregnancyWeek: "",
    });
    setErrors({
      prePregnancyWeight: "",
      currentWeight: "",
      heightMeters: "",
      heightCentimeters: "",
      pregnancyWeek: "",
    });
  };

  if (showResults) {
    return (
      <PregnancyCalculationResult
        bmi={calculationResults.bmi}
        weightGainRange={calculationResults.weightGainRange}
        onStartOver={handleStartOver}
        currentPregnancyWeek={calculationResults.currentPregnancyWeek}
        prePregnancyWeight={calculationResults.prePregnancyWeight}
        currentWeight={calculationResults.currentWeight}
      />
    );
  }
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Generate array of weeks 1-42
  const pregnancyWeeks = Array.from({ length: 42 }, (_, i) => i + 1);

  return (
    <div className="calculator-container">
      <form onSubmit={handleSubmit} className="pregnancy-calculator relative">
        {/* Loading Overlay */}
        {isCalculating && (
          <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center space-y-4">
              {/* Spinning Animation */}
              <div className="relative">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* AI Thinking Text */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-600 mb-2">
                  AI Thinking
                </h3>
                <p className="text-sm text-gray-600 animate-pulse">
                  Đang phân tích và tính toán BMI thai kỳ của bạn...
                </p>

                {/* Animated Dots */}
                <div className="flex justify-center mt-2 space-x-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Cân nặng trước khi mang thai</label>
          <div className="input-group">
            <input
              type="number"
              name="prePregnancyWeight"
              value={formData.prePregnancyWeight}
              onChange={handleInputChange}
              placeholder="Nhập cân nặng"
              min="0"
              step="0.1"
              className={errors.prePregnancyWeight ? "error-input" : ""}
              disabled={isCalculating}
            />
            <select
              name="prePregnancyUnit"
              value={formData.prePregnancyUnit}
              onChange={handleInputChange}
              disabled={isCalculating}
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
          {errors.prePregnancyWeight && (
            <p className="error-message">{errors.prePregnancyWeight}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Cân nặng hiện tại</label>
          <div className="input-group">
            <input
              type="number"
              name="currentWeight"
              value={formData.currentWeight}
              onChange={handleInputChange}
              placeholder="Nhập cân nặng"
              min="0"
              step="0.1"
              className={errors.currentWeight ? "error-input" : ""}
              disabled={isCalculating}
            />
            <select
              name="currentWeightUnit"
              value={formData.currentWeightUnit}
              onChange={handleInputChange}
              disabled={isCalculating}
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
          {errors.currentWeight && (
            <p className="error-message">{errors.currentWeight}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Chiều cao của bạn</label>
          <div className="height-group">
            <div className="input-group">
              <input
                type="number"
                name="heightMeters"
                value={formData.heightMeters}
                onChange={handleInputChange}
                placeholder="Mét"
                min="0"
                max="3"
                step="0.01"
                className={`height-meters ${
                  errors.heightMeters ? "error-input" : ""
                }`}
                disabled={isCalculating}
              />
              <span className="unit-label">m</span>
            </div>
            <div className="input-group">
              <input
                type="number"
                name="heightCentimeters"
                value={formData.heightCentimeters}
                onChange={handleInputChange}
                placeholder="Centimet"
                min="0"
                max="99"
                className={errors.heightCentimeters ? "error-input" : ""}
                disabled={isCalculating}
              />
              <span className="unit-label">cm</span>
            </div>
          </div>
          {errors.heightMeters && (
            <p className="error-message">{errors.heightMeters}</p>
          )}
          {errors.heightCentimeters && (
            <p className="error-message">{errors.heightCentimeters}</p>
          )}
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="twins"
            name="isCarryingTwins"
            checked={formData.isCarryingTwins}
            onChange={handleInputChange}
            disabled={isCalculating}
          />
          <label htmlFor="twins">Tôi đang mang thai đôi</label>
        </div>

        <div className="conversion-info">
          <p className="info-text">
            Bảng quy đổi: 1 lb = 0.45 kg | 1 m = 100 cm
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">Tuần thai hiện tại</label>
          <div className="input-group">
            <select
              name="pregnancyWeek"
              value={formData.pregnancyWeek}
              onChange={handleInputChange}
              className={`full-width ${
                errors.pregnancyWeek ? "error-input" : ""
              }`}
              disabled={isCalculating}
            >
              <option value="">Chọn tuần thai</option>
              {pregnancyWeeks.map((week) => (
                <option key={week} value={week}>
                  {week} tuần
                </option>
              ))}
            </select>
          </div>
          {errors.pregnancyWeek && (
            <p className="error-message">{errors.pregnancyWeek}</p>
          )}
        </div>

        <button
          type="submit"
          className="submit-button relative"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              AI đang tính toán...
            </>
          ) : (
            "Tính toán"
          )}
        </button>
      </form>
    </div>
  );
};

export default PregnancyCalculatorForm;
