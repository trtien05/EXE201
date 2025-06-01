import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Rating from '../ui/Rating';
import Button from '../ui/Button';
import { doctors } from '../../data/mockData';

const TopDoctors: React.FC = () => {
  // Sort doctors by rating (highest first)
  const topDoctors = [...doctors].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-52">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Bác sĩ nổi bật</h2>
            <p className="text-gray-600">Các bác sĩ có chuyên môn cao và được đánh giá tốt từ bệnh nhân</p>
          </div>
          <Link to="/doctors" className="text-[#0077B6] hover:text-[#0077B6] font-medium mt-4 md:mt-0">
            Xem tất cả
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topDoctors.map((doctor) => (
            <Card key={doctor.id} hoverable className="text-center">
              <div className="pt-6 px-6">
                <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={doctor.photo} 
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{doctor.name}</h3>
                <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                <div className="flex justify-center mb-3">
                  <Rating value={doctor.rating} showValue />
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{doctor.bio}</p>
              </div>
              <div className="px-6 pb-6">
                <Link to={`/doctors/${doctor.id}`}>
                  <Button fullWidth>Đặt lịch khám</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;