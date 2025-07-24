import type { Hospital } from "./types";

export const hospitals: Hospital[] = [
  {
    id: "h1",
    name: "Bệnh viện Quốc tế Columbia Asia Bình Dương",
    thumbnail:
      "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Bình Dương",
    address:
      "Đường 23/12 Khu phố Hòa Lân, Phường Thuận Giao, Thành phố Thuận An, Tỉnh Bình Dương",
    city: "Hồ Chí Minh",
    openingHours: {
      "Thứ Hai": "07:30 - 17:30",
      "Thứ Ba": "07:30 - 17:30",
      "Thứ Tư": "07:30 - 17:30",
      "Thứ Năm": "07:30 - 17:30",
      "Thứ Sáu": "07:30 - 17:30",
      "Thứ Bảy": "07:30 - 17:30",
      "Chủ Nhật": "Đóng cửa",
    },
    description:
      "Bệnh viện Quốc tế Columbia Asia Bình Dương là một trong những bệnh viện tư nhân hiện đại hàng đầu tại Bình Dương, nhận được sự tin nhiệm từ nhiều bệnh nhân ở Bình Dương và các khu vực lân cận.",
    services: ["s1", "s2", "s3"],
    doctors: ["d1", "d2", "d3"],
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        userName: "Nguyen Van A",
        rating: 5,
        comment: "Dịch vụ rất tốt, bác sĩ nhiệt tình",
        date: "2025-06-15",
      },
      {
        id: "r2",
        userName: "Tran Thi B",
        rating: 4,
        comment: "Cơ sở vật chất hiện đại, nhân viên chuyên nghiệp",
        date: "2025-05-22",
      },
    ],
  },
  {
    id: "h2",
    name: "Bệnh viện Quốc tế City",
    thumbnail:
      "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
      "Chủ Nhật": "07:30 - 12:00",
    },
    description:
      "Bệnh viện Quốc tế City là bệnh viện đa khoa quốc tế hàng đầu tại TP.HCM, cung cấp dịch vụ y tế chất lượng cao với đội ngũ bác sĩ giỏi và trang thiết bị hiện đại.",
    services: ["s1", "s3", "s4"],
    doctors: ["d4", "d5"],
    rating: 4.9,
    reviews: [
      {
        id: "r3",
        userName: "Le Van C",
        rating: 5,
        comment: "Phòng khám sạch sẽ, bác sĩ tư vấn rất tận tình",
        date: "2025-07-10",
      },
    ],
  },
  {
    id: "h3",
    name: "Bệnh viện Đa khoa Quốc tế Vinmec Central Park",
    thumbnail:
      "https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Hồ Chí Minh",
    address:
      "208 Nguyễn Hữu Cảnh, Vinhomes Central Park, Phường 22, Bình Thạnh, Hồ Chí Minh City, Vietnam",
    city: "Hồ Chí Minh",
    openingHours: {
      "Thứ Hai": "07:00 - 19:00",
      "Thứ Ba": "07:00 - 19:00",
      "Thứ Tư": "07:00 - 19:00",
      "Thứ Năm": "07:00 - 19:00",
      "Thứ Sáu": "07:00 - 19:00",
      "Thứ Bảy": "07:00 - 19:00",
      "Chủ Nhật": "07:00 - 19:00",
    },
    description:
      "Bệnh viện Đa khoa Quốc tế Vinmec Central Park thuộc hệ thống y tế Vinmec, được trang bị công nghệ hiện đại và đội ngũ y bác sĩ giỏi từ trong và ngoài nước.",
    services: ["s2", "s4", "s5"],
    doctors: ["d6", "d7"],
    rating: 4.7,
    reviews: [],
  },
  {
    id: "h4",
    name: "Bệnh viện Tim Tâm Đức",
    thumbnail:
      "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Hồ Chí Minh",
    address: "4 Nguyễn Lương Bằng, Quận 7, TP.HCM",
    city: "Hồ Chí Minh",
    openingHours: {
      "Thứ Hai": "07:00 - 17:00",
      "Thứ Ba": "07:00 - 17:00",
      "Thứ Tư": "07:00 - 17:00",
      "Thứ Năm": "07:00 - 17:00",
      "Thứ Sáu": "07:00 - 17:00",
      "Thứ Bảy": "07:00 - 12:00",
      "Chủ Nhật": "Đóng cửa",
    },
    description:
      "Bệnh viện Tim Tâm Đức chuyên về các bệnh lý tim mạch, trang thiết bị hiện đại và đội ngũ bác sĩ giàu kinh nghiệm.",
    services: ["s6"],
    doctors: ["d8"],
    rating: 4.9,
    reviews: [
      {
        id: "r12",
        userName: "Pham Van G",
        rating: 5,
        comment: "Bệnh viện sạch sẽ, bác sĩ tim mạch giỏi",
        date: "2025-09-10",
      },
    ],
  },
  {
    id: "h5",
    name: "Bệnh viện Da liễu TP.HCM",
    thumbnail:
      "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Hồ Chí Minh",
    address: "2 Nguyễn Thông, Quận 3, TP.HCM",
    city: "Hồ Chí Minh",
    openingHours: {
      "Thứ Hai": "07:00 - 16:00",
      "Thứ Ba": "07:00 - 16:00",
      "Thứ Tư": "07:00 - 16:00",
      "Thứ Năm": "07:00 - 16:00",
      "Thứ Sáu": "07:00 - 16:00",
      "Thứ Bảy": "07:00 - 11:30",
      "Chủ Nhật": "Đóng cửa",
    },
    description:
      "Bệnh viện Da liễu TP.HCM chuyên khám và điều trị các bệnh lý về da, nổi tiếng với đội ngũ bác sĩ da liễu giỏi.",
    services: ["s7"],
    doctors: ["d9"],
    rating: 4.8,
    reviews: [
      {
        id: "r13",
        userName: "Tran Thi H",
        rating: 5,
        comment: "Bác sĩ da liễu tư vấn rất kỹ lưỡng",
        date: "2025-09-12",
      },
    ],
  },
];
