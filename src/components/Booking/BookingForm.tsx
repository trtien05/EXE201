import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { User, MapPin, Calendar, Clock } from "lucide-react";
import Button from "../ui/Button";
import { doctors, hospitals, services } from "../../data/mockData";
import { toast } from "react-toastify";
import { addBooking } from "../../data/mockData";
import { Booking } from "../../data/types";

const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const doctorId = searchParams.get("doctorId");
  const hospitalId = searchParams.get("hospitalId");
  const serviceId = searchParams.get("serviceId");
  const preSelectedTime = searchParams.get("time");

  // Find service if serviceId is provided
  const service = serviceId ? services.find((s) => s.id === serviceId) : null;

  // Find doctor either by doctorId, or first doctor in hospital, or first doctor for service
  const doctor =
    doctorId !== null
      ? doctors.find((d) => d.id === doctorId)
      : hospitalId !== null
      ? doctors.find((d) => d.hospitalId === hospitalId)
      : serviceId !== null && service
      ? doctors.find((d) => service.doctorIds.includes(d.id))
      : null;

  const hospital = doctor
    ? hospitals.find((h) => h.id === doctor.hospitalId)
    : hospitalId
    ? hospitals.find((h) => h.id === hospitalId)
    : serviceId && service
    ? hospitals.find((h) => service.hospitalIds.includes(h.id))
    : null;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If we only have hospital but no doctor selected, show error
    if (!doctor) {
      toast.error("Vui lòng chọn bác sĩ để đặt lịch khám");
      return;
    }

    if (!selectedTimeSlot) {
      toast.warning("Vui lòng chọn khung giờ khám");
      return;
    }

    const selectedSlot = doctor.availableTimeSlots.find(
      (slot) => slot.id === selectedTimeSlot
    );

    const bookingId = `BK${Date.now()}`;
    const bookingData: Booking = {
      id: bookingId,
      userId: JSON.parse(localStorage.getItem("user") || "{}").id || "",
      doctorId: doctor.id,
      doctorName: doctor.name,
      hospitalId: hospital?.id || "",
      hospitalName: hospital?.name || "",
      specialty: doctor.specialty || "",
      date: selectedSlot?.date || "",
      time: selectedSlot
        ? `${selectedSlot.startTime} - ${selectedSlot.endTime}`
        : "",
      status: "pending",
      fee: doctor.consultationFee,
      patientName: formData.patientName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      phone: formData.phone,
      email: formData.email,
      zalo: formData.zalo,
      address: formData.address,
      reason: formData.reason,
      paymentMethod: formData.paymentMethod,
      bookingDate: new Date().toISOString(),
    };
    addBooking(bookingData);
    toast.success("Đặt lịch thành công! Chuyển đến trang thanh toán...");
    const params = new URLSearchParams({
      bookingId,
      amount: doctor.consultationFee?.toString() || "0",
      doctorName: doctor.name || "",
      hospitalName: hospital?.name || "",
    });
    navigate(`/checkout-payment?${params.toString()}`);
  };

  const formatTimeSlot = (timeSlot: any) => {
    return `${timeSlot.startTime} - ${timeSlot.endTime}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Service Selection Section - Show when only service is selected */}
      {serviceId && service && !doctorId && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">
            Thông tin dịch vụ
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6">
            <h3 className="font-medium text-blue-800 mb-2 text-sm sm:text-base">
              {service.name}
            </h3>
            <p className="text-xs sm:text-sm text-blue-700 mb-2">
              {service.description}
            </p>
            <p className="text-base sm:text-lg font-bold text-blue-600">
              {new Intl.NumberFormat("vi-VN").format(service.price)}đ
            </p>
          </div>

          <h3 className="text-base sm:text-lg font-medium mb-4">Chọn bác sĩ</h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Vui lòng chọn bác sĩ cho dịch vụ {service.name}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {doctors
              .filter((d) => service.doctorIds.includes(d.id))
              .map((doc) => {
                const docHospital = hospitals.find(
                  (h) => h.id === doc.hospitalId
                );
                return (
                  <div
                    key={doc.id}
                    className="border rounded-lg p-3 sm:p-4 cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams);
                      newParams.set("doctorId", doc.id);
                      navigate(`/booking?${newParams.toString()}`);
                    }}
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-sm sm:text-base truncate">
                          {doc.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {doc.specialty}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {docHospital?.name}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-blue-600 font-medium">
                      Phí tư vấn:{" "}
                      {new Intl.NumberFormat("vi-VN").format(
                        doc.consultationFee
                      )}
                      đ
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Hospital Selection Section - Show when only hospital is selected */}
      {hospitalId && !doctorId && !serviceId && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">Chọn bác sĩ</h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Vui lòng chọn bác sĩ tại {hospital?.name}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {doctors
              .filter((d) => d.hospitalId === hospitalId)
              .map((doc) => (
                <div
                  key={doc.id}
                  className="border rounded-lg p-3 sm:p-4 cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.set("doctorId", doc.id);
                    navigate(`/booking?${newParams.toString()}`);
                  }}
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-sm sm:text-base truncate">
                        {doc.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">
                        {doc.specialty}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-600 font-medium">
                    {new Intl.NumberFormat("vi-VN").format(doc.consultationFee)}
                    đ
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

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

      {doctor && hospital && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          {/* Service Information - Show if booked through service */}
          {service && (
            <div className="mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2 text-sm sm:text-base">
                Dịch vụ đã chọn
              </h4>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <p className="font-medium text-blue-700 text-sm sm:text-base">
                    {service.name}
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600">
                    {service.description}
                  </p>
                </div>
                <p className="text-base sm:text-lg font-bold text-blue-600">
                  {new Intl.NumberFormat("vi-VN").format(service.price)}đ
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-0 sm:mr-4 mx-auto sm:mx-0"
            />
            <div className="text-center sm:text-left">
              <h3 className="font-medium text-base sm:text-lg">
                {doctor.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {doctor.specialty}
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base">{hospital.name}</span>
              </div>
              <span className="text-xs sm:text-sm text-blue-600 ml-0 sm:ml-2">
                Xem đường đi
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-medium text-sm sm:text-base">
                {service ? "Phí dịch vụ:" : "Mức phí:"}
              </span>
              <span className="text-red-600 ml-0 sm:ml-2 font-medium text-sm sm:text-base">
                {new Intl.NumberFormat("vi-VN").format(
                  service ? service.price : doctor.consultationFee
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
            {doctor.availableTimeSlots.length > 0 ? (
              <div className="space-y-3">
                {Array.from(
                  new Set(doctor.availableTimeSlots.map((slot) => slot.date))
                ).map((date) => (
                  <div key={date}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {doctor.availableTimeSlots
                        .filter((slot) => slot.date === date)
                        .map((timeSlot) => (
                          <button
                            key={timeSlot.id}
                            type="button"
                            onClick={() => handleTimeSlotSelect(timeSlot.id)}
                            disabled={!timeSlot.isAvailable}
                            className={`p-2 text-xs sm:text-sm rounded border transition-colors ${
                              selectedTimeSlot === timeSlot.id
                                ? "bg-blue-600 text-white border-blue-600"
                                : timeSlot.isAvailable
                                ? "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                                : "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                            }`}
                          >
                            {formatTimeSlot(timeSlot)}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm sm:text-base">
                Không có khung giờ nào khả dụng
              </p>
            )}
          </div>
        </div>
      )}

      {/* Only show form if we have a doctor selected */}
      {doctor && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6"
        >
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
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
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
                    Thanh toán chuyển khoản MOMO
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
