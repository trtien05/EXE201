import type { Service, Department } from "./types";

export const services: Service[] = [
  {
    id: "s1",
    name: "Khám Sản - Phụ khoa",
    description:
      "Dịch vụ khám Sản - Phụ khoa tổng quát, bao gồm khám lâm sàng, siêu âm và các xét nghiệm cần thiết để đánh giá sức khỏe sinh sản của phụ nữ.",
    price: 200000,
    doctorIds: ["d1", "d2"],
    hospitalIds: ["h1", "h2"],
    departmentId: "dept1",
    reviews: [],
  },
  {
    id: "s2",
    name: "Siêu âm thai",
    description:
      "Siêu âm thai nhi để theo dõi sự phát triển của thai, phát hiện sớm các bất thường và đánh giá sức khỏe của thai nhi.",
    price: 150000,
    doctorIds: ["d1", "d2"],
    hospitalIds: ["h1", "h3"],
    departmentId: "dept1",
    reviews: [],
  },
  {
    id: "s3",
    name: "Nội soi dạ dày",
    description:
      "Nội soi dạ dày để chẩn đoán và điều trị các bệnh lý liên quan đến dạ dày, thực quản và tá tràng.",
    price: 500000,
    doctorIds: ["d3"],
    hospitalIds: ["h1", "h2"],
    departmentId: "dept2",
    reviews: [],
  },
  {
    id: "s6",
    name: "Khám Tim mạch",
    description:
      "Dịch vụ khám và tư vấn các bệnh lý về tim mạch, đo điện tim, siêu âm tim và các xét nghiệm liên quan.",
    price: 350000,
    doctorIds: ["d8"],
    hospitalIds: ["h4"],
    departmentId: "dept5",
    reviews: [],
  },
  {
    id: "s7",
    name: "Khám Da liễu",
    description:
      "Khám và điều trị các bệnh lý về da, tư vấn chăm sóc da, điều trị mụn, nám, viêm da, dị ứng.",
    price: 250000,
    doctorIds: ["d9"],
    hospitalIds: ["h5"],
    departmentId: "dept6",
    reviews: [],
  },
  {
    id: "s4",
    name: "Khám Nhi khoa",
    description:
      "Dịch vụ khám và điều trị các bệnh lý ở trẻ em từ sơ sinh đến 15 tuổi bởi các bác sĩ chuyên khoa nhi.",
    price: 180000,
    doctorIds: ["d5"],
    hospitalIds: ["h2", "h3"],
    departmentId: "dept3",
    reviews: [],
  },
  {
    id: "s5",
    name: "MRI - Cộng hưởng từ",
    description:
      "Chụp cộng hưởng từ (MRI) để chẩn đoán chính xác các bệnh lý về não, cột sống, khớp và các bộ phận khác trong cơ thể.",
    price: 2500000,
    doctorIds: ["d6"],
    hospitalIds: ["h3"],
    departmentId: "dept4",
    reviews: [],
  },
  {
    id: "s8",
    name: "Khám Tai - Mũi - Họng",
    description:
      "Khám và điều trị các bệnh lý về tai, mũi, họng, viêm xoang, viêm tai giữa, dị ứng.",
    price: 220000,
    doctorIds: ["d10"],
    hospitalIds: ["h2", "h3"],
    departmentId: "dept7",
    reviews: [],
  },
  {
    id: "s9",
    name: "Khám Mắt",
    description:
      "Khám mắt, đo thị lực, điều trị các bệnh lý về mắt như cận thị, viễn thị, loạn thị, viêm kết mạc.",
    price: 200000,
    doctorIds: ["d11"],
    hospitalIds: ["h1", "h5"],
    departmentId: "dept8",
    reviews: [],
  },
  {
    id: "s10",
    name: "Khám Răng - Hàm - Mặt",
    description:
      "Khám và điều trị các bệnh lý về răng miệng, nhổ răng, trám răng, tư vấn chăm sóc răng miệng.",
    price: 180000,
    doctorIds: ["d12"],
    hospitalIds: ["h2", "h4"],
    departmentId: "dept9",
    reviews: [],
  },
  {
    id: "s11",
    name: "Khám Nội tổng quát",
    description:
      "Khám sức khỏe tổng quát, tầm soát các bệnh lý nội khoa, tư vấn dinh dưỡng và lối sống.",
    price: 250000,
    doctorIds: ["d13"],
    hospitalIds: ["h1", "h3"],
    departmentId: "dept10",
    reviews: [],
  },
  {
    id: "s12",
    name: "Khám Tiết niệu",
    description:
      "Khám và điều trị các bệnh lý về tiết niệu, sỏi thận, viêm đường tiết niệu, tư vấn sức khỏe nam giới.",
    price: 300000,
    doctorIds: ["d14"],
    hospitalIds: ["h4"],
    departmentId: "dept11",
    reviews: [],
  },
  {
    id: "s13",
    name: "Khám Cơ xương khớp",
    description:
      "Khám và điều trị các bệnh lý về cơ xương khớp, thoái hóa khớp, viêm khớp, đau lưng, đau vai gáy.",
    price: 320000,
    doctorIds: ["d15"],
    hospitalIds: ["h3", "h5"],
    departmentId: "dept12",
    reviews: [],
  },
  {
    id: "s14",
    name: "Khám Ung bướu",
    description:
      "Khám, tầm soát và điều trị các bệnh lý ung thư, tư vấn phòng ngừa và chăm sóc bệnh nhân ung thư.",
    price: 500000,
    doctorIds: ["d16"],
    hospitalIds: ["h1", "h4"],
    departmentId: "dept13",
    reviews: [],
  },
  {
    id: "s15",
    name: "Khám Hô hấp",
    description:
      "Khám và điều trị các bệnh lý về hô hấp, viêm phổi, hen suyễn, viêm phế quản.",
    price: 230000,
    doctorIds: ["d17"],
    hospitalIds: ["h2", "h5"],
    departmentId: "dept14",
    reviews: [],
  },
  {
    id: "s16",
    name: "Khám Tâm thần kinh",
    description:
      "Khám và điều trị các bệnh lý về tâm thần kinh, rối loạn lo âu, trầm cảm, mất ngủ.",
    price: 350000,
    doctorIds: ["d18"],
    hospitalIds: ["h3"],
    departmentId: "dept15",
    reviews: [],
  },
  {
    id: "s17",
    name: "Khám Dị ứng - Miễn dịch",
    description:
      "Khám và điều trị các bệnh lý dị ứng, miễn dịch, viêm mũi dị ứng, hen suyễn, nổi mề đay.",
    price: 270000,
    doctorIds: ["d19"],
    hospitalIds: ["h1", "h2"],
    departmentId: "dept16",
    reviews: [],
  },
  {
    id: "s18",
    name: "Khám Dinh dưỡng",
    description:
      "Tư vấn dinh dưỡng, xây dựng chế độ ăn phù hợp cho từng đối tượng, phòng ngừa và điều trị suy dinh dưỡng, béo phì.",
    price: 200000,
    doctorIds: ["d20"],
    hospitalIds: ["h3", "h4"],
    departmentId: "dept17",
    reviews: [],
  },
  {
    id: "s19",
    name: "Khám Phục hồi chức năng",
    description:
      "Khám và điều trị phục hồi chức năng sau chấn thương, đột quỵ, phẫu thuật, vật lý trị liệu.",
    price: 350000,
    doctorIds: ["d21"],
    hospitalIds: ["h5"],
    departmentId: "dept18",
    reviews: [],
  },
  {
    id: "s20",
    name: "Khám Sức khỏe doanh nghiệp",
    description:
      "Khám sức khỏe định kỳ cho doanh nghiệp, tầm soát bệnh nghề nghiệp, tư vấn sức khỏe cho nhân viên.",
    price: 400000,
    doctorIds: ["d22"],
    hospitalIds: ["h1", "h2", "h3"],
    departmentId: "dept19",
    reviews: [],
  },
];

export const departments: Department[] = [
  {
    id: "dept1",
    name: "Sản - Phụ khoa",
    description:
      "Chuyên khoa về sức khỏe sinh sản của nữ giới, bao gồm thai sản, khám phụ khoa và điều trị các bệnh lý phụ khoa.",
    serviceIds: ["s1", "s2"],
    doctorIds: ["d1", "d2"],
  },
  {
    id: "dept2",
    name: "Tiêu hóa",
    description:
      "Chuyên khoa về chẩn đoán và điều trị các bệnh lý liên quan đến hệ tiêu hóa như dạ dày, ruột, gan, tụy...",
    serviceIds: ["s3"],
    doctorIds: ["d3"],
  },
  {
    id: "dept3",
    name: "Nhi khoa",
    description:
      "Chuyên khoa về chăm sóc sức khỏe và điều trị bệnh cho trẻ em từ sơ sinh đến 15 tuổi.",
    serviceIds: ["s4"],
    doctorIds: ["d5"],
  },
  {
    id: "dept4",
    name: "Chẩn đoán hình ảnh",
    description:
      "Chuyên khoa sử dụng các kỹ thuật chẩn đoán hình ảnh như X-quang, siêu âm, CT, MRI để chẩn đoán bệnh.",
    serviceIds: ["s5"],
    doctorIds: ["d6"],
  },
  {
    id: "dept5",
    name: "Tim mạch",
    description:
      "Chuyên khoa về các bệnh lý tim mạch, tư vấn và điều trị các vấn đề về tim, mạch máu.",
    serviceIds: ["s6"],
    doctorIds: ["d8"],
  },
  {
    id: "dept6",
    name: "Da liễu",
    description:
      "Chuyên khoa về các bệnh lý da, tư vấn chăm sóc và điều trị các vấn đề về da.",
    serviceIds: ["s7"],
    doctorIds: ["d9"],
  },
];
