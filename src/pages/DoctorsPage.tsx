import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination, Input } from "antd";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { doctors, hospitals } from "../data/mockData";

const DoctorsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );

  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) {
      return doctors;
    }
    return doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.bio.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const paginatedDoctors = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredDoctors.slice(startIndex, endIndex);
  }, [filteredDoctors, currentPage, pageSize]);

  const totalElements = filteredDoctors.length;

  const getHospitalName = (hospitalId: string) => {
    const hospital = hospitals.find((h) => h.id === hospitalId);
    return hospital?.name || "Unknown Hospital";
  };

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    if (searchQuery.trim()) {
      setSearchParams({ query: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {searchQuery
              ? `Kết quả tìm kiếm: "${searchQuery}"`
              : "Danh sách bác sĩ"}
          </h1>
          <p className="text-white text-opacity-90 text-sm md:text-base">
            Tìm kiếm và đặt lịch khám với các bác sĩ chuyên môn cao
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 py-6 md:py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-2">
            <Input.Search
              placeholder="Tìm kiếm bác sĩ theo tên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              onPressEnter={handleSearch}
              size="large"
              allowClear
              className="flex-1"
            />
            {searchQuery && (
              <Button onClick={handleClearSearch} variant="outline">
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </div>

        <div className="mb-4 text-gray-600 text-sm md:text-base">
          {searchQuery ? (
            <span>
              Tìm thấy {totalElements} bác sĩ cho "{searchQuery}"
            </span>
          ) : (
            <span>
              Hiển thị {paginatedDoctors.length} trong tổng số {totalElements}{" "}
              bác sĩ
            </span>
          )}
        </div>

        {paginatedDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {paginatedDoctors.map((doctor) => (
              <Card key={doctor.id} hoverable className="text-center">
                <div className="pt-4 px-4 md:pt-6 md:px-6">
                  <div className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-2">
                    {getHospitalName(doctor.hospitalId)}
                  </p>
                  <p className="text-teal-600 font-semibold mb-2 text-sm md:text-base">
                    {new Intl.NumberFormat("vi-VN").format(
                      doctor.consultationFee
                    )}
                    đ
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 line-clamp-2">
                    {doctor.specialty}
                  </p>
                </div>
                <div className="px-4 pb-4 md:px-6 md:pb-6">
                  <Link to={`/doctors/${doctor.id}`}>
                    <Button fullWidth>Xem chi tiết</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {searchQuery
                ? "Không tìm thấy bác sĩ nào phù hợp"
                : "Không có bác sĩ nào"}
            </p>
            {searchQuery && (
              <Button onClick={handleClearSearch}>Xem tất cả bác sĩ</Button>
            )}
          </div>
        )}

        {paginatedDoctors.length > 0 && (
          <div className="flex justify-center mt-6 md:mt-8">
            <Pagination
              current={currentPage}
              total={totalElements}
              pageSize={pageSize}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} của ${total} bác sĩ`
              }
              onChange={handlePageChange}
              onShowSizeChange={handlePageChange}
              className="mt-4"
              size="small"
              responsive
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DoctorsPage;
