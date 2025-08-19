// Hospital Services API
export interface HospitalService {
  id: string;
  servName: string;
  servDesc: string;
  servPrice: string;
  servImage: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  hospitalId: string;
}

export interface HospitalServicesResponse {
  flag: boolean;
  code: number;
  message: string;
  data: {
    content: HospitalService[];
    page: {
      size: number;
      number: number;
      totalElements: number;
      totalPages: number;
    };
  };
}
import axios from "axios";
const api = axios.create({
  baseURL: "https://ms-sencare.azurewebsites.net/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
export const hosservApi = {
  getAllServices: async (
    page: number = 0,
    size: number = 20
  ): Promise<HospitalServicesResponse> => {
    const response = await api.get(`/hosserv?page=${page}&size=${size}`);
    return response.data;
  },
  getServiceById: async (id: string): Promise<HospitalService> => {
    const response = await api.get(`/hosserv/${id}`);
    return response.data.data;
  },
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  confirmPassword: string;
}

export interface Doctor {
  doctorId: string;
  doctorAvatar: string;
  doctorName: string;
  doctorDescription: string;
  doctorPrice: number;
  hospitalId: string;
  hospitalName: string;
  educations: Education[];
  workExperiences: WorkExperience[];
}

export interface Education {
  eduId: string;
  collegeName: string;
  description: string;
  issuedBy: string;
  issuedYear: number;
  doctorId: string;
  doctorName: string;
}

export interface WorkExperience {
  wexId: string;
  hospitalName: string;
  jobTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  doctorId: string;
  doctorName: string;
}

export interface DoctorsResponse {
  flag: boolean;
  code: number;
  message: string;
  data: {
    content: Doctor[];
    page: {
      size: number;
      number: number;
      totalPages: number;
      totalElements: number;
    };
  };
}

export interface DoctorDetailResponse {
  flag: boolean;
  code: number;
  message: string;
  data: Doctor;
}

export interface Hospital {
  hospitalId: string;
  hospitalAvatar: string;
  hospitalName: string;
  hospitalDescription: string;
  hospitalPhone: string;
  userId: string | null;
  doctors: Doctor[];
  hospitalSpecs: HospitalSpec[];
}

export interface HospitalSpec {
  id: string;
  hospitalId: string;
  hospitalName: string;
  specId: string;
  specName: string;
}

export interface HospitalsResponse {
  flag: boolean;
  code: number;
  message: string;
  data: {
    content: Hospital[];
    page: {
      size: number;
      number: number;
      totalElements: number;
      totalPages: number;
    };
  };
}

export interface HospitalDetailResponse {
  flag: boolean;
  code: number;
  message: string;
  data: Hospital;
}

export const authApi = {
  login: async (data: LoginData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
  register: async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
  me: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export const doctorsApi = {
  getAllDoctors: async (
    page: number = 0,
    size: number = 4
  ): Promise<DoctorsResponse> => {
    const response = await api.get(`/doctors?page=${page}&size=${size}`);
    return response.data;
  },
  getDoctorById: async (doctorId: string): Promise<DoctorDetailResponse> => {
    const response = await api.get(`/doctors/${doctorId}`);
    return response.data;
  },
  searchDoctorsByName: async (
    name: string,
    page: number = 0,
    size: number = 20
  ): Promise<DoctorsResponse> => {
    const response = await api.get(
      `/doctors/search-name?name=${encodeURIComponent(
        name
      )}&page=${page}&size=${size}`
    );
    return response.data;
  },
};

export const hospitalsApi = {
  getAllHospitals: async (
    page: number = 0,
    size: number = 5
  ): Promise<HospitalsResponse> => {
    const response = await api.get(`/hospitals?page=${page}&size=${size}`);
    return response.data;
  },
  getHospitalById: async (
    hospitalId: string
  ): Promise<HospitalDetailResponse> => {
    const response = await api.get(`/hospitals/${hospitalId}`);
    return response.data;
  },
  searchHospitalsByName: async (
    name: string,
    page: number = 0,
    size: number = 20
  ): Promise<HospitalsResponse> => {
    const response = await api.get(
      `/hospitals/search-name?name=${encodeURIComponent(
        name
      )}&page=${page}&size=${size}`
    );
    return response.data;
  },
};

// Orders API
export interface CreateOrderData {
  servId: string;
  servUser: string;
  appointmentTime: string;
  fullName: string;
  birthDate: string;
  gender: string;
  phone: string;
  address: string;
  reason: string;
  paymentMethod: string;
}
export interface UpdateOrderData {
  status: string;
}

export interface OrderHistoryItem {
  orderId: string;
  servUser: string;
  servName: string;
  price: number;
  appointmentTime: string;
  fullName: string;
  birthDate: string;
  gender: string;
  phone: string;
  address: string;
  reason: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderHistoryResponse {
  flag: boolean;
  code: number;
  message: string;
  data: OrderHistoryItem[];
}

export interface OrderResponse {
  flag: boolean;
  code: number;
  message: string;
  data: {
    orderId: string;
    // Add other order fields as needed
  };
}

export const ordersApi = {
  createOrder: async (data: CreateOrderData): Promise<OrderResponse> => {
    const response = await api.post("/orders", data);
    return response.data;
  },
  getMyOrders: async (): Promise<OrderHistoryResponse> => {
    const response = await api.get("/orders/me");
    return response.data;
  },
  updateAppointment: async (
    orderId: string,
    data: Partial<CreateOrderData>
  ): Promise<OrderResponse> => {
    const response = await api.patch(`/orders/${orderId}/aptm-time`, data);
    return response.data;
  },
  updateStatus: async (
    orderId: string,
    data: Partial<UpdateOrderData>
  ): Promise<OrderResponse> => {
    const response = await api.patch(`/orders/${orderId}/status`, data);
    return response.data;
  },
};

export default api;
