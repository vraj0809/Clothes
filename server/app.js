import dns from "node:dns";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authrouter from "./routes/authroute.js";
import userrouter from "./routes/userroute.js";
import productrouter from "./routes/product-route.js";
import cartrouter from "./routes/cartrouter.js";
import orderroute from "./routes/Order-route.js";

dns.setDefaultResultOrder("ipv4first");

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "https://clothes-12.onrender.com",
  "https://clothes-adminfront.onrender.com",
  "https://clothes-sand.vercel.app",
  "https://clothes-8gzj.vercel.app",
  "https://clothes-admin-nine.vercel.app",
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (/^https:\/\/.*\.vercel\.app$/.test(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authrouter);
app.use("/api/user", userrouter);
app.use("/api/product", productrouter);
app.use("/api/cart", cartrouter);
app.use("/api/order", orderroute);

export default app;
