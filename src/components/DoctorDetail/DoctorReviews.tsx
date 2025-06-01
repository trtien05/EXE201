import React from 'react';
import { Doctor } from '../../data/mockData';
import Rating from '../ui/Rating';
import { User } from 'lucide-react';

interface DoctorReviewsProps {
  doctor: Doctor;
}

const DoctorReviews: React.FC<DoctorReviewsProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mr-3">Đánh giá từ bệnh nhân</h2>
        <div className="flex items-center">
          <Rating value={doctor.rating} size="md" showValue className="mr-2" />
          <span className="text-gray-500 text-sm">
            ({doctor.reviews.length} đánh giá)
          </span>
        </div>
      </div>
      
      {doctor.reviews.length > 0 ? (
        <div className="space-y-6">
          {doctor.reviews.map(review => (
            <div key={review.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{review.userName}</p>
                  <div className="flex items-center">
                    <Rating value={review.rating} size="sm" className="mr-2" />
                    <span className="text-gray-500 text-sm">
                      {new Date(review.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Chưa có đánh giá nào.</p>
      )}
    </div>
  );
};

export default DoctorReviews;