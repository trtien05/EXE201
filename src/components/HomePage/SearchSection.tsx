import React from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import "antd/dist/reset.css";

const images = [
  "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/504408397_122108031062891673_3862950004951041225_n.png?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=wMPJWyJ8OlMQ7kNvwFFJmTM&_nc_oc=AdnzBPp8dCSMNgOcEvq0qC86Lf92xezo_PmylMir004NYTksQbe_8d5vq_p5P3-UGydYP5SN3RWwwbhnOwgPSzIB&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=meaJtpjoFS3R8TRStEAp9A&oh=00_AfWV3cTyC6G5M76z9S9au7dg6FGn_p0JGXVNPdj6hdeFTg&oe=68AB9347",
  "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/504408397_122108031062891673_3862950004951041225_n.png?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=wMPJWyJ8OlMQ7kNvwFFJmTM&_nc_oc=AdnzBPp8dCSMNgOcEvq0qC86Lf92xezo_PmylMir004NYTksQbe_8d5vq_p5P3-UGydYP5SN3RWwwbhnOwgPSzIB&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=meaJtpjoFS3R8TRStEAp9A&oh=00_AfWV3cTyC6G5M76z9S9au7dg6FGn_p0JGXVNPdj6hdeFTg&oe=68AB9347",
];

const overlayText = [
  {
    title: "Khám sức khỏe chủ động, an tâm mỗi ngày",
    desc: "Đặt lịch khám với bác sĩ, bệnh viện uy tín chỉ trong vài phút.",
  },
  {
    title: "Dịch vụ y tế chất lượng cao cho mọi nhà",
    desc: "Tìm kiếm và lựa chọn dịch vụ phù hợp với nhu cầu sức khỏe của bạn.",
  },
  {
    title: "Đội ngũ bác sĩ tận tâm, chuyên môn vững vàng",
    desc: "Trải nghiệm chăm sóc y tế hiện đại, tận tình và chuyên nghiệp.",
  },
];

const SearchSection: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/hospitals");
  };
  return (
    <div className="w-full flex justify-center items-center py-4">
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden relative">
        <Carousel autoplay className="w-full">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-[320px] md:h-[420px] lg:h-[550px]"
            >
              <img
                src={img}
                alt={`Banner ${idx + 1}`}
                className=" h-full w-full object-center transition-transform duration-700 scale-100 hover:scale-105"
                draggable={false}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent z-10" />
              {/* Animated text overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-6 md:px-16 animate-fadeIn">
                <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-extrabold mb-3 drop-shadow-lg animate-slideUp">
                  {overlayText[idx].title}
                </h2>
                <p className="text-white text-base md:text-lg lg:text-xl font-medium mb-6 drop-shadow animate-slideUp delay-150">
                  {overlayText[idx].desc}
                </p>
                <button
                  className="bg-gradient-to-r from-[#48CAE4] to-[#0077B6] text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:from-[#0077B6] hover:to-[#48CAE4] transition-colors duration-300 animate-slideUp delay-300"
                  onClick={handleClick}
                >
                  Đặt lịch ngay
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SearchSection;
