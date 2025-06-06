import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
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
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

export const doctorsApi = {
  getAllDoctors: async (page: number = 0, size: number = 4): Promise<DoctorsResponse> => {
    const response = await api.get(`/doctors?page=${page}&size=${size}`);
    return response.data;
  },
  getDoctorById: async (doctorId: string): Promise<DoctorDetailResponse> => {
    const response = await api.get(`/doctors/${doctorId}`);
    return response.data;
  },
  searchDoctorsByName: async (name: string, page: number = 0, size: number = 20): Promise<DoctorsResponse> => {
    const response = await api.get(`/doctors/search-name?name=${encodeURIComponent(name)}&page=${page}&size=${size}`);
    return response.data;
  },
};

export const hospitalsApi = {
  getAllHospitals: async (page: number = 0, size: number = 20): Promise<HospitalsResponse> => {
    const response = await api.get(`/hospitals?page=${page}&size=${size}`);
    return response.data;
  },
  getHospitalById: async (hospitalId: string): Promise<HospitalDetailResponse> => {
    const response = await api.get(`/hospitals/${hospitalId}`);
    return response.data;
  },
  searchHospitalsByName: async (name: string, page: number = 0, size: number = 20): Promise<HospitalsResponse> => {
    const response = await api.get(`/hospitals/search-name?name=${encodeURIComponent(name)}&page=${page}&size=${size}`);
    return response.data;
  },
};

export default api;