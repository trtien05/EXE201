import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import {
  doctorsApi,
  hospitalsApi,
  hosservApi,
  ordersApi,
  Doctor,
  Hospital,
  HospitalService,
  CreateOrderData,
} from "../../lib/api";

const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Fix parameter handling - treat "undefined" strings as null
  const doctorId =
    searchParams.get("doctorId") === "undefined"
      ? null
      : searchParams.get("doctorId");
  const hospitalId =
    searchParams.get("hospitalId") === "undefined"
      ? null
      : searchParams.get("hospitalId");
  const serviceId =
    searchParams.get("serviceId") === "undefined"
      ? null
      : searchParams.get("serviceId");
  const preSelectedTime = searchParams.get("time");

  console.log("doctorId", doctorId);
  console.log("hospitalId", hospitalId);
  console.log("serviceId", serviceId);

  // State for API data
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [services, setServices] = useState<HospitalService[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [selectedService, setSelectedService] =
    useState<HospitalService | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("selectedService", selectedService);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    preSelectedTime || ""
  );
  const [formData, setFormData] = useState({
    bookingFor: "self",
    patientName: "",
    dateOfBirth: "",
    gender: "male",
    phone: "",
    email: "",
    zalo: "",
    address: "",
    isNewPatient: true,
    reason: "",
    paymentMethod: "cod",
  });

  // Predefined time slots
  const morningSlots = ["07:00 - 09:00", "09:00 - 11:00", "11:00 - 13:00"];
  const afternoonSlots = ["15:00 - 17:00", "17:00 - 19:00"];

  // Load data based on provided IDs
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Case 1: Only hospitalId provided - get doctors and services for this hospital
        if (hospitalId && !doctorId && !serviceId) {
          const hospitalResponse = await hospitalsApi.getHospitalById(
            hospitalId
          );
          setSelectedHospital(hospitalResponse.data);

          // Get all doctors and filter by hospitalId
          const doctorsResponse = await doctorsApi.getAllDoctors(0, 100);
          const hospitalDoctors = doctorsResponse.data.content.filter(
            (doctor) => doctor.hospitalId === hospitalId
          );
          setDoctors(hospitalDoctors);

          // Get all services and filter by hospitalId
          const servicesResponse = await hosservApi.getAllServices(0, 100);
          const hospitalServices = servicesResponse.data.content.filter(
            (service) => service.hospitalId === hospitalId
          );
          setServices(hospitalServices);
        }

        // Case 2: Only doctorId provided - get hospitals and services
        else if (doctorId && !hospitalId && !serviceId) {
          const doctorResponse = await doctorsApi.getDoctorById(doctorId);
          setSelectedDoctor(doctorResponse.data);

          // Get hospital for this doctor
          const hospitalResponse = await hospitalsApi.getHospitalById(
            doctorResponse.data.hospitalId
          );
          setSelectedHospital(hospitalResponse.data);

          // Get all hospitals
          const hospitalsResponse = await hospitalsApi.getAllHospitals(0, 100);
          setHospitals(hospitalsResponse.data.content);

          // Get all services
          const servicesResponse = await hosservApi.getAllServices(0, 100);
          setServices(servicesResponse.data.content);
        }

        // Case 3: Only serviceId provided - get doctors and hospitals for this service
        else if (serviceId && !hospitalId && !doctorId) {
          const service = await hosservApi.getServiceById(serviceId);
          setSelectedService(service);

          // Get hospital for this service
          const hospitalResponse = await hospitalsApi.getHospitalById(
            service.hospitalId
          );
          setSelectedHospital(hospitalResponse.data);

          // Get all doctors and filter by service's hospitalId
          const doctorsResponse = await doctorsApi.getAllDoctors(0, 100);
          const serviceDoctors = doctorsResponse.data.content.filter(
            (doctor) => doctor.hospitalId === service.hospitalId
          );
          setDoctors(serviceDoctors);

          // Get all hospitals
          const hospitalsResponse = await hospitalsApi.getAllHospitals(0, 100);
          setHospitals(hospitalsResponse.data.content);
        }

        // Case 4: Multiple IDs provided - load specific entities
        else if (hospitalId || doctorId || serviceId) {
          // Load specific hospital if provided
          if (hospitalId) {
            const hospitalResponse = await hospitalsApi.getHospitalById(
              hospitalId
            );
            setSelectedHospital(hospitalResponse.data);
          }

          // Load specific doctor if provided
          if (doctorId) {
            const doctorResponse = await doctorsApi.getDoctorById(doctorId);
            setSelectedDoctor(doctorResponse.data);

            // If no hospital selected, get doctor's hospital
            if (!hospitalId) {
              const hospitalResponse = await hospitalsApi.getHospitalById(
                doctorResponse.data.hospitalId
              );
              setSelectedHospital(hospitalResponse.data);
            }
          }

          // Load specific service if provided
          if (serviceId) {
            const service = await hosservApi.getServiceById(serviceId);
            setSelectedService(service);
          }

          // Load doctors if needed
          if (!doctorId) {
            const doctorsResponse = await doctorsApi.getAllDoctors(0, 100);
            let filteredDoctors = doctorsResponse.data.content;

            if (hospitalId) {
              filteredDoctors = filteredDoctors.filter(
                (doctor) => doctor.hospitalId === hospitalId
              );
            }

            setDoctors(filteredDoctors);
          }

          // Load services if needed
          if (!serviceId) {
            const servicesResponse = await hosservApi.getAllServices(0, 100);
            let filteredServices = servicesResponse.data.content;

            if (hospitalId) {
              filteredServices = filteredServices.filter(
                (service) => service.hospitalId === hospitalId
              );
            }

            setServices(filteredServices);
          }

          // Load hospitals if needed
          if (!hospitalId) {
            const hospitalsResponse = await hospitalsApi.getAllHospitals(0, 20);
            setHospitals(hospitalsResponse.data.content);
          }
        }

        // Case 5: No IDs provided - load all data
        else {
          const [doctorsResponse, hospitalsResponse, servicesResponse] =
            await Promise.all([
              doctorsApi.getAllDoctors(0, 20),
              hospitalsApi.getAllHospitals(0, 20),
              hosservApi.getAllServices(0, 20),
            ]);

          setDoctors(doctorsResponse.data.content);
          setHospitals(hospitalsResponse.data.content);
          setServices(servicesResponse.data.content);
        }
      } catch (error) {
        toast.error("Không thể tải dữ liệu. Vui lòng thử lại.");
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [doctorId, hospitalId, serviceId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeSlotSelect = (timeSlotId: string) => {
    setSelectedTimeSlot(timeSlotId);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    // Also set the hospital if not already selected
    if (!selectedHospital) {
      const doctorHospital = hospitals.find(
        (h) => h.hospitalId === doctor.hospitalId
      );
      if (doctorHospital) {
        setSelectedHospital(doctorHospital);
      }
    }
  };

  const handleHospitalSelect = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    // Clear doctor selection if switching hospitals
    if (selectedDoctor && selectedDoctor.hospitalId !== hospital.hospitalId) {
      setSelectedDoctor(null);
    }
  };

  const handleServiceSelect = (service: HospitalService) => {
    setSelectedService(service);
    // Also set the hospital if not already selected
    if (!selectedHospital) {
      const serviceHospital = hospitals.find(
        (h) => h.hospitalId === service.hospitalId
      );
      if (serviceHospital) {
        setSelectedHospital(serviceHospital);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDoctor) {
      toast.error("Vui lòng chọn bác sĩ để đặt lịch khám");
      return;
    }

    if (!selectedTimeSlot) {
      toast.warning("Vui lòng chọn khung giờ khám");
      return;
    }

    try {
      // Get the actual time slot value
      let appointmentTime = "";
      if (selectedTimeSlot.startsWith("morning-")) {
        const index = parseInt(selectedTimeSlot.split("-")[1]);
        appointmentTime = morningSlots[index];
      } else if (selectedTimeSlot.startsWith("afternoon-")) {
        const index = parseInt(selectedTimeSlot.split("-")[1]);
        appointmentTime = afternoonSlots[index];
      }

      // Prepare order data
      const orderData: CreateOrderData = {
        servId: selectedService?.servId ?? "", // Use service ID if available, otherwise empty string
        servUser: formData.bookingFor === "self" ? "Bản thân" : "Người khác",
        appointmentTime: appointmentTime,
        fullName: formData.patientName,
        birthDate: formData.dateOfBirth,
        gender: formData.gender === "male" ? "Nam" : "Nữ",
        phone: formData.zalo,
        address: formData.address,
        reason: formData.reason,
        paymentMethod: "MOMO",
      };

      // Create order
      const orderResponse = await ordersApi.createOrder(orderData);

      if (orderResponse.flag) {
        toast.success("Đặt lịch thành công! Chuyển đến trang thanh toán...");

        // Use service price if service is selected, otherwise use doctor price
        const amount = selectedService
          ? selectedService.servPrice
          : selectedDoctor.doctorPrice?.toString() || "0";

        const params = new URLSearchParams({
          bookingId: orderResponse.data.orderId,
          amount,
          doctorName: selectedDoctor.doctorName || "",
          hospitalName: selectedHospital?.hospitalName || "",
          serviceName: selectedService?.servName || "",
          timeSlot: appointmentTime,
        });
        navigate(`/checkout-payment?${params.toString()}`);
      } else {
        toast.error(orderResponse.message || "Có lỗi xảy ra khi đặt lịch");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.");
    }
  };

  const formatTimeSlot = (timeSlot: string) => {
    return timeSlot;
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hospital Info Section - Show when hospitalId is provided */}
      {selectedHospital && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex items-center mb-4">
            <img
              src={selectedHospital.hospitalAvatar}
              alt={selectedHospital.hospitalName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4 flex-shrink-0"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-medium">
                {selectedHospital.hospitalName}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {selectedHospital.hospitalDescription}
              </p>
              <p className="text-xs text-gray-500">
                {selectedHospital.hospitalPhone}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Service Info Section - Show when serviceId is provided */}
      {selectedService && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <h3 className="font-medium text-blue-800 mb-2 text-sm sm:text-base">
              Dịch vụ đã chọn: {selectedService.servName}
            </h3>
            <p className="text-xs sm:text-sm text-blue-700 mb-2">
              {selectedService.servDesc}
            </p>
            <p className="text-base sm:text-lg font-bold text-blue-600">
              {new Intl.NumberFormat("vi-VN").format(
                Number(selectedService.servPrice)
              )}
              đ
            </p>
          </div>
        </div>
      )}

      {/* Doctor Info Section - Show when doctorId is provided */}
      {selectedDoctor && doctorId && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
            <img
              src={selectedDoctor.doctorAvatar}
              alt={selectedDoctor.doctorName}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-0 sm:mr-4 mx-auto sm:mx-0"
            />
            <div className="text-center sm:text-left">
              <h3 className="font-medium text-base sm:text-lg">
                {selectedDoctor.doctorName}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {selectedDoctor.doctorDescription}
              </p>
              <p className="text-xs text-gray-500">
                {selectedHospital?.hospitalName}
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  {selectedHospital?.hospitalName}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-blue-600 ml-0 sm:ml-2">
                Xem đường đi
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-medium text-sm sm:text-base">Mức phí:</span>
              <span className="text-red-600 ml-0 sm:ml-2 font-medium text-sm sm:text-base">
                {new Intl.NumberFormat("vi-VN").format(
                  selectedDoctor.doctorPrice
                )}
                đ
              </span>
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3 flex items-center text-sm sm:text-base">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Chọn khung giờ khám
            </h4>

            <div className="space-y-4">
              {/* Morning Slots */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  🌅 Buổi sáng
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {morningSlots.map((slot, index) => {
                    const id = `morning-${index}`;

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleTimeSlotSelect(id)}
                        className={`p-2 text-xs sm:text-sm rounded border transition-colors ${
                          selectedTimeSlot === id
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                        }`}
                      >
                        {formatTimeSlot(slot)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Afternoon Slots */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  ☀️ Buổi chiều
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {afternoonSlots.map((slot, index) => {
                    const id = `afternoon-${index}`;

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleTimeSlotSelect(id)}
                        className={`p-2 text-xs sm:text-sm rounded border transition-colors ${
                          selectedTimeSlot === id
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                        }`}
                      >
                        {formatTimeSlot(slot)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Items Summary Section */}
      {(selectedDoctor || selectedHospital || selectedService) && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">
            Thông tin đã chọn
          </h2>

          {/* Selected Hospital */}
          {selectedHospital && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={selectedHospital.hospitalAvatar}
                    alt={selectedHospital.hospitalName}
                    className="w-12 h-12 rounded-full mr-3 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">
                      🏥 {selectedHospital.hospitalName}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {selectedHospital.hospitalPhone}
                    </p>
                  </div>
                </div>
                {!hospitalId && (
                  <button
                    onClick={() => setSelectedHospital(null)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Bỏ chọn
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Selected Service */}
          {selectedService && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-blue-800 text-sm sm:text-base">
                    🩺 {selectedService.servName}
                  </h3>
                  <p className="text-xs text-blue-600 mb-1">
                    {selectedService.servDesc}
                  </p>
                  <p className="text-sm font-bold text-blue-600">
                    {new Intl.NumberFormat("vi-VN").format(
                      Number(selectedService.servPrice)
                    )}
                    đ
                  </p>
                </div>
                {!serviceId && (
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-red-500 hover:text-red-700 text-sm ml-2"
                  >
                    Bỏ chọn
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Selected Doctor */}
          {selectedDoctor && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={selectedDoctor.doctorAvatar}
                    alt={selectedDoctor.doctorName}
                    className="w-12 h-12 rounded-full mr-3 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-medium text-green-800 text-sm sm:text-base">
                      👨‍⚕️ BS. {selectedDoctor.doctorName}
                    </h3>
                    <p className="text-xs text-green-600 mb-1">
                      {selectedDoctor.doctorDescription}
                    </p>
                    <p className="text-sm font-bold text-green-600">
                      Phí khám:{" "}
                      {new Intl.NumberFormat("vi-VN").format(
                        selectedDoctor.doctorPrice
                      )}
                      đ
                    </p>
                  </div>
                </div>
                {!doctorId && (
                  <button
                    onClick={() => setSelectedDoctor(null)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Bỏ chọn
                  </button>
                )}
              </div>

              {/* Time Slot Selection for selected doctor */}
              <div className="border-t border-green-200 pt-3 mt-3">
                <h4 className="font-medium mb-3 flex items-center text-sm sm:text-base text-green-800">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Chọn khung giờ khám
                </h4>

                <div className="space-y-4">
                  {/* Morning Slots */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      🌅 Buổi sáng
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {morningSlots.map((slot, index) => {
                        const id = `morning-${index}`;

                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => handleTimeSlotSelect(id)}
                            className={`p-2 text-xs sm:text-sm rounded border transition-colors ${
                              selectedTimeSlot === id
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                            }`}
                          >
                            {formatTimeSlot(slot)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Afternoon Slots */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      ☀️ Buổi chiều
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {afternoonSlots.map((slot, index) => {
                        const id = `afternoon-${index}`;

                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => handleTimeSlotSelect(id)}
                            className={`p-2 text-xs sm:text-sm rounded border transition-colors ${
                              selectedTimeSlot === id
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                            }`}
                          >
                            {formatTimeSlot(slot)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Service Selection Section - Only show when no service is selected */}
      {!selectedService && services.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">
            {hospitalId
              ? `Chọn dịch vụ tại ${selectedHospital?.hospitalName}`
              : doctorId
              ? `Chọn dịch vụ`
              : "Chọn dịch vụ"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {services.map((service) => (
              <div
                key={service.servId}
                className="border rounded-lg p-3 sm:p-4 cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => handleServiceSelect(service)}
              >
                <img
                  src={service.servImage}
                  alt={service.servName}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-sm sm:text-base mb-2">
                  {service.servName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  {service.servDesc}
                </p>
                <p className="text-base sm:text-lg font-bold text-blue-600">
                  {new Intl.NumberFormat("vi-VN").format(
                    Number(service.servPrice)
                  )}
                  đ
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hospital Selection Section - Only show when no hospital is selected */}
      {!selectedHospital && hospitals.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">
            {doctorId
              ? `Chọn bệnh viện khác`
              : serviceId
              ? `Chọn bệnh viện khác`
              : "Chọn bệnh viện"}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {hospitals.map((hospital) => (
              <div
                key={hospital.hospitalId}
                className="border rounded-lg p-3 sm:p-4 cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => handleHospitalSelect(hospital)}
              >
                <div className="flex items-center mb-2">
                  <img
                    src={hospital.hospitalAvatar}
                    alt={hospital.hospitalName}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-3 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm sm:text-base truncate">
                      {hospital.hospitalName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {hospital.hospitalDescription}
                    </p>
                    <p className="text-xs text-gray-500">
                      {hospital.hospitalPhone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Doctor Selection Section - Only show when no doctor is selected */}
      {!selectedDoctor && doctors.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">
            {hospitalId
              ? `Chọn bác sĩ tại ${selectedHospital?.hospitalName}`
              : serviceId
              ? `Chọn bác sĩ cho dịch vụ ${selectedService?.servName}`
              : "Chọn bác sĩ"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.doctorId}
                className="border rounded-lg p-3 sm:p-4 cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => handleDoctorSelect(doctor)}
              >
                <div className="flex items-center mb-2">
                  <img
                    src={doctor.doctorAvatar}
                    alt={doctor.doctorName}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm sm:text-base truncate">
                      {doctor.doctorName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {doctor.doctorDescription}
                    </p>
                    {!hospitalId && (
                      <p className="text-xs text-gray-500 truncate">
                        {doctor.hospitalName}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-blue-600 font-medium">
                  Phí tư vấn:{" "}
                  {new Intl.NumberFormat("vi-VN").format(doctor.doctorPrice)}đ
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Selection Section - Only show when doctor is selected */}
      {selectedDoctor && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">
            Người sử dụng dịch vụ
          </h2>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="bookingFor"
                value="self"
                checked={formData.bookingFor === "self"}
                onChange={handleInputChange}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-sm sm:text-base">Bản thân</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="bookingFor"
                value="other"
                checked={formData.bookingFor === "other"}
                onChange={handleInputChange}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-sm sm:text-base">Người khác</span>
            </label>
          </div>
        </div>
      )}

      {/* Only show form if we have a doctor selected */}
      {selectedDoctor && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6"
        >
          {/* Show selected service info in form if service is selected */}
          {selectedService && (
            <div className="mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2 text-sm sm:text-base">
                Dịch vụ đã chọn
              </h4>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <p className="font-medium text-blue-700 text-sm sm:text-base">
                    {selectedService.servName}
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600">
                    {selectedService.servDesc}
                  </p>
                </div>
                <p className="text-base sm:text-lg font-bold text-blue-600">
                  {new Intl.NumberFormat("vi-VN").format(
                    Number(selectedService.servPrice)
                  )}
                  đ
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giới tính
                </label>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 pt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleInputChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-sm sm:text-base">Nam</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-sm sm:text-base">Nữ</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại Zalo
              </label>
              <input
                type="tel"
                name="zalo"
                value={formData.zalo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ chi tiết
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lý do thăm khám
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base resize-none"
                required
              />
            </div>

            <div>
              <h3 className="font-medium mb-3 text-sm sm:text-base">
                Phương thức thanh toán
              </h3>
              <div className="border rounded-lg p-3 sm:p-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 text-sm sm:text-base">
                    Thanh toán chuyển khoản
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 w-full text-sm sm:text-base py-3 sm:py-4"
              >
                TIẾN HÀNH XÁC NHẬN
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
