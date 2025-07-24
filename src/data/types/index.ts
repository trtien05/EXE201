export type { Booking } from "./booking";
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

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: "user" | "admin";
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl: string;
  readTime: string;
  categoryColor: string;
}
