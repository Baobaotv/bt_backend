# Sử dụng image cơ sở có Node.js (có thể thay đổi phiên bản theo yêu cầu)
FROM node:16

# Thiết lập thư mục làm việc trong container
WORKDIR /app
COPY package.json .
COPY . .

# Cài đặt các phụ thuộc
RUN npm install

# Khai báo cổng mà ứng dụng sẽ lắng nghe (tùy chỉnh theo ứng dụng của bạn)
EXPOSE 8080

# Lệnh để chạy ứng dụng khi container được khởi chạy
CMD ["npm", "start"]