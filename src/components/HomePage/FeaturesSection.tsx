import React from 'react';
import { Calendar, Users, Clock, CreditCard } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Đặt lịch dễ dàng',
      description: 'Đặt lịch khám chỉ trong vài phút với giao diện thân thiện và dễ sử dụng.',
    },
    {
      icon: Users,
      title: 'Bác sĩ chuyên môn cao',
      description: 'Tiếp cận các bác sĩ giỏi với nhiều năm kinh nghiệm từ các bệnh viện hàng đầu.',
    },
    {
      icon: Clock,
      title: 'Tiết kiệm thời gian',
      description: 'Không cần xếp hàng chờ đợi, chủ động chọn thời gian khám phù hợp với lịch trình của bạn.',
    },
    {
      icon: CreditCard,
      title: 'Nhiều phương thức thanh toán',
      description: 'Thanh toán linh hoạt và an toàn với nhiều phương thức khác nhau.',
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-52">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
            Tại sao chọn Sencare?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Nền tảng đặt lịch khám bệnh trực tuyến giúp bạn tiết kiệm thời gian và đặt lịch với các bác sĩ chuyên môn cao.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;