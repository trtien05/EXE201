import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ReferenceLine,
} from "recharts";

const PregnancyCalculationResult = ({
  bmi,
  weightGainRange,
  onStartOver,
  currentPregnancyWeek,
  prePregnancyWeight,
  currentWeight,
}) => {
  // Parse weight gain range to get min and max values
  const [minGain, maxGain] = weightGainRange
    .split(" đến ")
    .map((val) => parseFloat(val));

  // Convert weights to kg if they're in lb
  const preWeightKg =
    prePregnancyWeight?.unit === "lb"
      ? prePregnancyWeight.value * 0.45359237
      : prePregnancyWeight?.value || 0;

  const currentWeightKg =
    currentWeight?.unit === "lb"
      ? currentWeight.value * 0.45359237
      : currentWeight?.value || 0;

  const currentGain = currentWeightKg - preWeightKg;

  // Generate weight gain chart data
  const generateChartData = () => {
    const weeks = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
    return weeks.map((week) => {
      const progress = week / 40;
      const minWeight = (minGain * progress).toFixed(1);
      const maxWeight = (maxGain * progress).toFixed(1);

      return {
        week,
        minWeight: parseFloat(minWeight),
        maxWeight: parseFloat(maxWeight),
        // Add a property to mark the current week
        isCurrentWeek: week === currentPregnancyWeek,
      };
    });
  };

  const chartData = generateChartData();

  // Find the data point for current week or closest week
  const currentWeekData =
    chartData.find((data) => data.week === currentPregnancyWeek) ||
    chartData.reduce((prev, curr) =>
      Math.abs(curr.week - currentPregnancyWeek) <
      Math.abs(prev.week - currentPregnancyWeek)
        ? curr
        : prev
    );

  return (
    <div className="result-container">
      <div className="result-content">
        <h2 className="result-title">Chỉ số BMI trước khi mang thai:</h2>
        <div className="result-value">{bmi.toFixed(2)}</div>

        <h2 className="result-title">
          Mức tăng cân được khuyến nghị trong thai kỳ:
        </h2>
        <div className="result-value">{weightGainRange}</div>

        {currentPregnancyWeek && (
          <div className="current-status">
            <h3 className="result-title">Tình trạng hiện tại của bạn:</h3>
            <p>
              Tuần {currentPregnancyWeek} - Bạn đã tăng {currentGain.toFixed(1)}{" "}
              kg cho đến hiện tại
            </p>
          </div>
        )}

        <div style={{ width: "100%", marginTop: "20px" }}>
          <h3 className="result-title" style={{ marginBottom: "20px" }}>
            Phạm vi tăng cân dự kiến
          </h3>
          <LineChart
            width={500}
            height={250}
            data={chartData}
            margin={{ top: 5, right: 10, left: 50, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              label={{
                value: "Tuần",
                position: "insideBottom",
                offset: -5,
                style: { textAnchor: "middle", fontSize: "12px", fill: "#666" },
              }}
            />
            <YAxis
              label={{
                value: "Cân nặng (kg)",
                angle: -90,
                position: "left",
              }}
            />
            <Tooltip
              formatter={(value, name) => [
                value + " kg",
                name === "maxWeight"
                  ? "Tối đa khuyến nghị"
                  : "Tối thiểu khuyến nghị",
              ]}
              labelFormatter={(label) => `Tuần ${label}`}
            />
            <Line
              type="monotone"
              dataKey="maxWeight"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
              name="Tối đa khuyến nghị"
            />
            <Line
              type="monotone"
              dataKey="minWeight"
              stroke="#0066cc"
              strokeWidth={2}
              dot={false}
              name="Tối thiểu khuyến nghị"
            />
            {currentPregnancyWeek && (
              <>
                <ReferenceDot
                  x={currentWeekData.week}
                  y={currentGain}
                  r={6}
                  fill="green"
                  stroke="none"
                />
                <ReferenceLine
                  x={currentWeekData.week}
                  stroke="green"
                  strokeDasharray="3 3"
                  label={{
                    value: `Tuần ${currentPregnancyWeek}`,
                    position: "top",
                    fill: "green",
                    fontSize: 12,
                  }}
                />
              </>
            )}
          </LineChart>

          <div className="chart-description">
            <p>
              Biểu đồ này cho thấy bạn hiện đang theo dõi như thế nào hướng tới
              mục tiêu tăng cân thai kỳ của mình. Chấm màu xanh lá cây biểu thị
              mức tăng cân hiện tại của bạn ở tuần {currentPregnancyWeek}. Nếu
              chấm nằm giữa đường màu cam và xanh dương, bạn đang trong phạm vi
              tăng cân được khuyến nghị cho phụ nữ mang thai ở chỉ số khối cơ
              thể (BMI) của bạn. Nếu chấm màu xanh lá cây ở trên hoặc dưới những
              đường đó, bạn đang theo dõi trên hoặc dưới mức tăng cân được
              khuyến nghị.
            </p>

            <p>
              Hãy nhớ rằng đây chỉ là những hướng dẫn – chúng không cố định. Tùy
              thuộc vào nhu cầu sức khỏe và tình trạng y tế của bạn, mục tiêu
              tăng cân của bạn có thể khác.
            </p>
          </div>
        </div>

        <button onClick={onStartOver} className="start-over-btn">
          Tính toán lại
        </button>
      </div>
    </div>
  );
};

PregnancyCalculationResult.propTypes = {
  bmi: PropTypes.number.isRequired,
  weightGainRange: PropTypes.string.isRequired,
  onStartOver: PropTypes.func.isRequired,
  currentPregnancyWeek: PropTypes.number,
  prePregnancyWeight: PropTypes.shape({
    value: PropTypes.number,
    unit: PropTypes.string,
  }),
  currentWeight: PropTypes.shape({
    value: PropTypes.number,
    unit: PropTypes.string,
  }),
};

export default PregnancyCalculationResult;
