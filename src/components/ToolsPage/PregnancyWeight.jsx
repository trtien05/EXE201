import { Typography, Layout, Skeleton } from "antd";
import { useEffect, useState } from "react";
import PregnancyCalculatorForm from "../PregnancyCalculatorForm";

const { Title } = Typography;
const { Content } = Layout;

export default function PregnancyWeight() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Máy tính cân nặng thai kỳ
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="calculator-container flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <PregnancyCalculatorForm />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Tôi nên tăng bao nhiều cân trong thai kỳ?
          </h2>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Lượng{" "}
              <a href="#" className="text-green-600 hover:underline">
                cân nặng thai kỳ
              </a>{" "}
              được khuyến nghị tăng phụ thuộc vào tình trạng ban đầu của bạn:{" "}
              <a href="#" className="text-green-600 hover:underline">
                thiếu cân
              </a>
              , ở{" "}
              <a href="#" className="text-green-600 hover:underline">
                cân nặng khỏe mạnh
              </a>
              ,{" "}
              <a href="#" className="text-green-600 hover:underline">
                thừa cân
              </a>
              , hoặc{" "}
              <a href="#" className="text-green-600 hover:underline">
                béo phì
              </a>{" "}
              (và liệu bạn có đang mang{" "}
              <a href="#" className="text-green-600 hover:underline">
                thai đôi
              </a>{" "}
              hay nhiều thai hay không).
            </p>

            <p>
              Công cụ này sẽ tính BMI trước thai kỳ của bạn (chỉ số khối cơ
              thể), đưa ra khuyến nghị về mức tăng cân trong thai kỳ, và tạo
              biểu đồ tăng cân thai kỳ để cho thấy bạn đang tiến triển như thế
              nào về phạm vi cân nặng mục tiêu.
            </p>

            <p>
              Nhưng hãy nhớ rằng mức tăng cân được khuyến nghị của bạn có thể
              khác tùy thuộc vào tình trạng sức khỏe và bất kỳ biến chứng thai
              kỳ nào. Đặc biệt nếu bạn thừa cân, béo phì hoặc thiếu cân, việc
              nói chuyện với bác sĩ hoặc nữ hộ sinh là rất quan trọng.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Khuyến nghị tăng cân theo BMI
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Tình trạng BMI trước thai kỳ
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    BMI (kg/m²)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Mức tăng cân khuyến nghị
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">Thiếu cân</td>
                  <td className="px-4 py-3 text-sm text-gray-900">&lt; 18.5</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    12.5 - 18 kg
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Bình thường
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    18.5 - 24.9
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    11.5 - 16 kg
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">Thừa cân</td>
                  <td className="px-4 py-3 text-sm text-gray-900">25 - 29.9</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    7 - 11.5 kg
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">Béo phì</td>
                  <td className="px-4 py-3 text-sm text-gray-900">&gt;= 30</td>
                  <td className="px-4 py-3 text-sm text-gray-900">5 - 9 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Chia sẻ của các mẹ về tăng cân thai kỳ
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Một số mẹ lo lắng về việc tăng cân quá nhiều, trong khi những người
            khác lại lo lắng về việc không tăng đủ cân. Việc có thắc mắc và lo
            lắng khi cơ thể thay đổi để hỗ trợ thai kỳ là điều bình thường.
          </p>

          <div className="space-y-6">
            {[
              {
                quote:
                  "Tôi phải nhắc nhở bản thân rằng đây là điều cơ thể chúng ta được sinh ra để làm, và tất cả những thay đổi đều đẹp.",
                author: "AshleyT97",
              },
              {
                quote:
                  "Cơ thể của mọi người trong thai kỳ đều khác nhau và nhu cầu tăng cân của họ cũng sẽ khác nhau. Tăng cân là điều bình thường - bạn vẫn tuyệt vời!",
                author: "Chapstick28",
              },
              {
                quote:
                  "Tôi đã giảm cân trong tam cá nguyệt đầu vì buồn nôn. Tôi đã trải qua hai lần mang thai đầu như vậy. Khi cơn buồn nôn giảm, cân nặng tăng lên.",
                author: "Avhh",
              },
              {
                quote:
                  "Khi tôi cảm thấy lo lắng về ngoại hình của mình, tôi nhắc nhở bản thân rằng tôi đang mang thai không phải là tôi bình thường.",
                author: "KKaayyB",
              },
              {
                quote:
                  "Hãy yêu thương bản thân một cách vô điều kiện như bạn sẽ yêu thương đứa con của mình. Ăn uống lành mạnh, tập thể dục, uống đủ nước và nghỉ ngơi tốt. Chỉ đừng bị ám ảnh bởi con số hay kích cỡ váy áo.",
                author: "rixie77",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500"
              >
                <blockquote className="text-gray-700 italic mb-2">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="text-sm text-green-600 font-medium">
                  – {testimonial.author}
                </cite>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-red-600 text-lg">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                LƯU Ý QUAN TRỌNG
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Máy tính tăng cân thai kỳ chỉ là công cụ giáo dục tổng quát và
                không nên được dựa vào như một sự thay thế cho việc theo dõi cân
                nặng của bạn bởi bác sĩ, nữ hộ sinh hoặc các nhà cung cấp dịch
                vụ chăm sóc sức khỏe khác.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
