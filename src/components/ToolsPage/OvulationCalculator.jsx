import { useEffect, useState } from "react";
import { Typography, Layout, Skeleton } from "antd";
import OvulationCalculatorForm from "../OvulationCalculatorForm/OvulationCalculatorForm";
import OvulationCycleResult from "../OvulationCycleResult/OvulationCycleResult";

const { Title } = Typography;
const { Content } = Layout;

export default function OvulationCaculator() {
  const [showResult, setShowResult] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);

  const handleShowResult = (date, length) => {
    setStartDate(date);
    setCycleLength(length);
    setShowResult(true);
  };

  const handleStartOver = () => {
    setShowResult(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Máy tính rụng trứng
        </h1>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
          Sử dụng máy tính rụng trứng của chúng tôi để dự đoán thời điểm bạn có
          thể rụng trứng và tăng cơ hội mang thai của bạn. Công cụ này giúp bạn
          xác định chính xác ngày rụng trứng có khả năng xảy ra và thời điểm dễ
          thụ thai nhất của bạn để chuẩn bị cho bạn thành công trong việc sinh
          con!
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="calculator-container">
          {!showResult ? (
            <OvulationCalculatorForm onShowResult={handleShowResult} />
          ) : (
            <OvulationCycleResult
              startDate={startDate}
              cycleLength={cycleLength}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Ngày rụng trứng của bạn được tính như thế nào
          </h2>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Công cụ Tính Toán Ngày Rụng Trứng ước tính khi nào bạn sẽ rụng
              trứng bằng cách lùi lại 14 ngày từ ngày bạn mong đợi kỳ kinh tiếp
              theo. (Nếu chu kỳ của bạn dài 28 ngày, kỳ kinh tiếp theo của bạn
              sẽ bắt đầu sau 28 ngày từ ngày đầu tiên của kỳ kinh cuối cùng.)
            </p>

            <p>
              Cửa sổ màu mỡ của bạn bao gồm ngày bạn rụng trứng và năm ngày
              trước đó, nhưng hãy nhớ rằng bạn có khả năng mang thai cao hơn
              trong ba ngày cuối cùng của khoảng thời gian này.
            </p>

            <p>
              Xem các cách khác để xác định ngày rụng trứng của bạn và tăng cơ
              hội mang thai. Tìm hiểu cách sử dụng{" "}
              <a href="#" className="text-blue-600 hover:underline">
                bộ dự đoán rụng trứng
              </a>
              , theo dõi nhiệt độ cơ thể cơ bản của bạn và chú ý đến{" "}
              <a href="#" className="text-blue-600 hover:underline">
                sự thay đổi của dịch cổ tử cung
              </a>
              .
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Dấu hiệu rụng trứng
          </h2>

          <ul className="space-y-3">
            {[
              "Tăng nhiệt độ cơ thể cơ bản",
              "Dịch cổ tử cung có kết cấu giống như lòng trắng trứng",
              "Đau ngực",
              "Cảm giác khó chịu hoặc co thắt nhẹ ở bụng",
              "Rất nhẹ spotting",
              "Tăng cường khứu giác",
              "Tăng ham muốn tình dục",
              "Thay đổi về cảm giác thèm ăn hoặc tâm trạng",
              "Đầy hơi",
            ].map((symptom, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">{symptom}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Lời khuyên khi mang thai
          </h2>

          <ul className="space-y-4">
            {[
              {
                text: "Tìm hiểu khi nào bạn sẽ rụng trứng bằng cách sử dụng máy tính của chúng tôi hoặc bộ dự đoán rụng trứng, hoặc bằng cách theo dõi triệu chứng của bạn.",
                hasLink: true,
              },
              {
                text: "Có quan hệ tình dục cách ngày một lần vào thời điểm rụng trứng.",
                hasLink: false,
              },
              {
                text: "Bắt đầu uống vitamin trước khi sinh có chứa axit folic ít nhất một tháng trước khi bạn bắt đầu cố gắng (6 tháng là lý tưởng).",
                hasLink: true,
              },
              {
                text: "Hãy gặp bác sĩ của bạn và đảm bảo rằng họ đang quản lý bất kỳ tình trạng sức khỏe nào mà bạn có thể gặp phải. Cập nhật thường xuyên với vaccinations và kiểm tra sức khỏe định kỳ có thể làm giảm nguy cơ biến chứng trong thai kỳ.",
                hasLink: true,
              },
              {
                text: "Chăm sóc bản thân thật tốt. Bạn sẽ muốn từ bỏ những thói quen không lành mạnh như hút thuốc và bắt đầu kết hợp tập thể dục thường xuyên vào thói quen của bạn nếu bạn chưa tập thể dục. Ăn một chế độ ăn uống lành mạnh, giàu dinh dưỡng cũng có thể giúp ích.",
                hasLink: true,
              },
            ].map((advice, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600 leading-relaxed">
                  {advice.text}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Cách các mẹ tính ngày rụng trứng
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Ngoài việc sử dụng máy tính rụng trứng, đây là những cách mà các mẹ
            trong cộng đồng BabyCenter biết rằng họ đang rụng trứng.
          </p>

          <div className="space-y-6">
            {[
              {
                quote:
                  "Tôi thường bị chuột rút khi rụng trứng hoặc đau ở bên trái",
                author: "mommy1johnson",
              },
              {
                quote:
                  "Các dấu hiệu rụng trứng của tôi là dịch cổ tử cung trông giống như lòng trắng trứng; thỉnh thoảng, rất nhẹ, khó chịu ở buồng trứng một bên; ham muốn tình dục cao hơn; và tăng cảm giác thèm ăn.",
                author: "krt1987",
              },
              {
                quote: "Tôi cảm thấy đầy hơi và bụng dưới của tôi rất đau.",
                author: "Kmarvin91",
              },
              {
                quote:
                  "Nhiệt độ cơ thể của tôi thường tăng dần trong ba ngày, với tổng mức tăng là 0,8 hoặc 0,9 so với nhiệt độ trước rụng trứng.",
                author: "Rikkubug",
              },
              {
                quote:
                  "Tôi thức dậy giữa đêm và thấy nhiệt độ cơ thể tăng lên và đau lưng bên trái.",
                author: "Newwifelife",
              },
              {
                quote:
                  "Tôi cảm thấy đầy hơi, thèm ăn nhiều hơn và có những cơn chuột rút nhẹ giống như những cơn tôi gặp trước kỳ kinh. Thêm vào đó, tôi đang có tâm trạng rất tốt.",
                author: "NadiaFlower",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500"
              >
                <blockquote className="text-gray-700 italic mb-2">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="text-sm text-blue-600 font-medium">
                  – {testimonial.author}
                </cite>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
