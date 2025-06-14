import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { User, MapPin, Calendar, Clock } from "lucide-react";
import Button from "../ui/Button";
import { doctors, hospitals } from "../../data/mockData";
import { toast } from "react-toastify";

const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const doctorId = searchParams.get("doctorId");
  const preSelectedTime = searchParams.get("time");

  const doctor = doctorId ? doctors.find((d) => d.id === doctorId) : null;
  const hospital = doctor
    ? hospitals.find((h) => h.id === doctor.hospitalId)
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

    if (!selectedTimeSlot) {
      toast.warning("Vui lòng chọn khung giờ khám");
      return;
    }

    const selectedSlot = doctor?.availableTimeSlots.find(
      (slot) => slot.id === selectedTimeSlot
    );

    const bookingData = {
      ...formData,
      doctorId: doctor?.id,
      doctorName: doctor?.name,
      hospitalId: hospital?.id,
      hospitalName: hospital?.name,
      timeSlot: selectedSlot,
      consultationFee: doctor?.consultationFee,
      bookingDate: new Date().toISOString(),
    };

    console.log("Booking submitted:", bookingData);

    // Create booking ID and navigate to payment
    const bookingId = `BK${Date.now()}`;
    const params = new URLSearchParams({
      bookingId,
      amount: doctor?.consultationFee?.toString() || "0",
      doctorName: doctor?.name || "",
      hospitalName: hospital?.name || "",
    });

    toast.success("Đặt lịch thành công! Chuyển đến trang thanh toán...");
    navigate(`/checkout-payment?${params.toString()}`);
  };

  const formatTimeSlot = (timeSlot: any) => {
    return `${timeSlot.startTime} - ${timeSlot.endTime}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-medium mb-4">Người sử dụng dịch vụ</h2>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="bookingFor"
              value="self"
              checked={formData.bookingFor === "self"}
              onChange={handleInputChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Bản thân</span>
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
            <span className="ml-2">Người khác</span>
          </label>
        </div>
      </div>

      {doctor && hospital && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-medium text-lg">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <span>{hospital.name}</span>
              <span className="text-sm text-blue-600 ml-2">Xem đường đi</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Mức phí: </span>
              <span className="text-red-600 ml-2">
                {new Intl.NumberFormat("vi-VN").format(doctor.consultationFee)}đ
              </span>
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Chọn khung giờ khám
            </h4>
            {doctor.availableTimeSlots.length > 0 ? (
              <div className="space-y-3">
                {/* Group time slots by date */}
                {Array.from(
                  new Set(doctor.availableTimeSlots.map((slot) => slot.date))
                ).map((date) => (
                  <div key={date}>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {/* {formatDate(date)} */}
                    </p>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {doctor.availableTimeSlots
                        .filter((slot) => slot.date === date)
                        .map((timeSlot) => (
                          <button
                            key={timeSlot.id}
                            type="button"
                            onClick={() => handleTimeSlotSelect(timeSlot.id)}
                            disabled={!timeSlot.isAvailable}
                            className={`p-2 text-sm rounded border transition-colors ${
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
              <p className="text-gray-500">Không có khung giờ nào khả dụng</p>
            )}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày sinh
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <h3 className="font-medium mb-3">Phương thức thanh toán</h3>
            <div className="border rounded-lg p-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleInputChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Thanh toán chuyển khoản MOMO</span>
              </label>
            </div>
          </div>

          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              TIẾN HÀNH XÁC NHẬN
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
