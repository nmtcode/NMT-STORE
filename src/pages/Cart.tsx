import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import {
  Add,
  Remove,
  DeleteOutline,
  // ShoppingBagOutlined,
  ArrowBackIosNew,
  // Message,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { notify } from "../utils/notify";
import CheckoutConfirmModal from "../components/ui/CheckoutConfirmModal";

const Cart: React.FC = () => {
  const { clearCart,cart, removeFromCart, updateQuantity, totalPrice, totalItems } =
    useCart();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCheckoutProcess = () => {
    setIsModalOpen(false); // إغلاق النافذة

    // 1. تنظيف السلة
    clearCart();

    // 2. إظهار الـ Toast
    notify(
      t("cart.checkout_success") ||
        "تم إتمام عملية الشراء بنجاح وطلبك قيد التنفيذ!",
      "success",
    );
  };
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 animate-fade-in px-4">
        {/* شعار المتجر كبير في حالة السلة الفارغة */}
        <div className="bg-surface p-6 rounded-[2.5rem] border border-outline shadow-xl mb-4 group hover:scale-105 transition-transform">
          <img
            src="/logo.png"
            alt="NMT Logo"
            className="w-24 h-24 object-contain opacity-90"
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-black text-content mb-3 tracking-tighter">
            {t("cart.empty_title") || "السلة فارغة حالياً"}
          </h2>
          <p className="text-muted mb-10 max-w-md mx-auto leading-relaxed">
            {t("cart.empty_desc") ||
              "يبدو أنك لم تضف أي منتجات بعد. ابدأ باستكشاف منتجاتنا المميزة وأضفها هنا."}
          </p>
          <Button
            component={Link}
            to="/"
            variant="contained"
            startIcon={
              <ArrowBackIosNew
                sx={{ fontSize: 14 }}
                className="rtl:rotate-180"
              />
            }
            className="bg-brand hover:bg-brand/90 px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-brand/20 transition-all active:scale-95"
          >
            {t("cart.back_to_shop") || "العودة للتسوق"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* عنوان الصفحة مع الشعار مصغر بجانبه */}
      <div className="mb-10 flex items-center gap-4 border-b border-outline pb-6">
        <div className="flex-shrink-0 bg-surface border border-outline p-2 rounded-2xl shadow-sm w-fit">
          <img
            src="/logo.png"
            alt="NMT Logo"
            className="w-10 h-10 object-contain"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-content tracking-tighter flex items-center gap-3">
          {t("cart.title") || "سلة المشتريات"}
          <span className="text-sm font-medium bg-brand/10 text-brand px-3 py-1 rounded-full">
            {totalItems} {t("cart.items_count") || "منتجات"}
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* قائمة المنتجات */}
        <div className="lg:col-span-2 space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-surface border border-outline rounded-[2rem] p-5 flex flex-col sm:flex-row items-center gap-5 hover:shadow-lg transition-all group relative overflow-hidden"
            >
              <div className="w-28 h-28 bg-white rounded-2xl p-3 flex-shrink-0 overflow-hidden border border-outline/50 shadow-inner">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="flex-grow min-w-0 text-center sm:text-right space-y-1">
                <h3 className="font-bold text-content text-lg truncate mb-1 group-hover:text-brand transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted text-sm truncate">{item.category}</p>
                <p className="text-brand font-black text-xl pt-1">
                  ${item.price}
                </p>
              </div>

              {/* التحكم بالكمية */}
              <div className="flex items-center gap-2 bg-muted/5 p-1.5 rounded-2xl border border-outline/30 shadow-inner">
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-content hover:bg-brand/10 disabled:opacity-40"
                  disabled={item.quantity <= 1}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <span className="font-bold text-content text-lg px-2 min-w-[35px] text-center">
                  {item.quantity}
                </span>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-content hover:bg-brand/10"
                >
                  <Add fontSize="small" />
                </IconButton>
              </div>

              <IconButton
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors sm:absolute sm:top-4 sm:right-4 sm:p-1.5"
              >
                <DeleteOutline fontSize="small" />
              </IconButton>
            </div>
          ))}
        </div>

        {/* ملخص الحساب - مع شعار تأكيد الدفع */}
        <div className="lg:col-span-1">
          <div className="bg-glass backdrop-blur-xl border border-outline rounded-[2.5rem] p-8 sticky top-28 shadow-xl shadow-black/5">
            {/* شعار مصغر داخل بطاقة الملخص */}
            <div className="flex justify-center mb-6 opacity-60 grayscale group-hover:grayscale-0 transition-all">
              <img
                src="/logo.png"
                alt="NMT Logo"
                className="w-12 h-12 object-contain"
              />
            </div>

            <h2 className="text-2xl font-black text-content mb-7 tracking-tighter text-center">
              {t("cart.summary") || "ملخص الطلب"}
            </h2>

            <div className="space-y-4 mb-9">
              <div className="flex justify-between text-muted font-medium text-lg">
                <span>{t("cart.subtotal") || "المجموع الفرعي"}</span>
                <span className="font-bold text-content">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-muted font-medium text-lg">
                <span>{t("cart.shipping") || "التوصيل"}</span>
                <span className="text-green-500 font-bold">
                  {t("cart.free") || "مجاني"}
                </span>
              </div>

              <div className="h-[1px] w-full bg-outline/60 my-3" />

              <div className="flex justify-between items-end pt-1">
                <span className="font-bold text-content text-xl tracking-tight">
                  {t("cart.total") || "الإجمالي النهائي"}
                </span>
                <div className="text-right">
                  <p className="text-4xl font-black text-brand drop-shadow-sm tracking-tighter">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <Button
              fullWidth
              variant="contained"
              size="large"
              className="bg-brand hover:bg-brand/90 py-4 rounded-2xl font-black text-xl shadow-xl shadow-brand/20 transition-all active:scale-95"
              onClick={() => setIsModalOpen(true)}
            >
              {t("cart.checkout") || "إتمام عملية الشراء"}
            </Button>

            <div className="mt-7 flex flex-col items-center justify-center gap-2 text-muted opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-[11px] uppercase font-bold tracking-widest">
                {t("cart.secure_msg") || "Secure Checkout • NMTSTORE"}
              </span>
              <div className="h-1 w-16 bg-outline rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <CheckoutConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCheckoutProcess}
      />
    </div>
  );
};

export default Cart;
