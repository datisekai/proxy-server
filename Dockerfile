# Sử dụng image Node.js chính thức
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json (nếu có) vào container
COPY package*.json ./

# Cài đặt các dependency cho dự án
RUN npm install

# Sao chép toàn bộ mã nguồn của bạn vào thư mục làm việc trong container
COPY . .

# Expose cổng 5099 cho container
EXPOSE 5099

# Lệnh để chạy server
CMD ["node", "server.js"]
