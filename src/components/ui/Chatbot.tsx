import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { Spin } from "antd";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCSkgtgjBXtQl0m7cIeQUB-Flvc4TQk29E",
});

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Chào bạn! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { from: "user", text: input }]);
      setInput("");
      setLoading(true);
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Sencare là nền tảng đặt lịch khám bệnh trực tuyến giúp người dùng dễ dàng tìm và đặt hẹn với các bác sĩ uy tín tại các bệnh viện chất lượng cao như Columbia Asia Bình Dương, Quốc tế City, Vinmec Central Park, Tim Tâm Đức và Da liễu TP.HCM. Ứng dụng cung cấp thông tin chi tiết về bác sĩ như BS.CKII Phan Thị Hòa (Sản - Phụ khoa), TS.BS Trần Lệ Thủy (Sản - Phụ khoa), PGS.TS.BS Lê Quang Quốc Anh (Tiêu hóa), BS.CKII Nguyễn Văn Tâm (Tim mạch), hay BS Trần Thị Lan (Da liễu) — với ảnh, chuyên môn, lịch khám, chi phí, đánh giá và nhận xét từ bệnh nhân. Bệnh viện đi kèm cũng được mô tả rõ về vị trí, giờ mở cửa, cơ sở vật chất và dịch vụ y tế nổi bật. Chatbot Sencare có thể hỗ trợ người dùng tìm bác sĩ theo chuyên khoa, bệnh viện, giá khám hoặc thời gian rảnh; giải đáp thắc mắc và hướng dẫn từng bước để đặt lịch nhanh chóng và chính xác. Hãy giúp người dùng trả lời các câu hỏi về tư vấn dịch vụ và bác sĩ của bệnh viện. Đây là câu hỏi của người dùng ${input}`,
        });
        setMessages((msgs) => [
          ...msgs,
          { from: "bot", text: response.text || "(No response)" },
        ]);
      } catch (err) {
        setMessages((msgs) => [
          ...msgs,
          { from: "bot", text: "Xin lỗi, tôi không thể trả lời lúc này." },
        ]);
      }
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-[380px] h-[600px] z-50 flex flex-col justify-between shadow-xl rounded-xl bg-white border border-base-300">
      <div className="bg-primary text-primary-content px-4 py-3 rounded-t-xl font-bold flex items-center gap-2">
        <span className="material-icons">Sencare AI</span>
      </div>
      <div className="flex-1 px-4 py-2 overflow-y-auto max-h-[440px]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chatbot-message mb-2 flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            } items-end w-full`}
          >
            {/* Bot message */}
            {msg.from === "bot" && (
              <>
                <div className="mr-2 flex-shrink-0">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-primary flex items-center justify-center">
                      <img
                        src="https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg"
                        alt="Bot Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2 rounded-2xl text-sm max-w-[70%] bg-base-200 text-base-content border border-base-300 shadow-sm">
                  {msg.text}
                </div>
              </>
            )}
            {/* User message */}
            {msg.from === "user" && (
              <>
                <div className="px-3 py-2 rounded-2xl text-sm max-w-[70%] bg-primary text-primary-content border border-primary shadow-sm">
                  {msg.text}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-4 py-3 bg-base-200 rounded-b-xl">
        <input
          style={{ padding: "0.5rem", borderRadius: "0.375rem" }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi của bạn..."
          className="input input-bordered input-sm w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) handleSend();
          }}
          disabled={loading}
        />

        {loading ? (
          <Spin />
        ) : (
          <button
            onClick={handleSend}
            className="btn btn-primary rounded-full btn-sm"
            disabled={loading}
          >
            Gửi
          </button>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
