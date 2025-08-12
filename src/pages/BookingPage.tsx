import React from "react";
import MainLayout from "../components/layout/MainLayout";
import BookingForm from "../components/Booking/BookingForm";

const BookingPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-52 py-8">
        <div className="max-w-3xl mx-auto">
          <BookingForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingPage;
