import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HospitalDetailPage from "./pages/HospitalDetailPage";
import DoctorDetailPage from "./pages/DoctorDetailPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import BookingPage from "./pages/BookingPage";
import HospitalsPage from "./pages/HospitalsPage";
import DoctorsPage from "./pages/DoctorsPage";
import ServicesPage from "./pages/ServicesPage";
import CheckoutPaymentPage from "./pages/CheckoutPaymentPage";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/ProfilePage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import Chatbot from "./components/ui/Chatbot";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function ChatbotWrapper() {
  const pathsWithChatbot = ["/doctors/:id", "/services/:id", "/hospitals/:id"];
  const location = useLocation();
  const [showChatbot, setShowChatbot] = React.useState(false);
  useEffect(() => {
    const currentPath = location.pathname;
    const visible = pathsWithChatbot.some((path) => {
      if (path.includes(":id")) {
        const base = path.split(":")[0];
        return currentPath.startsWith(base) && currentPath.length > base.length;
      }
      return currentPath === path;
    });
    setShowChatbot(visible);
    // Log current path and chatbot visibility for debugging
    console.log("Current Path:", currentPath);
    console.log("Show Chatbot:", visible);
  }, [location.pathname, pathsWithChatbot]);
  return showChatbot ? <Chatbot /> : null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ChatbotWrapper />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/hospitals" element={<HospitalsPage />} />
          <Route path="/hospitals/:id" element={<HospitalDetailPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctors/:id" element={<DoctorDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/checkout-payment" element={<CheckoutPaymentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
