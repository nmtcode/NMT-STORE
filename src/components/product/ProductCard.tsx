import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import { type Product } from "../../types/product";
import { AddShoppingCart, Star } from "@mui/icons-material";

const ProductCard = ({ product }: { product: Product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-surface border border-outline rounded-3xl p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-brand/10 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      {/* تعديل: تم تغيير bg-white إلى bg-main/50 
         لضمان أن خلفية الصورة لا تكون فاقعة جداً في الـ Dark Mode 
      */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-main/50 mb-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
          loading="lazy" // تحسين الأداء
        />

        {/* شارة الفئة - تدعم الاتجاهين تلقائياً بفضل Tailwind */}
        <span className="absolute top-3 inset-inline-start-3 bg-glass backdrop-blur-md border border-outline text-brand text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {product.category}
        </span>
      </div>

      <div className="flex flex-col flex-grow space-y-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-content font-bold text-sm md:text-base leading-tight group-hover:text-brand transition-colors line-clamp-2">
            {product.title}
          </h3>

          {/* التقييم */}
          <div className="flex items-center gap-1 text-yellow-500 shrink-0">
            <Star className="text-[14px]" />
            <span className="text-xs font-bold">{product.rating.rate}</span>
          </div>
        </div>

        <p className="text-muted text-xs line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-muted text-[10px] uppercase font-bold tracking-tighter">
              {t("products.price_label")}
            </span>
            <span className="text-content font-black text-xl">
              {/* توحيد تنسيق السعر */}
              {Number(product.price).toFixed(2)}
              <span className="text-brand text-sm ms-1">$</span>
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
            className="bg-brand text-white p-3 rounded-2xl shadow-lg shadow-brand/20 active:scale-95 hover:scale-105 transition-all hover:brightness-110 flex items-center justify-center"
          >
            <AddShoppingCart fontSize="small" />
          </button>
        </div>
      </div>

      {/* تأثير الـ Glow البرتقالي الخرافي */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand to-orange-500 rounded-3xl blur opacity-0 group-hover:opacity-15 transition duration-500 -z-10"></div>
    </div>
  );
};

export default ProductCard;
