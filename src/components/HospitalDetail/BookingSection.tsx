import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Package } from 'lucide-react';
import Button from '../ui/Button';
import { Hospital, Doctor, Service, departments } from '../../data/mockData';

interface BookingSectionProps {
  hospital: Hospital;
}

const BookingSection: React.FC<BookingSectionProps> = ({ hospital }) => {
  const [activeTab, setActiveTab] = useState<'doctor' | 'service'>('doctor');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = [
    '07:30 - 08:00',
    '08:00 - 08:30',
    '08:30 - 09:00',
    '09:00 - 09:30',
    '09:30 - 10:00',
    '10:30 - 11:00',
    '11:00 - 11:30'
  ];

  // Generate next 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
  };

  const getDayName = (date: Date) => {
    return `Thứ ${date.getDay() + 1}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Đặt lịch ngay</h3>
      <p className="text-gray-600 mb-6">
        Lựa chọn bác sĩ phù hợp, dịch vụ cần khám và tiến hành đặt lịch ngay.
      </p>

      {/* Booking Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('doctor')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'doctor'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <User className="w-5 h-5 mr-2" />
          Bác sĩ
        </button>
        <button
          onClick={() => setActiveTab('service')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'service'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Package className="w-5 h-5 mr-2" />
          Gói dịch vụ
        </button>
      </div>

      {/* Hospital Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bệnh viện
        </label>
        <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
          {hospital.name}
        </div>
      </div>

      {activeTab === 'doctor' ? (
        <>
          {/* Department Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chuyên khoa
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn chuyên khoa</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bác sĩ
            </label>
            <div className="p-3 border border-gray-300 rounded-lg flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg"
                alt="Doctor"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">ThS.BS.CKI Lê Thiếu Du</p>
                <p className="text-sm text-gray-500">Giá từ: 290.000đ</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Service Selection */
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gói dịch vụ
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Thời gian
        </label>
        <input
          type="month"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          value="2025-06"
        />

        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(day)}
              className={`flex-shrink-0 p-3 rounded-lg border ${
                selectedDate.toDateString() === day.toDateString()
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="text-sm text-gray-600">{getDayName(day)}</div>
              <div className="text-sm font-medium">{formatDate(day)}</div>
              <div className="text-xs text-gray-500">8 chỗ trống</div>
            </button>
          ))}
        </div>

        <div>
          <h4 className="font-medium mb-2">Sáng (8)</h4>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(time)}
                className={`text-center py-2 px-3 rounded-lg border ${
                  selectedTime === time
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                } text-sm`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Book Button */}
      <Link
        to={`/booking?hospitalId=${hospital.id}${
          selectedDoctor ? `&doctorId=${selectedDoctor.id}` : ''
        }${selectedService ? `&serviceId=${selectedService.id}` : ''}`}
      >
        <Button fullWidth size="lg">
          Đặt lịch hẹn
        </Button>
      </Link>
    </div>
  );
};

export default BookingSection;