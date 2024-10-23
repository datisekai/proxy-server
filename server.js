const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Tạo middleware proxy để chuyển tiếp các yêu cầu đến API gốc
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://thongtindaotao.sgu.edu.vn", // API gốc
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api", // Điều chỉnh đường dẫn nếu cần thiết
    },
    onProxyReq: (proxyReq, req, res) => {
      // Thêm các header cần thiết (nếu có)
      proxyReq.setHeader("Authorization", req.headers.authorization || "");
      proxyReq.setHeader("Accept", "application/json, text/plain, */*");
    },
  })
);

// Bắt đầu server trên cổng 5099
app.listen(5099, () => {
  console.log("Proxy server is running on http://localhost:5099");
});
