import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title:
      "Giới thiệu ứng dụng Sencare – Trợ lý chăm sóc sức khỏe toàn diện cho gia đình",
    excerpt:
      "Khám phá Sencare – ứng dụng y tế thông minh tích hợp đặt lịch khám, dịch vụ y tế tại nhà và công cụ AI hỗ trợ chăm sóc sức khỏe mẹ và bé.",
    content: `
        <h2>Sencare – Người bạn đồng hành chăm sóc sức khỏe thông minh</h2>
        <p>Sencare là ứng dụng di động tích hợp các dịch vụ chăm sóc sức khỏe toàn diện, giúp người dùng dễ dàng kết nối với bệnh viện, bác sĩ và các dịch vụ y tế cần thiết. Không chỉ vậy, Sencare còn ứng dụng trí tuệ nhân tạo (AI) để hỗ trợ người dùng theo dõi sức khỏe, đặc biệt là trong giai đoạn mang thai và sau sinh.</p>
  
        <h3>Đặt lịch khám nhanh chóng và tiện lợi</h3>
        <ul>
          <li><strong>Đặt lịch khám bệnh:</strong> Người dùng có thể đặt lịch với các bệnh viện, phòng khám uy tín trên toàn quốc chỉ với vài thao tác.</li>
          <li><strong>Chọn bác sĩ theo chuyên khoa:</strong> Tìm kiếm bác sĩ phù hợp theo chuyên môn, đánh giá và kinh nghiệm.</li>
          <li><strong>Dịch vụ y tế tại nhà:</strong> Đặt dịch vụ tiêm chủng, xét nghiệm, khám tại nhà cho người lớn tuổi, phụ nữ mang thai và trẻ nhỏ.</li>
        </ul>
  
        <h3>Trợ lý AI hỗ trợ chăm sóc sức khỏe</h3>
        <ul>
          <li><strong>Tính chỉ số BMI:</strong> Tự động tính toán chỉ số khối cơ thể (BMI) để theo dõi cân nặng lý tưởng.</li>
          <li><strong>Công cụ tính chỉ số thai kỳ:</strong> Dự đoán ngày sinh, theo dõi sự phát triển thai nhi theo từng tuần.</li>
          <li><strong>Lịch tiêm chủng & nhắc nhở:</strong> Theo dõi lịch tiêm của bé và nhận thông báo nhắc nhở kịp thời.</li>
          <li><strong>Phân tích dữ liệu sức khỏe:</strong> AI hỗ trợ đánh giá tình trạng sức khỏe dựa trên các chỉ số đầu vào.</li>
        </ul>
  
        <h3>Giao diện thân thiện, dễ sử dụng</h3>
        <p>Giao diện Sencare được thiết kế đơn giản, dễ sử dụng cho mọi lứa tuổi, đặc biệt là người cao tuổi và phụ nữ mang thai. Ứng dụng hỗ trợ ngôn ngữ tiếng Việt và tích hợp chatbot chăm sóc sức khỏe 24/7.</p>
  
        <h3>Lợi ích khi sử dụng Sencare</h3>
        <ul>
          <li>Tiết kiệm thời gian và chi phí đi lại</li>
          <li>Chủ động quản lý và theo dõi tình trạng sức khỏe cá nhân</li>
          <li>Kết nối nhanh chóng với đội ngũ bác sĩ uy tín</li>
          <li>Nhận tư vấn sức khỏe kịp thời, chính xác</li>
        </ul>
  
        <p><em>Ứng dụng Sencare là giải pháp y tế số hóa hiện đại, giúp mỗi gia đình chủ động hơn trong hành trình chăm sóc sức khỏe. Tải ngay ứng dụng để trải nghiệm!</em></p>
      `,
    author: "Thạc sĩ - Bác sĩ Nguyễn Minh Hạnh",
    date: "2024-12-20",
    category: "Ứng dụng y tế",
    tags: ["ứng dụng sức khỏe", "AI y tế", "mẹ và bé", "chăm sóc tại nhà"],
    imageUrl:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/504408397_122108031062891673_3862950004951041225_n.png?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=X_YEkRT9lR8Q7kNvwHhvv6h&_nc_oc=AdmTSa1DfEEBTvLBOwZeXNflgVWQlvXf52t0LmYajs_v064tiTiJDoo7SU5whEkhpherU5WL3AQQEh2Usf30UIi6&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=K8kqr_C6Rd7_m9z3W0Vm4w&oh=00_AfRqeY244qHHv-Wk0791hxWf1__3H3umjtJBgYUwsK8GjA&oe=686FCF47",
    readTime: "4 phút đọc",
    categoryColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    title: "Hướng dẫn chăm sóc mẹ và bé sau sinh tháng đầu sau sinh",
    excerpt:
      "Tìm hiểu cách chăm sóc mẹ và bé một cách khoa học trong tháng đầu sau sinh để đảm bảo sức khỏe tốt nhất.",
    content: `
        <h2>Tháng đầu sau sinh – giai đoạn quan trọng</h2>
        <p>Tháng đầu sau sinh là thời gian quan trọng nhất cho cả mẹ và bé. Đây là giai đoạn cả hai cần thích nghi với những thay đổi lớn và được chăm sóc đặc biệt.</p>
  
        <h3>Chăm sóc mẹ sau sinh</h3>
        <ul>
          <li><strong>Nghỉ ngơi đầy đủ:</strong> Mẹ cần ngủ ít nhất 8 tiếng mỗi ngày và ngủ trưa khi có thể</li>
          <li><strong>Dinh dưỡng hợp lý:</strong> Bổ sung đầy đủ protein, vitamin và khoáng chất</li>
          <li><strong>Vệ sinh cá nhân:</strong> Giữ gìn vệ sinh vùng kín, thay băng vệ sinh thường xuyên</li>
          <li><strong>Tập luyện nhẹ nhàng:</strong> Bắt đầu với các bài tập thở và co cơ bụng nhẹ</li>
        </ul>
  
        <h3>Chăm sóc bé sơ sinh</h3>
        <ul>
          <li><strong>Cho bú mẹ:</strong> Bú mẹ hoàn toàn trong 6 tháng đầu</li>
          <li><strong>Vệ sinh rốn:</strong> Lau rốn bằng cồn 70° 2‑3 lần/ngày</li>
          <li><strong>Tắm cho bé:</strong> Tắm 2‑3 lần/tuần bằng nước ấm</li>
          <li><strong>Theo dõi sức khỏe:</strong> Quan sát thân nhiệt, màu da, hoạt động của bé</li>
        </ul>
  
        <h3>Dấu hiệu cần khám ngay</h3>
        <ul>
          <li>Sốt trên 38°C</li>
          <li>Bé bú kém, quấy khóc liên tục</li>
          <li>Da vàng bất thường</li>
          <li>Khó thở, thở nhanh</li>
        </ul>
  
        <p><em>Lưu ý: Đây chỉ là thông tin tham khảo. Bạn nên tham khảo ý kiến bác sĩ để có lời khuyên phù hợp với tình trạng cụ thể.</em></p>
      `,
    author: "Thạc sĩ - Bác sĩ Huỳnh Kim Dung",
    date: "2024-01-15",
    category: "Hậu sản",
    tags: ["chăm sóc", "sau sinh", "sức khỏe", "mẹ và bé"],
    imageUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600",
    readTime: "5 phút đọc",
    categoryColor: "bg-pink-100 text-pink-800",
  },
  {
    id: 3,
    title:
      "Chuyên gia giải đáp: Nước trái cây lên men có tốt cho sức khỏe không?",
    excerpt:
      "Tìm hiểu về lợi ích và tác hại của nước trái cây lên men đối với sức khỏe từ chuyên gia dinh dưỡng.",
    content: `
        <h2>Lợi ích và lưu ý khi sử dụng nước trái cây lên men</h2>
        <p>Nước trái cây lên men ngày càng được quan tâm vì chứa nhiều lợi khuẩn và enzyme có lợi cho tiêu hóa. Tuy nhiên, cần biết cách sử dụng khoa học để tránh tác dụng phụ.</p>
  
        <h3>Lợi ích chính</h3>
        <ul>
          <li><strong>Cân bằng hệ vi sinh đường ruột:</strong> Giúp tiêu hóa tốt hơn và giảm tình trạng táo bón</li>
          <li><strong>Tăng cường hệ miễn dịch:</strong> Lợi khuẩn hỗ trợ chống lại vi khuẩn xấu</li>
          <li><strong>Hỗ trợ giảm cân:</strong> Ít calo, tạo cảm giác no tự nhiên</li>
          <li><strong>Làm đẹp da:</strong> Chất chống oxy hóa từ trái cây giúp da khỏe và sáng hơn</li>
        </ul>
  
        <h3>Lưu ý khi dùng</h3>
        <ul>
          <li>Không dùng cho người có bệnh dạ dày nặng</li>
          <li>Phụ nữ mang thai/cho con bú nên hỏi bác sĩ trước khi sử dụng</li>
          <li>Nên chọn sản phẩm không chứa cồn hoặc đường quá mức</li>
        </ul>
  
        <p><em>Lưu ý: Tham khảo ý kiến chuyên gia y tế để đảm bảo an toàn và hiệu quả tối ưu.</em></p>
      `,
    author: "Ban Tham vấn Y khoa Sencare",
    date: "2024-01-12",
    category: "Thông tin dinh dưỡng",
    tags: ["dinh dưỡng", "nước trái cây", "sức khỏe", "lên men"],
    imageUrl:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600",
    readTime: "7 phút đọc",
    categoryColor: "bg-orange-100 text-orange-800",
  },
  {
    id: 4,
    title: "Review 16 loại kem dưỡng ẩm cho bà bầu được nhiều người tin dùng",
    excerpt:
      "Khám phá những sản phẩm kem dưỡng ẩm an toàn và hiệu quả dành riêng cho phụ nữ mang thai.",
    content: `
        <h2>Kem dưỡng ẩm an toàn cho bà bầu</h2>
        <p>Trong thai kỳ, làn da trở nên nhạy cảm và dễ bị khô. Việc chọn kem dưỡng phù hợp giúp duy trì độ ẩm và tránh kích ứng.</p>
  
        <h3>Tiêu chí lựa chọn</h3>
        <ul>
          <li><strong>Không chứa hương liệu:</strong> Giảm nguy cơ kích ứng da</li>
          <li><strong>Thành phần thiên nhiên:</strong> Như bơ hạt mỡ, dầu jojoba</li>
          <li><strong>Không paraben, retinoid:</strong> An toàn cho thai nhi</li>
          <li><strong>Kiểm nghiệm da liễu:</strong> Ưu tiên các sản phẩm đã được thử nghiệm</li>
        </ul>
  
        <h3>Cách sử dụng hiệu quả</h3>
        <ul>
          <li>Thoa sau khi tắm và trước khi ngủ</li>
          <li>Dùng lượng vừa đủ và mát xa nhẹ nhàng vùng bụng, đùi</li>
        </ul>
  
        <p><em>Lưu ý: Nên kiểm tra thử trên vùng da nhỏ trước khi sử dụng toàn thân.</em></p>
      `,
    author: "Ban Tham vấn Y khoa Sencare",
    date: "2024-01-10",
    category: "Chăm sóc mẹ bầu",
    tags: ["mẹ bầu", "kem dưỡng", "làm đẹp", "an toàn"],
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    readTime: "6 phút đọc",
    categoryColor: "bg-purple-100 text-purple-800",
  },
  {
    id: 5,
    title: "10 thực phẩm tăng cường miễn dịch cho trẻ em trong mùa đông",
    excerpt:
      "Danh sách những thực phẩm giàu dinh dưỡng giúp tăng cường hệ miễn dịch cho trẻ nhỏ.",
    content: `
        <h2>Tăng cường miễn dịch cho trẻ em trong mùa đông</h2>
        <p>Mùa đông khiến trẻ dễ mắc bệnh vì thời tiết lạnh. Dưới đây là 10 thực phẩm giúp cải thiện sức đề kháng cho bé.</p>
  
        <h3>Danh sách thực phẩm</h3>
        <ul>
          <li><strong>Cam, quýt:</strong> Giàu vitamin C giúp tăng cường đề kháng</li>
          <li><strong>Sữa chua:</strong> Cung cấp probiotics hỗ trợ tiêu hóa</li>
          <li><strong>Trứng:</strong> Nguồn protein và vitamin D</li>
          <li><strong>Cá hồi:</strong> Giàu omega‑3, tốt cho miễn dịch</li>
          <li><strong>Súp lơ xanh:</strong> Chống oxy hóa</li>
          <li><strong>Tỏi:</strong> Tính kháng khuẩn tự nhiên</li>
          <li><strong>Mật ong:</strong> Làm dịu cổ họng, tăng sức đề kháng</li>
          <li><strong>Khoai lang:</strong> Cung cấp beta‑caroten</li>
          <li><strong>Hạnh nhân:</strong> Vitamin E hỗ trợ miễn dịch</li>
          <li><strong>Đu đủ:</strong> Giúp tiêu hóa và hấp thụ tốt hơn</li>
        </ul>
  
        <p><em>Lưu ý: Tham khảo bác sĩ khi bổ sung chế độ ăn cho trẻ nhỏ.</em></p>
      `,
    author: "Bác sĩ Nguyễn Thị Lan Anh",
    date: "2024-01-08",
    category: "Dinh dưỡng trẻ em",
    tags: ["trẻ em", "miễn dịch", "dinh dưỡng", "mùa đông"],
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    readTime: "8 phút đọc",
    categoryColor: "bg-green-100 text-green-800",
  },
  {
    id: 6,
    title:
      "Vắc xin phế cầu cho người lớn và người cao tuổi: Mũi tiêm thiết yếu",
    excerpt:
      "Tìm hiểu về tầm quan trọng của vắc xin phế cầu trong việc bảo vệ sức khỏe người lớn và người cao tuổi.",
    content: `
        <h2>Tầm quan trọng của vắc xin phế cầu</h2>
        <p>Vắc xin phế cầu phòng ngừa các bệnh nhiễm trùng nghiêm trọng như viêm phổi và viêm màng não, nhất là ở người cao tuổi.</p>
  
        <h3>Đối tượng nên tiêm</h3>
        <ul>
          <li>Người trên 65 tuổi</li>
          <li>Người có bệnh mạn tính (tiểu đường, tim mạch...)</li>
          <li>Người suy giảm miễn dịch</li>
        </ul>
  
        <h3>Lịch tiêm phòng</h3>
        <ul>
          <li>Tiêm 1 mũi PCV13</li>
          <li>Tiếp theo sau 1 năm là mũi PPSV23</li>
        </ul>
  
        <p><em>Lưu ý: Tham khảo bác sĩ để được tư vấn lịch tiêm phù hợp.</em></p>
      `,
    author: "Ban Tham vấn Y khoa Sencare",
    date: "2024-01-05",
    category: "Thuốc và thực phẩm chức năng",
    tags: ["vắc xin", "phòng bệnh", "người cao tuổi", "phế cầu"],
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600",
    readTime: "10 phút đọc",
    categoryColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 7,
    title: "Bí quyết giữ dáng sau sinh không cần ăn kiêng khắc nghiệt",
    excerpt:
      "Học cách lấy lại vóc dáng sau sinh một cách tự nhiên và an toàn cho sức khỏe.",
    content: `
        <h2>Bí quyết giữ dáng sau sinh an toàn</h2>
        <p>Giữ dáng sau sinh không đồng nghĩa với ăn kiêng khắc nghiệt. Bạn hoàn toàn có thể trở lại vóc dáng bằng cách khoa học và an toàn.</p>
        <h3>3 nguyên tắc vàng</h3>
        <ul>
          <li><strong>Dinh dưỡng cân bằng:</strong> Ưu tiên đạm, rau xanh, trái cây và chất béo tốt</li>
          <li><strong>Tập luyện nhẹ nhàng:</strong> Yoga sau sinh, đi bộ, thở cơ bụng</li>
          <li><strong>Nghỉ ngơi hợp lý:</strong> Giấc ngủ và giảm stress giúp giảm mỡ hiệu quả</li>
        </ul>
        <p><em>Lưu ý: Không ép cân quá nhanh, tốt nhất giảm 0.5–1kg mỗi tuần.</em></p>
      `,
    author: "Chuyên gia dinh dưỡng Phạm Mai Hương",
    date: "2024-01-20",
    category: "Hậu sản",
    tags: ["giữ dáng", "sau sinh", "tập luyện", "dinh dưỡng"],
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
    readTime: "9 phút đọc",
    categoryColor: "bg-pink-100 text-pink-800",
  },
  {
    id: 8,
    title: "Yoga cho bà bầu: Tư thế an toàn theo từng giai đoạn thai kỳ",
    excerpt:
      "Hướng dẫn chi tiết các tư thế yoga phù hợp và an toàn cho từng giai đoạn mang thai.",
    content: `<h2>Lợi ích của yoga trong thai kỳ</h2>
  <p>Yoga giúp cải thiện sự linh hoạt, giảm đau lưng và lo âu, tăng sự kết nối giữa mẹ và bé.</p>
  
  <h3>Tư thế an toàn theo giai đoạn</h3>
  <ul>
    <li><strong>Tam cá nguyệt đầu (0–12 tuần):</strong> Tập tư thế nhẹ như tư thế "ngồi thiền" và thở sâu</li>
    <li><strong>Tam cá nguyệt giữa (13–27 tuần):</strong> Bắt đầu thêm tư thế nghiêng trái, tư thế em bé</li>
    <li><strong>Tam cá nguyệt cuối (28 tuần trở lên):</strong> Ưu tiên tư thế đứng nâng độ cao thấp để tránh áp lực lên bụng</li>
  </ul>
  
  <h3>Lưu ý khi tập</h3>
  <ul>
    <li>Không nằm ngửa lâu sau 20 tuần</li>
    <li>Luôn giữ thăng bằng và nghe cơ thể</li>
    <li>Xin tư vấn huấn luyện viên chuyên về yoga bầu</li>
  </ul>
  
  <p><em>Lưu ý: Nếu có tiền sử sinh non hoặc bệnh lý, hãy hỏi ý kiến bác sĩ trước.</em></p>`,
    author: "Huấn luyện viên Yoga Trần Minh Châu",
    date: "2024-01-18",
    category: "Chăm sóc mẹ bầu",
    tags: ["yoga", "mẹ bầu", "tập luyện", "thai kỳ"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
    readTime: "12 phút đọc",
    categoryColor: "bg-purple-100 text-purple-800",
  },
  {
    id: 9,
    title: "Thực đơn DASH diet giúp kiểm soát huyết áp hiệu quả",
    excerpt:
      "Khám phá chế độ ăn DASH được các chuyên gia tim mạch khuyến nghị để kiểm soát huyết áp.",
    content: `<h2>Chế độ DASH là gì?</h2>
  <p>DASH là chế độ ăn nhiều rau, trái cây, ngũ cốc nguyên cám và ít muối, giúp kiểm soát huyết áp hiệu quả.</p>
  
  <h3>Thành phần chính của DASH</h3>
  <ul>
    <li>Rau củ quả tươi</li>
    <li>Ngũ cốc nguyên cám</li>
    <li>Sữa ít béo hoặc sữa chua</li>
    <li>Thịt gà, cá, thịt nạc</li>
    <li>Giới hạn muối dưới 2.300 mg/ngày</li>
  </ul>
  
  <p><em>Lưu ý: Kết hợp vận động và kiểm tra huyết áp định kỳ.</em></p>`,
    author: "Tiến sĩ Lê Văn Minh - Chuyên khoa Tim mạch",
    date: "2024-01-22",
    category: "Thông tin dinh dưỡng",
    tags: ["DASH diet", "huyết áp", "tim mạch", "chế độ ăn"],
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
    readTime: "11 phút đọc",
    categoryColor: "bg-orange-100 text-orange-800",
  },
  {
    id: 10,
    title: "Cách nhận biết và xử lý sốt ở trẻ em tại nhà",
    excerpt:
      "Hướng dẫn cha mẹ cách nhận biết mức độ sốt và các biện pháp xử lý ban đầu an toàn.",
    content: `<h2>Sốt ở trẻ em: Khi nào là bình thường?</h2>
  <p>Sốt là phản ứng bảo vệ cơ thể, nhưng cần được theo dõi và xử lý đúng cách.</p>
  
  <h3>Hướng dẫn theo độ tuổi</h3>
  <ul>
    <li><strong>Dưới 3 tháng:</strong> Sốt > 38°C cần đưa đi khám</li>
    <li><strong>3–36 tháng:</strong> Dùng hạ sốt nếu > 38.5°C</li>
    <li><strong>Trên 36 tháng:</strong> Cho uống nhiều nước, theo dõi triệu chứng</li>
  </ul>
  
  <h3>Lưu ý khi chăm sóc</h3>
  <ul>
    <li>Cho bé uống đủ nước và nghỉ ngơi nhiều</li>
    <li>Liên hệ bác sĩ nếu sốt kéo dài > 3 ngày hoặc có dấu hiệu bất thường</li>
  </ul>`,
    author: "Bác sĩ Nhi khoa Võ Thị Hồng Nhung",
    date: "2024-01-25",
    category: "Dinh dưỡng trẻ em",
    tags: ["sốt", "trẻ em", "chăm sóc", "xử lý tại nhà"],
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
    readTime: "7 phút đọc",
    categoryColor: "bg-green-100 text-green-800",
  },
  {
    id: 11,
    title: "Tác dụng phụ của thuốc kháng sinh và cách sử dụng đúng",
    excerpt:
      "Tìm hiểu về tác dụng phụ của kháng sinh và nguyên tắc sử dụng an toàn, hiệu quả.",
    content: `<h2>Thuốc kháng sinh: khi nào nên dùng?</h2>
  <p>Kháng sinh chỉ nên dùng khi có nhiễm khuẩn; sử dụng bừa bãi dễ gây kháng thuốc và tổn thương gan, thận.</p>
  
  <h3>Tác dụng phụ thường gặp</h3>
  <ul>
    <li>Rối loạn tiêu hóa như tiêu chảy, buồn nôn</li>
    <li>Phản ứng dị ứng: mẩn ngứa, nổi mề đay</li>
    <li>Tổn hại gan, thận nếu dùng kéo dài</li>
  </ul>
  
  <h3>Hướng dẫn dùng đúng</h3>
  <ul>
    <li>Uống đúng liều, đủ ngày quy định</li>
    <li>Không tự ý ngưng thuốc sớm hoặc lạm dụng kháng sinh</li>
    <li>Tham vấn bác sĩ nếu có triệu chứng bất thường</li>
  </ul>`,
    author: "Dược sĩ Nguyễn Minh Tâm",
    date: "2024-01-28",
    category: "Thuốc và thực phẩm chức năng",
    tags: ["kháng sinh", "tác dụng phụ", "sử dụng thuốc", "an toàn"],
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600",
    readTime: "9 phút đọc",
    categoryColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 12,
    title: "Massage cho bé sơ sinh: Kỹ thuật và lợi ích cho sự phát triển",
    excerpt:
      "Hướng dẫn các kỹ thuật massage nhẹ nhàng giúp bé sơ sinh phát triển toàn diện.",
    content:
      "Massage cho trẻ sơ sinh không chỉ giúp bé thư giãn mà còn kích thích sự phát triển...",
    author: "Chuyên gia chăm sóc trẻ em Lê Thị Hoa",
    date: "2024-01-30",
    category: "Hậu sản",
    tags: ["massage", "sơ sinh", "phát triển", "chăm sóc bé"],
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
    readTime: "8 phút đọc",
    categoryColor: "bg-pink-100 text-pink-800",
  },
  {
    id: 13,
    title: "Chế độ ăn kiêng Keto: Lợi ích và rủi ro cần biết",
    excerpt:
      "Phân tích chi tiết về chế độ ăn Keto, những lợi ích và những rủi ro tiềm ẩn.",
    content:
      "Chế độ ăn Keto (Ketogenic diet) đã trở thành xu hướng giảm cân phổ biến...",
    author: "Chuyên gia dinh dưỡng Trần Văn Đức",
    date: "2024-02-02",
    category: "Thông tin dinh dưỡng",
    tags: ["Keto", "giảm cân", "chế độ ăn", "sức khỏe"],
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
    readTime: "10 phút đọc",
    categoryColor: "bg-orange-100 text-orange-800",
  },
  {
    id: 14,
    title: "Phòng ngừa rạn da khi mang thai: Bí quyết từ chuyên gia",
    excerpt:
      "Những phương pháp hiệu quả để phòng ngừa rạn da trong thai kỳ từ các chuyên gia da liễu.",
    content: "Rạn da là nỗi lo của nhiều phụ nữ trong thời kỳ mang thai...",
    author: "Bác sĩ Da liễu Nguyễn Thị Bích Ngọc",
    date: "2024-02-05",
    category: "Chăm sóc mẹ bầu",
    tags: ["rạn da", "phòng ngừa", "thai kỳ", "chăm sóc da"],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbEB7T9M0wZ0dF1Tgh00v8uVSs_mKbHahKoA&s",
    readTime: "6 phút đọc",
    categoryColor: "bg-purple-100 text-purple-800",
  },
  {
    id: 15,
    title: "Vitamin D cho trẻ em: Tầm quan trọng và nguồn bổ sung",
    excerpt:
      "Tìm hiểu về vai trò quan trọng của vitamin D đối với sự phát triển của trẻ em.",
    content:
      "Vitamin D đóng vai trò thiết yếu trong sự phát triển xương và hệ miễn dịch của trẻ...",
    author: "Bác sĩ Nhi khoa Phạm Thanh Hải",
    date: "2024-02-08",
    category: "Dinh dưỡng trẻ em",
    tags: ["vitamin D", "trẻ em", "phát triển", "dinh dưỡng"],
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600",
    readTime: "7 phút đọc",
    categoryColor: "bg-green-100 text-green-800",
  },
  {
    id: 16,
    title: "Probiotics: Lợi khuẩn đường ruột và tác dụng với sức khỏe",
    excerpt:
      "Khám phá thế giới vi sinh vật có lợi và tác động tích cực của chúng đối với sức khỏe tổng thể.",
    content:
      "Probiotics hay còn gọi là lợi khuẩn đã được chứng minh có nhiều lợi ích...",
    author: "Tiến sĩ Y học Lê Minh Quang",
    date: "2024-02-10",
    category: "Thuốc và thực phẩm chức năng",
    tags: ["probiotics", "lợi khuẩn", "đường ruột", "tiêu hóa"],
    imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600",
    readTime: "9 phút đọc",
    categoryColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 17,
    title: "Cách nhận biết sớm dấu hiệu đột quỵ và sơ cứu khẩn cấp",
    excerpt:
      "Học cách nhận biết các dấu hiệu đột quỵ và kỹ thuật sơ cứu cần thiết để cứu sống người bệnh.",
    content: `
        <h2>Đột quỵ - Tình trạng cấp cứu nguy hiểm</h2>
        <p>Đột quỵ là tình trạng cấp cứu y tế nghiêm trọng xảy ra khi máu không được cung cấp đến một phần của não. Việc nhận biết sớm và xử lý kịp thời có thể cứu sống người bệnh và giảm thiểu di chứng.</p>
  
        <h3>Dấu hiệu nhận biết đột quỵ - Quy tắc FAST</h3>
        <ul>
          <li><strong>F - Face (Mặt):</strong> Mặt bị lệch, cười méo miệng</li>
          <li><strong>A - Arms (Cánh tay):</strong> Yếu hoặc tê một bên cánh tay</li>
          <li><strong>S - Speech (Lời nói):</strong> Nói không rõ, khó hiểu</li>
          <li><strong>T - Time (Thời gian):</strong> Gọi cấp cứu ngay lập tức</li>
        </ul>
  
        <h3>Các dấu hiệu khác của đột quỵ</h3>
        <ul>
          <li>Đau đầu dữ dội đột ngột</li>
          <li>Mất thăng bằng, choáng váng</li>
          <li>Mờ mắt hoặc mất thị lực</li>
          <li>Buồn nôn, nôn</li>
          <li>Tê hoặc yếu đột ngột một bên cơ thể</li>
        </ul>
  
        <h3>Cách sơ cứu người bị đột quỵ</h3>
        <ol>
          <li><strong>Gọi cấp cứu 115 ngay lập tức</strong></li>
          <li>Giữ bình tĩnh và an ủi người bệnh</li>
          <li>Đặt người bệnh nằm nghiêng để tránh sặc</li>
          <li>Nới lỏng quần áo, cởi cravat</li>
          <li>Không cho ăn, uống gì</li>
          <li>Theo dõi nhịp thở và mạch</li>
          <li>Ghi chú thời gian xuất hiện triệu chứng</li>
        </ol>
  
        <h3>Phòng ngừa đột quỵ</h3>
        <ul>
          <li>Kiểm soát huyết áp</li>
          <li>Tập thể dục đều đặn</li>
          <li>Ăn uống lành mạnh</li>
          <li>Không hút thuốc, hạn chế rượu bia</li>
          <li>Kiểm tra sức khỏe định kỳ</li>
        </ul>
  
        <p><strong>Lưu ý quan trọng:</strong> Thời gian vàng để điều trị đột quỵ là 3-4.5 giờ đầu. Việc nhận biết sớm và đưa đến bệnh viện kịp thời có thể cứu sống và giảm thiểu di chứng nghiêm trọng.</p>
      `,
    author: "Bác sĩ Thần kinh Nguyễn Văn Bình",
    date: "2024-02-12",
    category: "Cấp cứu và An toàn",
    tags: ["đột quỵ", "sơ cứu", "cấp cứu", "thần kinh"],
    imageUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600",
    readTime: "8 phút đọc",
    categoryColor: "bg-red-100 text-red-800",
  },
  {
    id: 18,
    title: "Tập thể dục cho người cao tuổi: Bài tập an toàn và hiệu quả",
    excerpt:
      "Hướng dẫn các bài tập phù hợp giúp người cao tuổi duy trì sức khỏe và độ linh hoạt.",
    content:
      "Tập thể dục đều đặn giúp người cao tuổi duy trì sức khỏe, tăng cường cơ bắp và cải thiện chất lượng cuộc sống...",
    author: "Chuyên gia Vật lý trị liệu Trần Thị Mai",
    date: "2024-02-14",
    category: "Sức khỏe người cao tuổi",
    tags: ["người cao tuổi", "tập thể dục", "vật lý trị liệu", "sức khỏe"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
    readTime: "10 phút đọc",
    categoryColor: "bg-teal-100 text-teal-800",
  },
  {
    id: 19,
    title: "Chăm sóc sức khỏe tim mạch: Phòng ngừa bệnh tim hiệu quả",
    excerpt:
      "Các biện pháp phòng ngừa bệnh tim mạch thông qua chế độ ăn uống và lối sống lành mạnh.",
    content:
      "Bệnh tim mạch là nguyên nhân tử vong hàng đầu thế giới, nhưng có thể phòng ngừa hiệu quả...",
    author: "Tiến sĩ Tim mạch Lê Hoàng Nam",
    date: "2024-02-16",
    category: "Tim mạch",
    tags: ["tim mạch", "phòng ngừa", "lối sống", "chế độ ăn"],
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600",
    readTime: "12 phút đọc",
    categoryColor: "bg-rose-100 text-rose-800",
  },
  {
    id: 20,
    title: "Quản lý căng thẳng và stress trong cuộc sống hiện đại",
    excerpt:
      "Khám phá các phương pháp hiệu quả để quản lý căng thẳng và cải thiện sức khỏe tâm thần.",
    content:
      "Stress là vấn đề phổ biến trong cuộc sống hiện đại, ảnh hưởng nghiêm trọng đến sức khỏe...",
    author: "Bác sĩ Tâm lý Phạm Thị Hương",
    date: "2024-02-18",
    category: "Sức khỏe tâm thần",
    tags: ["stress", "căng thẳng", "tâm lý", "sức khỏe tinh thần"],
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
    readTime: "9 phút đọc",
    categoryColor: "bg-indigo-100 text-indigo-800",
  },
  {
    id: 21,
    title: "Chăm sóc da mùa hè: Bảo vệ da khỏi tia UV và ô nhiễm",
    excerpt:
      "Hướng dẫn chi tiết cách chăm sóc và bảo vệ làn da trong mùa hè nóng bức.",
    content:
      "Mùa hè với nắng nóng và ô nhiễm không khí có thể gây hại nghiêm trọng cho làn da...",
    author: "Bác sĩ Da liễu Võ Minh Châu",
    date: "2024-02-20",
    category: "Da liễu",
    tags: ["chăm sóc da", "mùa hè", "tia UV", "ô nhiễm"],
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    readTime: "7 phút đọc",
    categoryColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 22,
    title: "Phòng ngừa loãng xương ở phụ nữ sau mãn kinh",
    excerpt:
      "Tìm hiểu về nguyên nhân và các biện pháp phòng ngừa loãng xương hiệu quả.",
    content:
      "Loãng xương là vấn đề phổ biến ở phụ nữ sau mãn kinh, có thể dẫn đến gãy xương nghiêm trọng...",
    author: "Bác sĩ Nội tiết Nguyễn Thị Lan",
    date: "2024-02-22",
    category: "Sức khỏe phụ nữ",
    tags: ["loãng xương", "mãn kinh", "phụ nữ", "nội tiết"],
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600",
    readTime: "11 phút đọc",
    categoryColor: "bg-purple-100 text-purple-800",
  },
  {
    id: 23,
    title:
      "Khám phá bí mật của giấc ngủ: Tầm quan trọng của giấc ngủ chất lượng",
    excerpt:
      "Hiểu rõ về chu kỳ giấc ngủ và cách cải thiện chất lượng giấc ngủ cho sức khỏe tốt hơn.",
    content:
      "Giấc ngủ đóng vai trò quan trọng trong việc phục hồi cơ thể và tâm trí...",
    author: "Bác sĩ Nghiên cứu Giấc ngủ Trần Văn Hoàng",
    date: "2024-02-24",
    category: "Giấc ngủ và Nghỉ ngơi",
    tags: ["giấc ngủ", "chất lượng giấc ngủ", "nghỉ ngơi", "sức khỏe"],
    imageUrl:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600",
    readTime: "8 phút đọc",
    categoryColor: "bg-slate-100 text-slate-800",
  },
  {
    id: 24,
    title: "Dinh dưỡng cho người bệnh tiểu đường: Thực đơn và lời khuyên",
    excerpt:
      "Hướng dẫn chế độ dinh dưỡng phù hợp cho người mắc bệnh tiểu đường type 2.",
    content:
      "Bệnh tiểu đường type 2 đang gia tăng nhanh chóng, việc điều chỉnh chế độ ăn uống là then chốt...",
    author: "Chuyên gia Dinh dưỡng Lê Thị Hạnh",
    date: "2024-02-26",
    category: "Bệnh mãn tính",
    tags: ["tiểu đường", "dinh dưỡng", "bệnh mãn tính", "thực đơn"],
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
    readTime: "13 phút đọc",
    categoryColor: "bg-emerald-100 text-emerald-800",
  },
  {
    id: 25,
    title: "Sức khỏe mắt trong thời đại số: Bảo vệ mắt khỏi ánh sáng xanh",
    excerpt:
      "Cách bảo vệ đôi mắt khỏi tác hại của màn hình điện tử và ánh sáng xanh.",
    content:
      "Việc sử dụng thiết bị điện tử nhiều giờ mỗi ngày có thể gây hại nghiêm trọng cho mắt...",
    author: "Bác sĩ Nhãn khoa Phạm Văn Đức",
    date: "2024-02-28",
    category: "Nhãn khoa",
    tags: ["sức khỏe mắt", "ánh sáng xanh", "màn hình", "công nghệ"],
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600",
    readTime: "6 phút đọc",
    categoryColor: "bg-cyan-100 text-cyan-800",
  },
  {
    id: 26,
    title: "Phòng ngừa và điều trị bệnh gout: Lời khuyên từ chuyên gia",
    excerpt:
      "Tìm hiểu về nguyên nhân, triệu chứng và cách phòng ngừa bệnh gout hiệu quả.",
    content:
      "Bệnh gout đang gia tăng do thay đổi lối sống và chế độ ăn uống không hợp lý...",
    author: "Bác sĩ Khớp học Nguyễn Minh Tài",
    date: "2024-03-02",
    category: "Cơ xương khớp",
    tags: ["gout", "khớp", "acid uric", "phòng ngừa"],
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600",
    readTime: "10 phút đọc",
    categoryColor: "bg-orange-100 text-orange-800",
  },
  {
    id: 27,
    title: "Sức khỏe nam giới: Tầm quan trọng của việc khám sức khỏe định kỳ",
    excerpt:
      "Những vấn đề sức khỏe nam giới cần chú ý và tầm quan trọng của việc khám định kỳ.",
    content:
      "Nam giới thường ít quan tâm đến sức khỏe bản thân, dẫn đến phát hiện bệnh muộn...",
    author: "Bác sĩ Nam khoa Trần Quốc Thái",
    date: "2024-03-04",
    category: "Sức khỏe nam giới",
    tags: ["nam giới", "khám định kỳ", "sức khỏe", "phòng ngừa"],
    imageUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600",
    readTime: "9 phút đọc",
    categoryColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 28,
    title: "Vaccine COVID-19: Hiệu quả và tác dụng phụ cần biết",
    excerpt:
      "Thông tin cập nhật về các loại vaccine COVID-19, hiệu quả và tác dụng phụ.",
    content:
      "Vaccine COVID-19 đã được chứng minh hiệu quả trong việc phòng ngừa bệnh nặng...",
    author: "Bác sĩ Truyền nhiễm Lê Thị Hương",
    date: "2024-03-06",
    category: "Truyền nhiễm",
    tags: ["COVID-19", "vaccine", "phòng ngừa", "miễn dịch"],
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600",
    readTime: "11 phút đọc",
    categoryColor: "bg-green-100 text-green-800",
  },
  {
    id: 29,
    title: "Chăm sóc răng miệng: Phòng ngừa sâu răng và bệnh nướu",
    excerpt:
      "Hướng dẫn chăm sóc răng miệng đúng cách để phòng ngừa các bệnh lý nha khoa.",
    content:
      "Sức khỏe răng miệng ảnh hưởng trực tiếp đến sức khỏe tổng thể của cơ thể...",
    author: "Bác sĩ Nha khoa Võ Thị Lan Anh",
    date: "2024-03-08",
    category: "Răng hàm mặt",
    tags: ["răng miệng", "sâu răng", "nướu", "vệ sinh"],
    imageUrl:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600",
    readTime: "7 phút đọc",
    categoryColor: "bg-pink-100 text-pink-800",
  },
  {
    id: 30,
    title: "Ung thư: Tầm quan trọng của việc tầm soát và phát hiện sớm",
    excerpt:
      "Các phương pháp tầm soát ung thư và tầm quan trọng của việc phát hiện sớm.",
    content:
      "Ung thư là căn bệnh nguy hiểm nhưng có thể điều trị hiệu quả nếu phát hiện sớm...",
    author: "Bác sĩ Ung thư học Nguyễn Văn Quang",
    date: "2024-03-10",
    category: "Ung thư học",
    tags: ["ung thư", "tầm soát", "phát hiện sớm", "điều trị"],
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
    readTime: "14 phút đọc",
    categoryColor: "bg-red-100 text-red-800",
  },
  {
    id: 31,
    title: "Dinh dưỡng thể thao: Chế độ ăn cho người tập luyện",
    excerpt:
      "Hướng dẫn chế độ dinh dưỡng phù hợp cho người tham gia hoạt động thể thao.",
    content:
      "Dinh dưỡng thể thao đóng vai trò quan trọng trong việc nâng cao hiệu suất tập luyện...",
    author: "Chuyên gia Dinh dưỡng Thể thao Trần Minh Hùng",
    date: "2024-03-12",
    category: "Thể thao và Sức khỏe",
    tags: ["thể thao", "dinh dưỡng", "tập luyện", "hiệu suất"],
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
    readTime: "12 phút đọc",
    categoryColor: "bg-lime-100 text-lime-800",
  },
];

// Helper function to get blog post by ID
export const getBlogPostById = (id: number): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};

// Helper function to get related posts
export const getRelatedPosts = (
  currentPost: BlogPost,
  limit: number = 3
): BlogPost[] => {
  return blogPosts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
};
