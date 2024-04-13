import express from "express";
import cors from "cors";
import connectDb from "./config/dbConnection.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import bannerRoutes from "./routes/bannerRoutes.js"
import banner2Routes from "./routes/banner2Routes.js"
import cartRoutes from "./routes/cartRoutes.js"
import offercardRoutes from "./routes/offercardRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"
import cardRoutes from "./routes/cardRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import couponRoutes from "./routes/couponRoutes.js"




import dotenv from "dotenv";


const app = express();
connectDb();
dotenv.config();
app.use(express.json({limit:"100mb"}));
app.use(cors())
app.use(express.json());


app.use("/api/admin", adminRoutes);
app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/offercards', offercardRoutes)
app.use('/api/cards', cardRoutes)
app.use('/api/coupons', couponRoutes)

app.use('/api/blogs', blogRoutes)
app.use('/api/banner', bannerRoutes)
app.use('/api/banner2', banner2Routes)

app.use('/api/order', orderRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/wishlist', wishlistRoutes)




app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on PORT ${process.env.PORT || 3000}`);
})