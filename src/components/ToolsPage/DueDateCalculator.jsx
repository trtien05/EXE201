import { useEffect, useState } from "react";
import { Typography, Layout, Skeleton } from "antd";
import DueDateCalculatorForm from "../DueDateCalculatorForm/DueDateCalculatorForm";

const { Title } = Typography;
const { Content } = Layout;

function DueDateCalculator() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Máy tính ngày sinh dự kiến
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="calculator-container">
          <DueDateCalculatorForm />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Ngày sinh dự kiến được tính như thế nào
          </h2>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Máy tính ngày sinh dự kiến ước tính ngày sinh của bé dựa trên ngày
              kinh nguyệt cuối cùng của bạn. Thông thường, thai kỳ kéo dài
              khoảng 40 tuần (280 ngày) kể từ ngày đầu tiên của kỳ kinh cuối
              cùng.
            </p>

            <p>
              Ngày sinh dự kiến chỉ là một ước tính. Chỉ khoảng 5% trẻ em được
              sinh vào đúng ngày dự kiến. Hầu hết trẻ em được sinh trong khoảng
              2 tuần trước hoặc sau ngày dự kiến.
            </p>

            <p>
              Để có thông tin chính xác nhất, bạn nên tham khảo ý kiến bác sĩ và
              thực hiện siêu âm để xác định chính xác tuổi thai và ngày sinh dự
              kiến.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Các mốc quan trọng trong thai kỳ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { week: "4-6 tuần", milestone: "Tim bé bắt đầu đập" },
              {
                week: "8 tuần",
                milestone: "Tất cả các cơ quan chính được hình thành",
              },
              { week: "12 tuần", milestone: "Kết thúc tam cá nguyệt đầu" },
              {
                week: "16-20 tuần",
                milestone: "Có thể cảm nhận được bé cử động",
              },
              { week: "20 tuần", milestone: "Siêu âm giữa thai kỳ" },
              { week: "28 tuần", milestone: "Bắt đầu tam cá nguyệt cuối" },
              {
                week: "32-36 tuần",
                milestone: "Phổi bé phát triển hoàn thiện",
              },
              { week: "37 tuần", milestone: "Thai kỳ đủ tháng" },
              { week: "40 tuần", milestone: "Ngày sinh dự kiến" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-pink-50 rounded-lg p-4 border-l-4 border-pink-500"
              >
                <div className="font-semibold text-pink-700 text-sm">
                  {item.week}
                </div>
                <div className="text-gray-700 text-sm mt-1">
                  {item.milestone}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Lời khuyên cho thai kỳ khỏe mạnh
          </h2>

          <ul className="space-y-4">
            {[
              "Uống vitamin bầu có chứa axit folic mỗi ngày",
              "Ăn uống đa dạng và cân bằng dinh dưỡng",
              "Tránh rượu bia, thuốc lá và ma túy",
              "Tập thể dục nhẹ nhàng thường xuyên",
              "Đi khám thai định kỳ theo lịch hẹn",
              "Ngủ đủ giấc và nghỉ ngơi hợp lý",
              "Quản lý căng thẳng và lo âu",
              "Tránh tiếp xúc với hóa chất độc hại",
            ].map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-yellow-600 text-lg">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Lưu ý quan trọng
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Máy tính ngày sinh dự kiến chỉ mang tính chất tham khảo và không
                thể thay thế cho việc tư vấn y tế chuyên nghiệp. Vui lòng tham
                khảo ý kiến bác sĩ để có thông tin chính xác nhất về thai kỳ của
                bạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DueDateCalculator;
