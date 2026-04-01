// pages/ProductDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container,
  Skeleton,
  Button,
  IconButton,
  Rating,
  Chip,
} from "@mui/material";
import {
  ArrowBackIosNew,
  AddShoppingCart,
  ShoppingBagOutlined,
  Star,
  LocalOfferOutlined,
} from "@mui/icons-material";
import { type Product } from "../types/product";
import { productService } from "../services/productService";
import { useCart } from "../context/CartContext";

const ProductDetails: React.FC = () => {
  // جلب الـ id من الرابط
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(false);
        // جلب البيانات من الخدمة
        const data = await productService.getProductById(parseInt(id));
        if (data) {
          setProduct(data);
        } else {
          setError(true); // في حال عادت الـ API ببيانات فارغة
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // --- السكيليتون الاحترافي أثناء التحميل ---
  const DetailsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
      {/* سكيليتون الصورة */}
      <Skeleton
        variant="rounded"
        width="100%"
        height={450}
        animation="wave"
        sx={{ borderRadius: "2rem", bgcolor: "var(--bg-paper)" }}
      />
      {/* سكيليتون النصوص */}
      <div className="space-y-6 pt-6 md:pt-10 px-4">
        <Skeleton variant="text" width="40%" height={25} animation="wave" />
        <Skeleton
          variant="text"
          width="90%"
          height={50}
          animation="wave"
          sx={{ borderRadius: "8px" }}
        />
        <Skeleton variant="text" width="30%" height={30} animation="wave" />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={120}
          animation="wave"
          sx={{ borderRadius: "1rem" }}
        />
        <div className="flex gap-4 pt-6">
          <Skeleton
            variant="rounded"
            width="100%"
            height={55}
            animation="wave"
            sx={{ borderRadius: "12px" }}
          />
          <Skeleton
            variant="rounded"
            width={60}
            height={55}
            animation="wave"
            sx={{ borderRadius: "12px" }}
          />
        </div>
      </div>
    </div>
  );

  // --- واجهة الخطأ أو المنتج غير الموجود ---
  if (error || (!loading && !product)) {
    return (
      <Container
        maxWidth="lg"
        className="py-20 text-center animate-fade-in px-4"
      >
        <div className="inline-block bg-surface p-6 rounded-full border border-outline shadow-xl mb-8">
          <ShoppingBagOutlined
            sx={{ fontSize: 70 }}
            className="text-red-400 opacity-80"
          />
        </div>
        <h2 className="text-3xl font-black text-content mb-3 tracking-tighter">
          {t("product.not_found") || "عذراً، المنتج غير موجود"}
        </h2>
        <p className="text-muted mb-10 max-w-md mx-auto leading-relaxed">
          {t("product.not_found_desc") ||
            "يبدو أن المنتج الذي تبحث عنه غير متوفر حالياً أو أن الرابط غير صحيح."}
        </p>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={
            <ArrowBackIosNew sx={{ fontSize: 14 }} className="rtl:rotate-180" />
          }
          className="bg-brand hover:bg-brand/90 px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-brand/20 transition-all active:scale-95"
        >
          {t("cart.back_to_shop") || "العودة للتسوق"}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8 md:py-14 animate-fade-in px-4">
      {/* زر العودة العلوي */}
      <div className="mb-8 md:mb-12 flex items-center justify-between border-b border-outline pb-5">
        <Button
          onClick={() => navigate(-1)}
          startIcon={
            <ArrowBackIosNew sx={{ fontSize: 14 }} className="rtl:rotate-180" />
          }
          className="text-content hover:text-brand font-bold text-base"
        >
          {t("product.back") || "العودة"}
        </Button>
        {/* اللوجو بجانب زر العودة */}
        <img
          src="/logo.png"
          alt="NMT Logo"
          className="w-9 h-9 object-contain opacity-80grayscale hover:grayscale-0 transition-all"
        />
      </div>

      {loading ? (
        <DetailsSkeleton />
      ) : (
        product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* 1. قسم الصورة (مع الخلفية الزجاجية) */}
            <div className="bg-glass backdrop-blur-xl border border-outline p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 group flex items-center justify-center min-h-[400px]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-w-[350px] h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* 2. قسم التفاصيل (NMT Branded) */}
            <div className="space-y-6 pt-2 px-1">
              {/* الفئة - Category */}
              <Chip
                label={product.category}
                variant="outlined"
                icon={
                  <LocalOfferOutlined
                    fontSize="small"
                    className="text-brand/70"
                  />
                }
                className="border-brand/20 text-brand font-bold text-xs uppercase tracking-widest bg-brand/5 px-2 py-4 rounded-xl"
              />

              {/* العنوان - Title */}
              <h1 className="text-3xl md:text-4xl font-black text-content tracking-tighter leading-[1.1]">
                {product.title}
              </h1>

              {/* التقييم - Rating */}
              {/* التقييم - Rating */}
<div 
  className="flex items-center gap-3 bg-surface border border-outline w-fit px-4 py-2 rounded-2xl shadow-inner"
  dir="ltr" // هذا السطر يضمن بقاء الترتيب (نجوم -> رقم -> عدد) من اليسار لليمن دائماً
>
  <Rating
    value={product.rating?.rate || 0}
    precision={0.1}
    readOnly
    emptyIcon={
      <Star
        fontSize="inherit"
        className="opacity-30 text-content"
      />
    }
    className="text-yellow-400"
  />
  <span className="font-bold text-content text-lg">
    {product.rating?.rate.toFixed(1) || "0.0"}
  </span>
  <span className="text-muted text-sm border-l border-outline pl-3">
    ({product.rating?.count || 0}{" "}
    {t("product.reviews") || "Reviews"})
  </span>
</div>
              {/* السعر - Price */}
              <div className="pt-2">
                <span className="text-muted text-lg font-medium">
                  {t("product.price_label") || "السعر"}:{" "}
                </span>
                <span className="text-4xl font-black text-brand drop-shadow-sm tracking-tighter">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* الوصف - Description */}
              <div className="bg-glass border border-outline rounded-2xl p-6 shadow-inner">
                <h3 className="font-black text-content text-lg mb-3 tracking-tight">
                  {t("product.description") || "عن المنتج"}
                </h3>
                <p className="text-muted leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* أزرار التشغيل (Actions) */}
              <div className="flex flex-col sm:flex-row gap-5 pt-8 border-t border-outline mt-10">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddShoppingCart className="ml-1" />}
                  onClick={() => addToCart(product)}
                  className="bg-brand hover:bg-brand/90 flex-grow py-4 rounded-2xl font-black text-lg shadow-xl shadow-brand/20 transition-all active:scale-95"
                >
                  {t("product.add_to_cart") || "إضافة للسلة"}
                </Button>

                <IconButton
                  component={Link}
                  to="/cart"
                  className="w-full sm:w-16 h-16 bg-surface border border-outline rounded-2xl text-content hover:bg-brand/10 transition-all active:scale-95"
                >
                  <ShoppingBagOutlined className="text-content group-hover:text-brand" />
                </IconButton>
              </div>

              {/* رسالة ضمان آمن */}
              <p className="text-[11px] text-center sm:text-right text-muted opacity-60 uppercase font-bold tracking-widest pt-2">
                NMT Genuine Product • Secure Delivery
              </p>
            </div>
          </div>
        )
      )}
    </Container>
  );
};

export default ProductDetails;
