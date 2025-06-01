import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Card from '../ui/Card';
import { hospitals } from '../../data/mockData';
import Button from '../ui/Button';

const PopularHospitals: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-52">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Bệnh viện nổi bật</h2>
            <p className="text-gray-600">Các bệnh viện và phòng khám hàng đầu với cơ sở vật chất hiện đại</p>
          </div>
          <Link to="/hospitals" className="text-[#0077B6] hover:text-[#0077B6] font-medium mt-4 md:mt-0">
            Xem tất cả
          </Link>
        </div>
        
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
                    <Button fullWidth>Đặt lịch khám</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularHospitals;