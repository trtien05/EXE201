import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { hospitals } from '../data/mockData';

const HospitalsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12">
        <div className="container mx-auto px-52">
          <h1 className="text-3xl font-bold text-white mb-4">Danh sách bệnh viện</h1>
          <p className="text-white text-opacity-90">
            Tìm kiếm và đặt lịch khám tại các bệnh viện và phòng khám hàng đầu
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-52 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <Card key={hospital.id} hoverable className="h-full flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={hospital.thumbnail} 
                  alt={hospital.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{hospital.name}</h3>
                <div className="flex items-start mb-3">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{hospital.address}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{hospital.description}</p>
                <div className="mt-auto">
                  <Link to={`/hospitals/${hospital.id}`}>
                    <Button fullWidth>Xem chi tiết</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HospitalsPage;