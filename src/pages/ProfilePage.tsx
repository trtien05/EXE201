import React, { useState, useEffect } from "react";
import {
  User,
  Edit,
  Calendar,
  CreditCard,
  Settings,
  Mail,
  Phone,
  MapPin,
  Camera,
} from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Tabs from "../components/ui/Tabs";
import { verifyToken, User as UserType } from "../data/mockData";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import OvulationCalculator from "../components/ToolsPage/OvulationCalculator";
import DueDateCalculator from "../components/ToolsPage/DueDateCalculator";
import PregnancyWeight from "../components/ToolsPage/PregnancyWeight";

// Import the pregnancy calculator components

// Mock data for bookings and transactions
const mockBookings = [
  {
    id: "BK1701234567",
    doctorName: "BS.CKII Phan Thị Hòa",
    hospitalName: "Bệnh viện Quốc tế Columbia Asia Bình Dương",
    specialty: "Sản - Phụ khoa",
    date: "2024-06-16",
    time: "08:00 - 08:30",
    status: "confirmed",
    fee: 290000,
  },
  {
    id: "BK1701234568",
    doctorName: "TS.BS Trần Lệ Thủy",
    hospitalName: "Bệnh viện Quốc tế City",
    specialty: "Sản - Phụ khoa",
    date: "2024-01-20",
    time: "14:00 - 14:30",
    status: "pending",
    fee: 300000,
  },
  {
    id: "BK1701234569",
    doctorName: "PGS.TS.BS Lê Quang Quốc Anh",
    hospitalName: "Bệnh viện Quốc tế Columbia Asia Bình Dương",
    specialty: "Khoa tiêu hóa",
    date: "2024-01-10",
    time: "10:30 - 11:00",
    status: "completed",
    fee: 350000,
  },
];

const mockTransactions = [
  {
    id: "TXN001",
    bookingId: "BK1701234567",
    amount: 290000,
    type: "payment",
    method: "MoMo",
    date: "2024-06-16",
    status: "completed",
    description: "Thanh toán phí khám bệnh",
  },
  {
    id: "TXN002",
    bookingId: "BK1701234569",
    amount: 350000,
    type: "payment",
    method: "MoMo",
    date: "2024-01-09",
    status: "completed",
    description: "Thanh toán phí khám bệnh",
  },
  {
    id: "TXN003",
    bookingId: "BK1701234568",
    amount: 300000,
    type: "payment",
    method: "MoMo",
    date: "2024-01-19",
    status: "pending",
    description: "Thanh toán phí khám bệnh",
  },
];

const ProfilePage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    email: "",
    avatar: "",
  });
  const [bmiData, setBmiData] = useState({
    weight: "",
    height: "",
    currentBMI: 0,
    history: [] as Array<{ date: string; bmi: number; weight: number }>,
  });
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = verifyToken(token);
      if (user) {
        setCurrentUser(user);
        setEditForm({
          name: user.name,
          phone: user.phone || "",
          email: user.email,
          avatar: user.avatar || "",
        });
      }
    }

    // Load BMI history from localStorage
    const savedBMIHistory = localStorage.getItem("bmiHistory");
    if (savedBMIHistory) {
      setBmiData((prev) => ({ ...prev, history: JSON.parse(savedBMIHistory) }));
    }
  }, []);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...editForm };
      setCurrentUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);
      toast.success("Cập nhật thông tin thành công!");
    }
  };

  const calculateBMI = async () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height) / 100; // Convert cm to meters

    if (!weight || !height || weight <= 0 || height <= 0) {
      toast.error("Vui lòng nhập chiều cao và cân nặng hợp lệ!");
      return;
    }

    setIsCalculating(true);

    // Simulate AI thinking with delay
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const bmi = weight / (height * height);
    const newEntry = {
      date: new Date().toLocaleDateString("vi-VN"),
      bmi: parseFloat(bmi.toFixed(1)),
      weight: weight,
    };

    const updatedHistory = [...bmiData.history, newEntry].slice(-10); // Keep last 10 entries

    setBmiData((prev) => ({
      ...prev,
      currentBMI: parseFloat(bmi.toFixed(1)),
      history: updatedHistory,
    }));

    localStorage.setItem("bmiHistory", JSON.stringify(updatedHistory));
    setIsCalculating(false);
    toast.success("Tính toán BMI thành công!");
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5)
      return {
        category: "Thiếu cân",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      };
    if (bmi < 25)
      return {
        category: "Bình thường",
        color: "text-green-600",
        bgColor: "bg-green-50",
      };
    if (bmi < 30)
      return {
        category: "Thừa cân",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      };
    return { category: "Béo phì", color: "text-red-600", bgColor: "bg-red-50" };
  };

  const getBMIAdvice = (bmi: number) => {
    if (bmi < 18.5) {
      return {
        title: "Thiếu cân",
        advice:
          "Bạn nên tăng cân một cách lành mạnh bằng cách ăn nhiều thực phẩm giàu dinh dưỡng, tập thể dục đều đặn và tham khảo ý kiến bác sĩ.",
        recommendations: [
          "Ăn nhiều bữa nhỏ trong ngày",
          "Chọn thực phẩm giàu calo và dinh dưỡng",
          "Tập luyện sức mạnh để tăng khối lượng cơ",
          "Tham khảo chuyên gia dinh dưỡng",
        ],
      };
    }
    if (bmi < 25) {
      return {
        title: "Cân nặng bình thường",
        advice:
          "Chúc mừng! Bạn đang có cân nặng lý tưởng. Hãy duy trì lối sống lành mạnh để giữ được cân nặng này.",
        recommendations: [
          "Duy trì chế độ ăn cân bằng",
          "Tập thể dục đều đặn 150 phút/tuần",
          "Uống đủ nước mỗi ngày",
          "Ngủ đủ 7-8 tiếng mỗi đêm",
        ],
      };
    }
    if (bmi < 30) {
      return {
        title: "Thừa cân",
        advice:
          "Bạn nên giảm cân một cách từ từ và an toàn. Mục tiêu giảm 0.5-1kg mỗi tuần là hợp lý.",
        recommendations: [
          "Giảm 500-750 calo mỗi ngày",
          "Tăng cường hoạt động thể chất",
          "Ăn nhiều rau xanh và trái cây",
          "Hạn chế đồ ăn chế biến sẵn",
        ],
      };
    }
    return {
      title: "Béo phì",
      advice:
        "Tình trạng béo phì có thể ảnh hưởng đến sức khỏe. Bạn nên tham khảo ý kiến bác sĩ để có kế hoạch giảm cân phù hợp.",
      recommendations: [
        "Tham khảo bác sĩ chuyên khoa",
        "Xây dựng kế hoạch giảm cân dài hạn",
        "Thay đổi lối sống toàn diện",
        "Theo dõi sức khỏe định kỳ",
      ],
    };
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      confirmed: { color: "bg-green-100 text-green-800", text: "Đã xác nhận" },
      pending: { color: "bg-yellow-100 text-yellow-800", text: "Chờ xác nhận" },
      completed: { color: "bg-blue-100 text-blue-800", text: "Hoàn thành" },
      cancelled: { color: "bg-red-100 text-red-800", text: "Đã hủy" },
    };
    const statusInfo =
      statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
      >
        {statusInfo.text}
      </span>
    );
  };

  const getTransactionStatusBadge = (status: string) => {
    const statusMap = {
      completed: { color: "bg-green-100 text-green-800", text: "Thành công" },
      pending: { color: "bg-yellow-100 text-yellow-800", text: "Chờ xử lý" },
      failed: { color: "bg-red-100 text-red-800", text: "Thất bại" },
    };
    const statusInfo =
      statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
      >
        {statusInfo.text}
      </span>
    );
  };

  const PersonalInfoTab = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Thông tin cá nhân
          </h3>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            {isEditing ? "Hủy" : "Chỉnh sửa"}
          </Button>
        </div>

        {!isEditing ? (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <p className="text-gray-900">{currentUser?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{currentUser?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <p className="text-gray-900">
                  {currentUser?.phone || "Chưa cập nhật"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vai trò
                </label>
                <p className="text-gray-900 capitalize">Người dùng</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEditSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200 relative group">
                  {editForm.avatar ? (
                    <img
                      src={editForm.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <input
                  type="url"
                  placeholder="URL ảnh đại diện"
                  value={editForm.avatar}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, avatar: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Lưu thay đổi
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Hủy
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );

  const BookingHistoryTab = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Lịch sử đặt khám
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đặt lịch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bác sĩ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày khám
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phí khám
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.doctorName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.specialty}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.hospitalName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(booking.date).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Intl.NumberFormat("vi-VN").format(booking.fee)}đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(booking.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const TransactionHistoryTab = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Lịch sử giao dịch
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã giao dịch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đặt lịch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phương thức
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày giao dịch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.bookingId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                    {new Intl.NumberFormat("vi-VN").format(transaction.amount)}đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTransactionStatusBadge(transaction.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const BMIHealthTab = () => (
    <div className="space-y-6">
      {/* BMI Calculator */}
      <Card className="p-6 relative">
        {/* Loading Overlay */}
        {isCalculating && (
          <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center space-y-4">
              {/* Spinning Animation */}
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* AI Thinking Text */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  AI Thinking
                </h3>
                <p className="text-sm text-gray-600 animate-pulse">
                  Đang phân tích chỉ số BMI của bạn...
                </p>

                {/* Animated Dots */}
                <div className="flex justify-center mt-2 space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Máy tính chỉ số BMI
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cân nặng (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="500"
              value={bmiData.weight}
              onChange={(e) =>
                setBmiData((prev) => ({ ...prev, weight: e.target.value }))
              }
              placeholder="Nhập cân nặng của bạn"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
              disabled={isCalculating}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chiều cao (cm)
            </label>
            <input
              type="number"
              step="0.1"
              min="50"
              max="250"
              value={bmiData.height}
              onChange={(e) =>
                setBmiData((prev) => ({ ...prev, height: e.target.value }))
              }
              placeholder="Nhập chiều cao của bạn"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
              disabled={isCalculating}
            />
          </div>
        </div>

        <Button
          onClick={calculateBMI}
          className="mb-6 relative"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              AI đang tính toán...
            </>
          ) : (
            "Tính toán BMI"
          )}
        </Button>

        {bmiData.currentBMI > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* BMI Result */}
            <div
              className={`p-4 rounded-lg ${
                getBMICategory(bmiData.currentBMI).bgColor
              }`}
            >
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {bmiData.currentBMI}
                </div>
                <div
                  className={`text-lg font-medium ${
                    getBMICategory(bmiData.currentBMI).color
                  }`}
                >
                  {getBMICategory(bmiData.currentBMI).category}
                </div>
              </div>
            </div>

            {/* BMI Scale */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">Thang đo BMI</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Thiếu cân</span>
                  <span className="text-blue-600">&lt; 18.5</span>
                </div>
                <div className="flex justify-between">
                  <span>Bình thường</span>
                  <span className="text-green-600">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between">
                  <span>Thừa cân</span>
                  <span className="text-yellow-600">25 - 29.9</span>
                </div>
                <div className="flex justify-between">
                  <span>Béo phì</span>
                  <span className="text-red-600">&gt;= 30</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* BMI Chart - Always show since we can generate fake data */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Biểu đồ BMI theo thời gian (30 ngày gần nhất)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bmiData.history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis domain={[18, 30]} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value, name) => [
                  value,
                  name === "bmi" ? "BMI" : "Cân nặng (kg)",
                ]}
                labelFormatter={(label) => `Ngày: ${label}`}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />

              {/* BMI Reference Lines */}
              <ReferenceLine
                y={18.5}
                stroke="#3B82F6"
                strokeDasharray="5 5"
                label={{ value: "Thiếu cân", position: "left" }}
              />
              <ReferenceLine
                y={25}
                stroke="#EAB308"
                strokeDasharray="5 5"
                label={{ value: "Thừa cân", position: "left" }}
              />
              <ReferenceLine
                y={30}
                stroke="#EF4444"
                strokeDasharray="5 5"
                label={{ value: "Béo phì", position: "left" }}
              />

              <Line
                type="monotone"
                dataKey="bmi"
                stroke="#0077B6"
                strokeWidth={3}
                dot={{ fill: "#0077B6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#0077B6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>
            Đường kẻ ngang biểu thị các ngưỡng BMI:{" "}
            <span className="text-blue-600 font-medium">18.5 (Thiếu cân)</span>,{" "}
            <span className="text-yellow-600 font-medium">25 (Thừa cân)</span>,{" "}
            <span className="text-red-600 font-medium">30 (Béo phì)</span>
          </p>
          <p className="mt-2">
            <span className="font-medium">Gợi ý:</span> Nhập cân nặng và chiều
            cao thực tế để có kết quả chính xác. Sử dụng "Tạo dữ liệu mẫu" để
            xem demo biểu đồ.
          </p>
        </div>
      </Card>

      {/* Health Advice */}
      {bmiData.currentBMI > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Lời khuyên sức khỏe
          </h3>

          {(() => {
            const advice = getBMIAdvice(bmiData.currentBMI);
            return (
              <div>
                <div
                  className={`p-4 rounded-lg mb-4 ${
                    getBMICategory(bmiData.currentBMI).bgColor
                  }`}
                >
                  <h4
                    className={`font-semibold text-lg mb-2 ${
                      getBMICategory(bmiData.currentBMI).color
                    }`}
                  >
                    {advice.title}
                  </h4>
                  <p className="text-gray-700">{advice.advice}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-800 mb-3">
                    Khuyến nghị cụ thể:
                  </h5>
                  <ul className="space-y-2">
                    {advice.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Lưu ý:</strong> BMI chỉ là một chỉ số tham khảo. Để
                    có đánh giá chính xác về sức khỏe, bạn nên tham khảo ý kiến
                    của bác sĩ chuyên khoa.
                  </p>
                </div>
              </div>
            );
          })()}
        </Card>
      )}
    </div>
  );

  const PregnancyToolsTab = () => (
    <div className="space-y-6">
      {/* Pregnancy Tools Header */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Công cụ tính toán thai kỳ
        </h3>
        <p className="text-gray-600 mb-6">
          Sử dụng các công cụ dưới đây để theo dõi và tính toán các thông tin
          quan trọng trong thai kỳ.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-pink-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-pink-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">
              Tính ngày sinh dự kiến
            </h4>
            <p className="text-sm text-gray-600">
              Xác định ngày sinh dự kiến của bé
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">
              Tính chu kỳ rụng trứng
            </h4>
            <p className="text-sm text-gray-600">
              Theo dõi chu kỳ và thời điểm rụng trứng
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Settings className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">
              Tính cân nặng thai kỳ
            </h4>
            <p className="text-sm text-gray-600">
              Theo dõi cân nặng trong thai kỳ
            </p>
          </div>
        </div>
      </Card>

      {/* Due Date Calculator */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="h-5 w-5 text-pink-600 mr-2" />
          Tính ngày sinh dự kiến
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <DueDateCalculator />
        </div>
      </Card>

      {/* Ovulation Calculator */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User className="h-5 w-5 text-blue-600 mr-2" />
          Tính chu kỳ rụng trứng
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <OvulationCalculator />
        </div>
      </Card>

      {/* Pregnancy Weight Calculator */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Settings className="h-5 w-5 text-green-600 mr-2" />
          Tính cân nặng thai kỳ
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <PregnancyWeight />
        </div>
      </Card>

      {/* Important Notice */}
      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <div className="flex items-start">
          <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
            <span className="text-yellow-600 text-sm font-bold">!</span>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">
              Lưu ý quan trọng
            </h4>
            <p className="text-sm text-yellow-700">
              Các công cụ tính toán này chỉ mang tính chất tham khảo và không
              thể thay thế cho việc tư vấn y tế chuyên nghiệp. Vui lòng tham
              khảo ý kiến bác sĩ chuyên khoa để có thông tin chính xác và phù
              hợp với tình trạng sức khỏe của bạn.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  const tabs = [
    {
      id: "personal",
      label: "Thông tin cá nhân",
      content: <PersonalInfoTab />,
    },
    {
      id: "bookings",
      label: "Lịch sử đặt khám",
      content: <BookingHistoryTab />,
    },
    {
      id: "transactions",
      label: "Lịch sử giao dịch",
      content: <TransactionHistoryTab />,
    },
    {
      id: "bmi-health",
      label: "Sức khỏe BMI",
      content: <BMIHealthTab />,
    },
    {
      id: "pregnancy-tools",
      label: "Công cụ thai kỳ",
      content: <PregnancyToolsTab />,
    },
  ];

  if (!currentUser) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Vui lòng đăng nhập
            </h1>
            <Button onClick={() => (window.location.href = "/login")}>
              Đăng nhập
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-52">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-200">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {currentUser.name}
                </h1>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {mockBookings.length}
                  </p>
                  <p className="text-gray-600">Lịch đặt khám</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {mockTransactions.length}
                  </p>
                  <p className="text-gray-600">Giao dịch</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 capitalize">
                    Người dùng
                  </p>
                  <p className="text-gray-600">Vai trò</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs tabs={tabs} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
