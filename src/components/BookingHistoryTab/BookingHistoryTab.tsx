import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { OrderHistoryItem, ordersApi } from "../../lib/api";

interface BookingHistoryTabProps {
  currentUser: any;
  getStatusBadge: (status: string) => JSX.Element;
}

const BookingHistoryTab: React.FC<BookingHistoryTabProps> = ({
  currentUser,
  getStatusBadge,
}) => {
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const [orderHistoryLoading, setOrderHistoryLoading] = useState(false);
  const [selectedNewTimeSlot, setSelectedNewTimeSlot] = useState<string>("");

  // Time slots
  const morningSlots = ["07:00 - 09:00", "09:00 - 11:00", "11:00 - 13:00"];
  const afternoonSlots = ["15:00 - 17:00", "17:00 - 19:00"];

  // Load order history function
  const loadOrderHistory = useCallback(async () => {
    if (orderHistoryLoading) return;

    setOrderHistoryLoading(true);
    try {
      const response = await ordersApi.getMyOrders();
      console.log("response", response);
      if (response.flag) {
        setOrderHistory(response.data);
      } else {
        toast.error("Không thể tải lịch sử đặt khám");
      }
    } catch (error) {
      console.error("Error loading order history:", error);
      toast.error("Không thể tải lịch sử đặt khám");
    } finally {
      setOrderHistoryLoading(false);
    }
  }, [orderHistoryLoading]);

  // Load order history when component mounts
  useEffect(() => {
    if (currentUser) {
      loadOrderHistory();
    }
  }, [currentUser]); // Remove loadOrderHistory from dependencies

  // Helper to check if booking can be changed/cancelled
  const canModifyBooking = (createdAt: string, status: string) => {
    if (status === "CANCELLED" || status === "COMPLETED") return false;

    const now = new Date();
    const bookingDate = new Date(createdAt);
    const diffHours =
      (now.getTime() - bookingDate.getTime()) / (1000 * 60 * 60);
    return diffHours < 24; // Can modify within 24 hours
  };

  const openChangeModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setSelectedNewTimeSlot(""); // Reset selected time slot
    setShowChangeModal(true);
  };

  const openCancelModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedNewTimeSlot(timeSlot);
  };

  const handleChangeBookingConfirm = () => {
    if (!selectedNewTimeSlot) {
      toast.warning("Vui lòng chọn khung giờ mới");
      return;
    }

    // TODO: Implement change booking API call with selectedNewTimeSlot
    toast.info(
      `Tính năng thay đổi lịch khám đang được phát triển. Khung giờ đã chọn: ${selectedNewTimeSlot}`
    );
    setShowChangeModal(false);
    setSelectedNewTimeSlot("");
  };

  const handleCancelBookingConfirm = () => {
    // TODO: Implement cancel booking API call
    toast.info("Tính năng hủy lịch khám đang được phát triển");
    setShowCancelModal(false);
  };

  const handleModalClose = () => {
    setShowChangeModal(false);
    setShowCancelModal(false);
    setSelectedOrderId(null);
    setSelectedNewTimeSlot("");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Lịch sử đặt khám
          </h3>
          <Button
            variant="outline"
            onClick={loadOrderHistory}
            disabled={orderHistoryLoading}
          >
            {orderHistoryLoading ? "Đang tải..." : "Làm mới"}
          </Button>
        </div>

        <p className="mb-4 text-sm text-yellow-700 bg-yellow-50 rounded px-3 py-2">
          <strong>Lưu ý:</strong> Bạn chỉ có thể thay đổi hoặc hủy lịch khám
          trong vòng <span className="font-bold">24 giờ</span> sau khi đặt lịch.
        </p>

        {orderHistoryLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải lịch sử đặt khám...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đặt lịch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dịch vụ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người khám
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian khám
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phí khám
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderHistory.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-500">
                      Bạn chưa có lịch sử đặt khám nào.
                    </td>
                  </tr>
                ) : (
                  orderHistory.map((order) => (
                    <tr key={order.orderId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.orderId.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.servName}
                          </div>
                          <div className="text-sm text-gray-500">
                            Người sử dụng: {order.servUser}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.gender} -{" "}
                            {new Date(order.birthDate).toLocaleDateString(
                              "vi-VN"
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.appointmentTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                        {new Intl.NumberFormat("vi-VN").format(order.price)}đ
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {canModifyBooking(order.createdAt, order.status) ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openChangeModal(order.orderId)}
                            >
                              Thay đổi
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => openCancelModal(order.orderId)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Hủy
                            </Button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">
                            Không thể thao tác
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Change Booking Modal */}
        {showChangeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h4 className="text-lg font-semibold mb-4">Thay đổi lịch khám</h4>

              <div className="mb-6">
                <h5 className="font-medium mb-3">Chọn khung giờ mới:</h5>

                {/* Morning Slots */}
                <div className="mb-4">
                  <h6 className="text-sm font-medium text-gray-700 mb-2">
                    🌅 Buổi sáng
                  </h6>
                  <div className="grid grid-cols-1 gap-2">
                    {morningSlots.map((slot, index) => (
                      <button
                        key={`morning-${index}`}
                        type="button"
                        onClick={() => handleTimeSlotSelect(slot)}
                        className={`p-2 text-sm rounded border transition-colors ${
                          selectedNewTimeSlot === slot
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afternoon Slots */}
                <div className="mb-4">
                  <h6 className="text-sm font-medium text-gray-700 mb-2">
                    ☀️ Buổi chiều
                  </h6>
                  <div className="grid grid-cols-1 gap-2">
                    {afternoonSlots.map((slot, index) => (
                      <button
                        key={`afternoon-${index}`}
                        type="button"
                        onClick={() => handleTimeSlotSelect(slot)}
                        className={`p-2 text-sm rounded border transition-colors ${
                          selectedNewTimeSlot === slot
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Time Display */}
                {selectedNewTimeSlot && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Khung giờ đã chọn:</strong> {selectedNewTimeSlot}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={handleModalClose}>
                  Hủy
                </Button>
                <Button
                  onClick={handleChangeBookingConfirm}
                  disabled={!selectedNewTimeSlot}
                  className={
                    !selectedNewTimeSlot ? "opacity-50 cursor-not-allowed" : ""
                  }
                >
                  Xác nhận thay đổi
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Booking Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h4 className="text-lg font-semibold mb-4">
                Xác nhận hủy lịch khám
              </h4>
              <p className="mb-6">
                Bạn có chắc chắn muốn hủy lịch khám này không? Hành động này
                không thể hoàn tác.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={handleModalClose}>
                  Không
                </Button>
                <Button
                  onClick={handleCancelBookingConfirm}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Có, hủy lịch
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BookingHistoryTab;
