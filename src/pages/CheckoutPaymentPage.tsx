import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Check, Copy, ArrowLeft, Clock } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";
import stk from "../images/stk.png";
const CheckoutPaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  // Get booking data from URL params
  const bookingId = searchParams.get("bookingId") || `BK${Date.now()}`;
  const amount = searchParams.get("amount") || "0";
  const doctorName = searchParams.get("doctorName") || "";
  const hospitalName = searchParams.get("hospitalName") || "";

  // Payment information
  const paymentInfo = {
    bankName: "BIDV",
    accountNumber: "5321181932",
    accountName: "Hoang Bao Ngoc",
    transferContent: `HovaTen - TenDichVu - ${new Date()
      .getDate()
      .toString()
      .padStart(2, "0")}/${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${new Date().getFullYear()} - SENCARE`,
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=MOMO_TRANSFER_INFO",
  };

  useEffect(() => {
    if (timeLeft > 0 && !paymentCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, paymentCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Đã sao chép vào clipboard!");
  };

  const handlePaymentConfirmation = () => {
    setPaymentCompleted(true);
    toast.success(
      "Xác nhận thanh toán thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất."
    );
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-52">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center mb-6">
              <button onClick={() => navigate(-1)} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                Thanh toán đặt lịch khám
              </h1>
            </div>

            {!paymentCompleted ? (
              <>
                {/* Timer */}
                <Card className="mb-6 p-4 bg-orange-50 border-orange-200">
                  <div className="flex items-center justify-center">
                    <Clock className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="text-orange-600 font-medium">
                      Thời gian còn lại: {formatTime(timeLeft)}
                    </span>
                  </div>
                </Card>

                {/* Booking Summary */}
                <Card className="mb-6 p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Thông tin đặt lịch
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mã đặt lịch:</span>
                      <span className="font-medium">{bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bác sĩ:</span>
                      <span className="font-medium">{doctorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bệnh viện:</span>
                      <span className="font-medium">{hospitalName}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="text-gray-600">Tổng tiền:</span>
                      <span className="font-bold text-lg text-red-600">
                        {new Intl.NumberFormat("vi-VN").format(
                          parseInt(amount)
                        )}
                        đ
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Payment Information */}
                <Card className="mb-6 p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Thông tin chuyển khoản
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* QR Code */}
                    <div className="text-center">
                      <img
                        src={stk}
                        alt="QR Code"
                        className="mx-auto mb-4 border rounded-lg"
                      />
                      <p className="text-sm text-gray-600">
                        Quét mã QR để chuyển khoản
                      </p>
                    </div>

                    {/* Transfer Details */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ngân hàng
                        </label>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          <span>{paymentInfo.bankName}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              copyToClipboard(paymentInfo.bankName)
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số tài khoản
                        </label>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          <span>{paymentInfo.accountNumber}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              copyToClipboard(paymentInfo.accountNumber)
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Chủ tài khoản
                        </label>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          <span>{paymentInfo.accountName}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              copyToClipboard(paymentInfo.accountName)
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nội dung chuyển khoản
                        </label>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          <span className="text-sm">
                            {paymentInfo.transferContent}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              copyToClipboard(paymentInfo.transferContent)
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số tiền
                        </label>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          <span className="font-bold text-red-600">
                            {new Intl.NumberFormat("vi-VN").format(
                              parseInt(amount)
                            )}
                            đ
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(amount)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Instructions */}
                <Card className="mb-6 p-6 bg-blue-50 border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-3">
                    Hướng dẫn thanh toán
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-blue-700">
                    <li>Mở ứng dụng MoMo trên điện thoại</li>
                    <li>Chọn "Chuyển tiền" hoặc quét mã QR</li>
                    <li>Nhập thông tin chuyển khoản như trên</li>
                    <li>Kiểm tra kỹ nội dung chuyển khoản</li>
                    <li>Xác nhận chuyển tiền</li>
                    <li>
                      Sau khi chuyển thành công, nhấn "Đã thanh toán" bên dưới
                    </li>
                  </ol>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    fullWidth
                    size="lg"
                    onClick={handlePaymentConfirmation}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Đã thanh toán
                  </Button>
                </div>
              </>
            ) : (
              /* Success State */
              <Card className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Thanh toán thành công!
                </h2>
                <p className="text-gray-600 mb-6">
                  Chúng tôi đã nhận được thanh toán của bạn. Bộ phận chăm sóc
                  khách hàng sẽ liên hệ với bạn trong thời gian sớm nhất để xác
                  nhận lịch khám.
                </p>
                <Button onClick={() => navigate("/")}>Về trang chủ</Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPaymentPage;
