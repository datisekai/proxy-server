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
      proxyReq.setHeader("Accept-Encoding", "gzip, deflate, br, zstd");
      proxyReq.setHeader("Accept-Language", "en,en-US;q=0.9,vi;q=0.8");
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Origin", "https://thongtindaotao.sgu.edu.vn");
      proxyReq.setHeader("Referer", "https://thongtindaotao.sgu.edu.vn/");
      proxyReq.setHeader(
        "User-Agent",
        req.headers["user-agent"] || "Mozilla/5.0"
      );
      proxyReq.setHeader(
        "sec-ch-ua",
        '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"'
      );
      proxyReq.setHeader("sec-ch-ua-mobile", "?0");
      proxyReq.setHeader("sec-ch-ua-platform", '"macOS"');
      proxyReq.setHeader("Sec-Fetch-Dest", "empty");
      proxyReq.setHeader("Sec-Fetch-Mode", "cors");
      proxyReq.setHeader("Sec-Fetch-Site", "same-origin");
      proxyReq.setHeader(
        "ua",
        req.headers.ua || "Knx+WT3Ye1Pw7xR1fVk+2HNdkJ5iax1FRqUBIZSdbwseLVg="
      );
    },
  })
);

// Bắt đầu server trên cổng 5099
app.listen(5099, () => {
  console.log("Proxy server is running on http://localhost:5099");
});
