import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import SearchSection from '../components/HomePage/SearchSection';
import FeaturesSection from '../components/HomePage/FeaturesSection';
import PopularHospitals from '../components/HomePage/PopularHospitals';
import TopDoctors from '../components/HomePage/TopDoctors';
import PopularServices from '../components/HomePage/PopularServices';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <SearchSection />
      <FeaturesSection />
      <PopularHospitals />
      <TopDoctors />
      <PopularServices />
    </MainLayout>
  );
};

export default HomePage;