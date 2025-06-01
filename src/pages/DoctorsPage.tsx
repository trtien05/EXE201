import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Rating from '../components/ui/Rating';
import Button from '../components/ui/Button';
import { doctors } from '../data/mockData';

const DoctorsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12">
        <div className="container mx-auto px-52">
          <h1 className="text-3xl font-bold text-white mb-4">Danh sách bác sĩ</h1>
          <p className="text-white text-opacity-90">
            Tìm kiếm và đặt lịch khám với các bác sĩ chuyên môn cao
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-52 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
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
                  <Button fullWidth>Xem chi tiết</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorsPage;