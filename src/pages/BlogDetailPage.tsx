import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";
import { getBlogPostById, getRelatedPosts, BlogPost } from "../data/mockData";

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const post = getBlogPostById(parseInt(id));
      if (post) {
        setBlogPost(post);
        setRelatedPosts(getRelatedPosts(post));
      }
      setLoading(false);
    }
  }, [id]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blogPost?.title || "";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Bài viết không tồn tại
          </h1>
          <button
            onClick={() => navigate("/blog")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{blogPost.category}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${blogPost.categoryColor}`}
            >
              {blogPost.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blogPost.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {blogPost.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span className="font-medium">{blogPost.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{new Date(blogPost.date).toLocaleDateString("vi-VN")}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{blogPost.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blogPost.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            <span className="text-gray-700 font-medium">Chia sẻ:</span>
            <button
              onClick={() => handleShare("facebook")}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={blogPost.imageUrl}
            alt={blogPost.title}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
            style={{
              lineHeight: "1.8",
              fontSize: "18px",
            }}
          />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${post.categoryColor}`}
                      >
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{post.readTime}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {new Date(post.date).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;
