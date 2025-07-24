import type { Doctor } from "./types";

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "BS.CKII Phan Thị Hòa",
    title: "Bác sĩ Chuyên khoa II",
    specialty: "Sản - Phụ khoa",
    hospitalId: "h1",
    photo:
      "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "BS.CKII Phan Thị Hòa có hơn 15 năm kinh nghiệm trong lĩnh vực Sản - Phụ khoa. Bác sĩ đã điều trị thành công cho hàng nghìn ca bệnh khó.",
    consultationFee: 290000,
    availableTimeSlots: [
      {
        id: "ts1",
        date: "2025-06-16",
        startTime: "07:30",
        endTime: "08:00",
        isAvailable: true,
      },
      {
        id: "ts2",
        date: "2025-06-16",
        startTime: "08:00",
        endTime: "08:30",
        isAvailable: true,
      },
      {
        id: "ts3",
        date: "2025-06-16",
        startTime: "08:30",
        endTime: "09:00",
        isAvailable: false,
      },
    ],
    rating: 5,
    reviews: [
      {
        id: "r4",
        userName: "Phạm Thị D",
        rating: 5,
        comment: "Bác sĩ Hòa rất tận tâm và chuyên nghiệp",
        date: "2025-06-20",
      },
    ],
  },
  {
    id: "d2",
    name: "TS.BS Trần Lệ Thủy",
    title: "Tiến sĩ Bác sĩ",
    specialty: "Sản - Phụ khoa",
    hospitalId: "h2",
    photo:
      "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "TS.BS Trần Lệ Thủy có hơn 25 năm kinh nghiệm về Sản - Phụ khoa, công tác tại nhiều bệnh viện lớn và có chuyên môn cao.",
    consultationFee: 300000,
    availableTimeSlots: [
      {
        id: "ts4",
        date: "2025-08-21",
        startTime: "09:00",
        endTime: "09:30",
        isAvailable: true,
      },
      {
        id: "ts5",
        date: "2025-08-21",
        startTime: "09:30",
        endTime: "10:00",
        isAvailable: true,
      },
    ],
    rating: 5,
    reviews: [],
  },
  {
    id: "d3",
    name: "PGS.TS.BS Lê Quang Quốc Anh",
    title: "Phó Giáo sư Tiến sĩ Bác sĩ",
    specialty: "Khoa tiêu hóa",
    hospitalId: "h1",
    photo:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "PGS.TS.BS Lê Quang Quốc Anh là chuyên gia đầu ngành về tiêu hóa với nhiều năm kinh nghiệm điều trị các bệnh lý tiêu hóa phức tạp.",
    consultationFee: 350000,
    availableTimeSlots: [
      {
        id: "ts6",
        date: "2025-08-22",
        startTime: "13:30",
        endTime: "14:00",
        isAvailable: true,
      },
      {
        id: "ts7",
        date: "2025-08-22",
        startTime: "14:00",
        endTime: "14:30",
        isAvailable: true,
      },
    ],
    rating: 5,
    reviews: [],
  },
  {
    id: "d8",
    name: "BS.CKII Nguyễn Văn Tâm",
    title: "Bác sĩ Chuyên khoa II",
    specialty: "Tim mạch",
    hospitalId: "h4",
    photo:
      "https://images.pexels.com/photos/1133775/pexels-photo-1133775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "BS.CKII Nguyễn Văn Tâm có hơn 20 năm kinh nghiệm trong lĩnh vực tim mạch, từng công tác tại nhiều bệnh viện lớn.",
    consultationFee: 350000,
    availableTimeSlots: [
      {
        id: "ts8",
        date: "2025-09-01",
        startTime: "08:00",
        endTime: "08:30",
        isAvailable: true,
      },
      {
        id: "ts9",
        date: "2025-09-01",
        startTime: "08:30",
        endTime: "09:00",
        isAvailable: true,
      },
    ],
    rating: 4.9,
    reviews: [
      {
        id: "r10",
        userName: "Nguyen Thi E",
        rating: 5,
        comment: "Bác sĩ tư vấn tận tình, chuyên môn cao",
        date: "2025-09-02",
      },
    ],
  },
  {
    id: "d9",
    name: "BS Trần Thị Lan",
    title: "Bác sĩ Da liễu",
    specialty: "Da liễu",
    hospitalId: "h5",
    photo:
      "https://images.pexels.com/photos/371474/pexels-photo-371474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "BS Trần Thị Lan có nhiều năm kinh nghiệm trong điều trị các bệnh lý về da, tư vấn chăm sóc da chuyên sâu.",
    consultationFee: 250000,
    availableTimeSlots: [
      {
        id: "ts10",
        date: "2025-09-05",
        startTime: "10:00",
        endTime: "10:30",
        isAvailable: true,
      },
      {
        id: "ts11",
        date: "2025-09-05",
        startTime: "10:30",
        endTime: "11:00",
        isAvailable: true,
      },
    ],
    rating: 4.8,
    reviews: [
      {
        id: "r11",
        userName: "Le Van F",
        rating: 5,
        comment: "Bác sĩ Lan rất thân thiện và chuyên nghiệp",
        date: "2025-09-06",
      },
    ],
  },
];
