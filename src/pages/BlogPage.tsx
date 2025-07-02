import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Calendar,
  User,
  Tag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bookmark,
} from "lucide-react";
import { blogPosts, BlogPost } from "../data/mockData";

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [headerSlide, setHeaderSlide] = useState(0);

  const categories = [
    "Tất cả",
    "Hậu sản",
    "Thông tin dinh dưỡng",
    "Chăm sóc mẹ bầu",
    "Dinh dưỡng trẻ em",
    "Thuốc và thực phẩm chức năng",
    "Cấp cứu và An toàn",
    "Sức khỏe người cao tuổi",
    "Tim mạch",
    "Sức khỏe tâm thần",
    "Da liễu",
    "Sức khỏe phụ nữ",
    "Giấc ngủ và Nghỉ ngơi",
    "Bệnh mãn tính",
    "Nhãn khoa",
    "Cơ xương khớp",
    "Sức khỏe nam giới",
    "Truyền nhiễm",
    "Răng hàm mặt",
    "Ung thư học",
    "Thể thao và Sức khỏe",
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.max(1, filteredPosts.length - 2)
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.max(1, filteredPosts.length - 2)) %
        Math.max(1, filteredPosts.length - 2)
    );
  };

  const featuredArticles = blogPosts.slice(0, 3); // First 3 articles for header carousel

  // Auto-slide for header carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [featuredArticles.length]);

  const nextHeaderSlide = () => {
    setHeaderSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevHeaderSlide = () => {
    setHeaderSlide(
      (prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length
    );
  };

  const featuredPost = filteredPosts[0];
  const sidebarPosts = filteredPosts.slice(1, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Carousel */}
      <div className="relative bg-white shadow-lg overflow-hidden">
        <div className="relative h-96 md:h-[500px]">
          {/* Carousel slides */}
          <div className="relative w-full h-full">
            {featuredArticles.map((article, index) => (
              <div
                key={article.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === headerSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="relative w-full h-full">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                      <div className="max-w-2xl text-white">
                        <div className="mb-4">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${article.categoryColor} bg-opacity-90`}
                          >
                            {article.category}
                          </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                          {article.title}
                        </h1>

                        <p className="text-lg md:text-xl mb-6 text-gray-200 leading-relaxed">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center space-x-4 mb-6">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">
                              {article.author}
                            </span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm">{article.readTime}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm">
                            {new Date(article.date).toLocaleDateString("vi-VN")}
                          </span>
                        </div>

                        <Link
                          to={`/blog/${article.id}`}
                          className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold hover:transform hover:scale-105"
                        >
                          Đọc ngay
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevHeaderSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextHeaderSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeaderSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === headerSlide
                    ? "bg-white shadow-lg"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-3 min-w-max px-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            {featuredPost && (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <Link to={`/blog/${featuredPost.id}`}>
                  <img
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    className="w-full h-80 object-cover"
                  />
                </Link>
                <div className="p-8">
                  <Link to={`/blog/${featuredPost.id}`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-600 transition-colors">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {featuredPost.author}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 space-x-3">
                          <span>
                            {new Date(featuredPost.date).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                          <span>•</span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    Đọc tiếp
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Articles */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Bài viết khác
            </h3>
            {sidebarPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className="flex">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-24 h-24 object-cover flex-shrink-0"
                  />
                  <div className="p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${post.categoryColor}`}
                      >
                        {post.category}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
                      {post.title}
                    </h4>

                    <div className="flex items-center text-xs text-gray-500 space-x-2">
                      <span>{post.author.split(" ").slice(-3).join(" ")}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold">
              Xem thêm bài viết
            </button>
          </div>
        </div>

        {/* Carousel Section */}
        {filteredPosts.length > 3 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-900">
                Bài viết nổi bật
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={prevSlide}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
              >
                {filteredPosts.map((post) => (
                  <div key={post.id} className="w-1/3 flex-shrink-0 px-3">
                    <Link
                      to={`/blog/${post.id}`}
                      className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${post.categoryColor}`}
                          >
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {post.readTime}
                          </span>
                        </div>

                        <h4 className="font-bold text-gray-900 mb-3 line-clamp-2">
                          {post.title}
                        </h4>

                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {post.author.split(" ").slice(-3).join(" ")}
                          </span>
                          <Link
                            to={`/blog/${post.id}`}
                            className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                          >
                            Đọc thêm &rarr;
                          </Link>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
