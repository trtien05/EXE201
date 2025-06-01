import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Doctor } from '../../data/mockData';
import Button from '../ui/Button';

interface DoctorTimeSlotsProps {
  doctor: Doctor;
}

const DoctorTimeSlots: React.FC<DoctorTimeSlotsProps> = ({ doctor }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Generate next 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
  };

  const morningSlots = [
    '07:30 - 08:00',
    '08:00 - 08:30',
    '08:30 - 09:00',
    '09:00 - 09:30',
    '09:30 - 10:00',
    '10:30 - 11:00',
    '11:00 - 11:30'
  ];

  const afternoonSlots = [
    '13:30 - 14:00',
    '14:00 - 14:30',
    '14:30 - 15:00',
    '15:00 - 15:30',
    '15:30 - 16:00',
    '16:00 - 16:30'
  ];

  const eveningSlots = [
    '18:00 - 18:15',
    '18:15 - 18:30',
    '18:30 - 18:45',
    '18:45 - 19:00',
    '19:00 - 19:15',
    '19:15 - 19:30',
    '19:30 - 19:45',
    '19:45 - 20:00'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Lịch trống gần nhất</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() - 1);
              setCurrentDate(newDate);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex space-x-2">
            {days.slice(0, 3).map((day, index) => (
              <div 
                key={index} 
                className={`text-center p-3 rounded-lg border ${
                  index === 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="text-sm text-gray-600">Thứ {day.getDay() + 1}</div>
                <div className="text-sm font-medium">{formatDate(day)}</div>
                <div className="text-xs text-gray-500">
                  {index === 0 ? '8 chỗ trống' : '10 chỗ trống'}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() + 1);
              setCurrentDate(newDate);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Sáng ({morningSlots.length})</h3>
            <div className="grid grid-cols-4 gap-2">
              {morningSlots.map((time, index) => (
                <Link 
                  key={index}
                  to={`/booking?doctorId=${doctor.id}&time=${time}`}
                  className="text-center py-2 px-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm"
                >
                  {time}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Chiều ({afternoonSlots.length})</h3>
            <div className="grid grid-cols-4 gap-2">
              {afternoonSlots.map((time, index) => (
                <Link 
                  key={index}
                  to={`/booking?doctorId=${doctor.id}&time=${time}`}
                  className="text-center py-2 px-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm"
                >
                  {time}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Tối ({eveningSlots.length})</h3>
            <div className="grid grid-cols-4 gap-2">
              {eveningSlots.map((time, index) => (
                <Link 
                  key={index}
                  to={`/booking?doctorId=${doctor.id}&time=${time}`}
                  className="text-center py-2 px-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm"
                >
                  {time}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-600 mb-2">Giá khám</p>
        <p className="text-xl font-medium text-blue-600 mb-4">
          {new Intl.NumberFormat('vi-VN').format(doctor.consultationFee)}đ
        </p>
        <Link to={`/booking?doctorId=${doctor.id}`}>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            TIẾP TỤC ĐẶT LỊCH
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorTimeSlots;