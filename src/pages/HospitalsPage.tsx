import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapPin, Phone, Search } from "lucide-react";
import { Pagination, Input } from "antd";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { hospitals } from "../data/mockData";
import { services } from "../data/services";

const HospitalsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );

  const filteredHospitals = useMemo(() => {
    if (!searchQuery.trim()) {
      return hospitals;
    }
    return hospitals.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        hospital.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const paginatedHospitals = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredHospitals.slice(startIndex, endIndex);
  }, [filteredHospitals, currentPage, pageSize]);

  const totalElements = filteredHospitals.length;

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
              : "Danh sách bệnh viện"}
          </h1>
          <p className="text-white text-opacity-90 text-sm md:text-base">
            Tìm kiếm và đặt lịch khám tại các bệnh viện và phòng khám hàng đầu
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 py-6 md:py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-2">
            <Input.Search
              placeholder="Tìm kiếm bệnh viện theo tên..."
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
              Tìm thấy {totalElements} bệnh viện cho "{searchQuery}"
            </span>
          ) : (
            <span>
              Hiển thị {paginatedHospitals.length} trong tổng số {totalElements}{" "}
              bệnh viện
            </span>
          )}
        </div>

        {paginatedHospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {paginatedHospitals.map((hospital) => (
              <Card
                key={hospital.id}
                hoverable
                className="h-full flex flex-col"
              >
                <div className="h-40 md:h-48 overflow-hidden">
                  <img
                    src={hospital.thumbnail}
                    alt={hospital.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 md:p-5 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <Phone className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {hospital.location}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base mb-3 line-clamp-2 flex-grow">
                    {hospital.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Dịch vụ:</p>
                    <div className="flex flex-wrap gap-1">
                      {hospital.services.slice(0, 3).map((serviceId) => {
                        const service = services.find(
                          (s) => s.id === serviceId
                        );
                        return (
                          <span
                            key={serviceId}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                          >
                            {service ? service.name : `Dịch vụ ${serviceId}`}
                          </span>
                        );
                      })}
                      {hospital.services.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{hospital.services.length - 3} khác
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link to={`/hospitals/${hospital.id}`}>
                      <Button fullWidth>Xem chi tiết</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {searchQuery
                ? "Không tìm thấy bệnh viện nào phù hợp"
                : "Không có bệnh viện nào"}
            </p>
            {searchQuery && (
              <Button onClick={handleClearSearch}>Xem tất cả bệnh viện</Button>
            )}
          </div>
        )}

        {paginatedHospitals.length > 0 && (
          <div className="flex justify-center mt-6 md:mt-8">
            <Pagination
              current={currentPage}
              total={totalElements}
              pageSize={pageSize}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} của ${totalElements} bệnh viện`
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

export default HospitalsPage;
