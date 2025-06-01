// Mock data for the medical appointment booking website
export interface Hospital {
  id: string;
  name: string;
  thumbnail: string;
  location: string;
  address: string;
  city: string;
  openingHours: { [key: string]: string };
  description: string;
  services: string[];
  doctors: string[];
  rating: number;
  reviews: Review[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  hospitalId: string;
  photo: string;
  bio: string;
  consultationFee: number;
  availableTimeSlots: TimeSlot[];
  rating: number;
  reviews: Review[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  doctorIds: string[];
  hospitalIds: string[];
  departmentId: string;
  reviews: Review[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  serviceIds: string[];
  doctorIds: string[];
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock data
export const hospitals: Hospital[] = [
  {
    id: "h1",
    name: "Bệnh viện Quốc tế Columbia Asia Bình Dương",
    thumbnail: "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Bình Dương",
    address: "Đường 23/12 Khu phố Hòa Lân, Phường Thuận Giao, Thành phố Thuận An, Tỉnh Bình Dương",
    city: "Hồ Chí Minh",
    openingHours: {
      "Thứ Hai": "07:30 - 17:30",
      "Thứ Ba": "07:30 - 17:30",
      "Thứ Tư": "07:30 - 17:30",
      "Thứ Năm": "07:30 - 17:30",
      "Thứ Sáu": "07:30 - 17:30",
      "Thứ Bảy": "07:30 - 17:30",
      "Chủ Nhật": "Đóng cửa"
    },
    description: "Bệnh viện Quốc tế Columbia Asia Bình Dương là một trong những bệnh viện tư nhân hiện đại hàng đầu tại Bình Dương, nhận được sự tin nhiệm từ nhiều bệnh nhân ở Bình Dương và các khu vực lân cận.",
    services: ["s1", "s2", "s3"],
    doctors: ["d1", "d2", "d3"],
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        userName: "Nguyen Van A",
        rating: 5,
        comment: "Dịch vụ rất tốt, bác sĩ nhiệt tình",
        date: "2023-06-15"
      },
      {
        id: "r2",
        userName: "Tran Thi B",
        rating: 4,
        comment: "Cơ sở vật chất hiện đại, nhân viên chuyên nghiệp",
        date: "2023-05-22"
      }
    ]
  },
  {
    id: "h2",
    name: "Bệnh viện Quốc tế City",
    thumbnail: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Hồ Chí Minh",
    address: "Số 3, đường 17A, P. Bình Trị Đông B, Quận Bình Tân, TP.HCM",
    city: "Hồ Chí Minh",
    openingHours: {
      "Thứ Hai": "07:30 - 20:00",
      "Thứ Ba": "07:30 - 20:00",
      "Thứ Tư": "07:30 - 20:00",
      "Thứ Năm": "07:30 - 20:00",
      "Thứ Sáu": "07:30 - 20:00",
      "Thứ Bảy": "07:30 - 20:00",
      "Chủ Nhật": "07:30 - 12:00"
    },
    description: "Bệnh viện Quốc tế City là bệnh viện đa khoa quốc tế hàng đầu tại TP.HCM, cung cấp dịch vụ y tế chất lượng cao với đội ngũ bác sĩ giỏi và trang thiết bị hiện đại.",
    services: ["s1", "s3", "s4"],
    doctors: ["d4", "d5"],
    rating: 4.9,
    reviews: [
      {
        id: "r3",
        userName: "Le Van C",
        rating: 5,
        comment: "Phòng khám sạch sẽ, bác sĩ tư vấn rất tận tình",
        date: "2023-07-10"
      }
    ]
  },
  {
    id: "h3",
    name: "Bệnh viện Đa khoa Quốc tế Vinmec Central Park",
    thumbnail: "https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Hồ Chí Minh",
    address: "208 Nguyễn Hữu Cảnh, Vinhomes Central Park, Phường 22, Bình Thạnh, Hồ Chí Minh City, Vietnam",
    city: "Hồ Chí Minh",
    openingHours: {
      "Thứ Hai": "07:00 - 19:00",
      "Thứ Ba": "07:00 - 19:00",
      "Thứ Tư": "07:00 - 19:00",
      "Thứ Năm": "07:00 - 19:00",
      "Thứ Sáu": "07:00 - 19:00",
      "Thứ Bảy": "07:00 - 19:00",
      "Chủ Nhật": "07:00 - 19:00"
    },
    description: "Bệnh viện Đa khoa Quốc tế Vinmec Central Park thuộc hệ thống y tế Vinmec, được trang bị công nghệ hiện đại và đội ngũ y bác sĩ giỏi từ trong và ngoài nước.",
    services: ["s2", "s4", "s5"],
    doctors: ["d6", "d7"],
    rating: 4.7,
    reviews: []
  }
];

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "BS.CKII Phan Thị Hòa",
    title: "Bác sĩ Chuyên khoa II",
    specialty: "Sản - Phụ khoa",
    hospitalId: "h1",
    photo: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "BS.CKII Phan Thị Hòa có hơn 15 năm kinh nghiệm trong lĩnh vực Sản - Phụ khoa. Bác sĩ đã điều trị thành công cho hàng nghìn ca bệnh khó.",
    consultationFee: 290000,
    availableTimeSlots: [
      {
        id: "ts1",
        date: "2023-08-20",
        startTime: "07:30",
        endTime: "08:00",
        isAvailable: true
      },
      {
        id: "ts2",
        date: "2023-08-20",
        startTime: "08:00",
        endTime: "08:30",
        isAvailable: true
      },
      {
        id: "ts3",
        date: "2023-08-20",
        startTime: "08:30",
        endTime: "09:00",
        isAvailable: false
      }
    ],
    rating: 5,
    reviews: [
      {
        id: "r4",
        userName: "Phạm Thị D",
        rating: 5,
        comment: "Bác sĩ Hòa rất tận tâm và chuyên nghiệp",
        date: "2023-06-20"
      }
    ]
  },
  {
    id: "d2",
    name: "TS.BS Trần Lệ Thủy",
    title: "Tiến sĩ Bác sĩ",
    specialty: "Sản - Phụ khoa",
    hospitalId: "h2",
    photo: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "TS.BS Trần Lệ Thủy có hơn 25 năm kinh nghiệm về Sản - Phụ khoa, công tác tại nhiều bệnh viện lớn và có chuyên môn cao.",
    consultationFee: 300000,
    availableTimeSlots: [
      {
        id: "ts4",
        date: "2023-08-21",
        startTime: "09:00",
        endTime: "09:30",
        isAvailable: true
      },
      {
        id: "ts5",
        date: "2023-08-21",
        startTime: "09:30",
        endTime: "10:00",
        isAvailable: true
      }
    ],
    rating: 5,
    reviews: []
  },
  {
    id: "d3",
    name: "PGS.TS.BS Lê Quang Quốc Anh",
    title: "Phó Giáo sư Tiến sĩ Bác sĩ",
    specialty: "Khoa tiêu hóa",
    hospitalId: "h1",
    photo: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "PGS.TS.BS Lê Quang Quốc Anh là chuyên gia đầu ngành về tiêu hóa với nhiều năm kinh nghiệm điều trị các bệnh lý tiêu hóa phức tạp.",
    consultationFee: 350000,
    availableTimeSlots: [
      {
        id: "ts6",
        date: "2023-08-22",
        startTime: "13:30",
        endTime: "14:00",
        isAvailable: true
      },
      {
        id: "ts7",
        date: "2023-08-22",
        startTime: "14:00",
        endTime: "14:30",
        isAvailable: true
      }
    ],
    rating: 5,
    reviews: []
  }
];

export const services: Service[] = [
  {
    id: "s1",
    name: "Khám Sản - Phụ khoa",
    description: "Dịch vụ khám Sản - Phụ khoa tổng quát, bao gồm khám lâm sàng, siêu âm và các xét nghiệm cần thiết để đánh giá sức khỏe sinh sản của phụ nữ.",
    price: 200000,
    doctorIds: ["d1", "d2"],
    hospitalIds: ["h1", "h2"],
    departmentId: "dept1",
    reviews: []
  },
  {
    id: "s2",
    name: "Siêu âm thai",
    description: "Siêu âm thai nhi để theo dõi sự phát triển của thai, phát hiện sớm các bất thường và đánh giá sức khỏe của thai nhi.",
    price: 150000,
    doctorIds: ["d1", "d2"],
    hospitalIds: ["h1", "h3"],
    departmentId: "dept1",
    reviews: []
  },
  {
    id: "s3",
    name: "Nội soi dạ dày",
    description: "Nội soi dạ dày để chẩn đoán và điều trị các bệnh lý liên quan đến dạ dày, thực quản và tá tràng.",
    price: 500000,
    doctorIds: ["d3"],
    hospitalIds: ["h1", "h2"],
    departmentId: "dept2",
    reviews: []
  },
  {
    id: "s4",
    name: "Khám Nhi khoa",
    description: "Dịch vụ khám và điều trị các bệnh lý ở trẻ em từ sơ sinh đến 15 tuổi bởi các bác sĩ chuyên khoa nhi.",
    price: 180000,
    doctorIds: ["d5"],
    hospitalIds: ["h2", "h3"],
    departmentId: "dept3",
    reviews: []
  },
  {
    id: "s5",
    name: "MRI - Cộng hưởng từ",
    description: "Chụp cộng hưởng từ (MRI) để chẩn đoán chính xác các bệnh lý về não, cột sống, khớp và các bộ phận khác trong cơ thể.",
    price: 2500000,
    doctorIds: ["d6"],
    hospitalIds: ["h3"],
    departmentId: "dept4",
    reviews: []
  }
];

export const departments: Department[] = [
  {
    id: "dept1",
    name: "Sản - Phụ khoa",
    description: "Chuyên khoa về sức khỏe sinh sản của nữ giới, bao gồm thai sản, khám phụ khoa và điều trị các bệnh lý phụ khoa.",
    serviceIds: ["s1", "s2"],
    doctorIds: ["d1", "d2"]
  },
  {
    id: "dept2",
    name: "Tiêu hóa",
    description: "Chuyên khoa về chẩn đoán và điều trị các bệnh lý liên quan đến hệ tiêu hóa như dạ dày, ruột, gan, tụy...",
    serviceIds: ["s3"],
    doctorIds: ["d3"]
  },
  {
    id: "dept3",
    name: "Nhi khoa",
    description: "Chuyên khoa về chăm sóc sức khỏe và điều trị bệnh cho trẻ em từ sơ sinh đến 15 tuổi.",
    serviceIds: ["s4"],
    doctorIds: ["d5"]
  },
  {
    id: "dept4",
    name: "Chẩn đoán hình ảnh",
    description: "Chuyên khoa sử dụng các kỹ thuật chẩn đoán hình ảnh như X-quang, siêu âm, CT, MRI để chẩn đoán bệnh.",
    serviceIds: ["s5"],
    doctorIds: ["d6"]
  }
];