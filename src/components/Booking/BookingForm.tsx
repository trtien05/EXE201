import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, MapPin, Calendar } from 'lucide-react';
import Button from '../ui/Button';
import { doctors, hospitals } from '../../data/mockData';

const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get('doctorId');
  const time = searchParams.get('time');

  const doctor = doctorId ? doctors.find(d => d.id === doctorId) : null;
  const hospital = doctor ? hospitals.find(h => h.id === doctor.hospitalId) : null;

  const [formData, setFormData] = useState({
    bookingFor: 'self',
    patientName: '',
    dateOfBirth: '',
    gender: 'male',
    phone: '',
    email: '',
    zalo: '',
    address: '',
    isNewPatient: true,
    reason: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
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
              checked={formData.bookingFor === 'self'}
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
              checked={formData.bookingFor === 'other'}
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
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />
              <span>Lịch hẹn: {time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <span>{hospital.name}</span>
              <span className="text-sm text-blue-600 ml-2">Xem đường đi</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Mức phí: </span>
              <span className="text-red-600 ml-2">
                {new Intl.NumberFormat('vi-VN').format(doctor.consultationFee)}đ
              </span>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
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
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Thanh toán bằng tiền mặt (COD)</span>
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