import { useEffect, useState } from "react";
import { type Product } from "../types/product";
import { Container, Skeleton, Pagination, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/product/ProductCard";
import { productService } from "../services/productService";
import {notify} from "../utils/notify";

const Home = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // --- إعدادات الـ Pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // عدد المنتجات في كل صفحة

  const handleProductAdded = (product: Product) => {
    console.log(`وصل التبليغ للـ Home! المنتج هو: ${product.title}`);

    notify(
      `${t("products.added")}: ${product.title}`, 
      "success"
    );
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // حساب البيانات المعروضة بناءً على الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
    // العودة لأعلى الصفحة بسلاسة عند تغيير الصفحة
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ProductSkeleton = () => (
    <div className="bg-surface border border-outline rounded-[2rem] p-4 space-y-4 shadow-sm">
      <Skeleton
        variant="rounded"
        width="100%"
        height={220}
        animation="wave"
        sx={{ borderRadius: "1.5rem" }}
      />
      <div className="px-2 space-y-3">
        <Skeleton
          variant="text"
          width="85%"
          height={30}
          animation="wave"
          sx={{ borderRadius: "6px" }}
        />
        <Skeleton
          variant="text"
          width="60%"
          height={20}
          animation="wave"
          sx={{ borderRadius: "4px" }}
        />
        <div className="flex justify-between items-center pt-4">
          <div className="space-y-1">
            <Skeleton variant="text" width={40} height={15} animation="wave" />
            <Skeleton
              variant="rounded"
              width={70}
              height={35}
              animation="wave"
              sx={{ borderRadius: "8px" }}
            />
          </div>
          <Skeleton
            variant="rounded"
            width={48}
            height={48}
            animation="wave"
            sx={{ borderRadius: "1rem" }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Container maxWidth="lg" className="py-10">
      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        {/* حاوية اللوجو - مصغرة واحترافية */}
        <div className="flex-shrink-0 bg-surface border border-outline p-2.5 rounded-[1.5rem] shadow-sm w-fit group-hover:scale-105 transition-transform">
          <img
            src="/logo.png"
            alt="NMT Logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-black text-content tracking-tighter flex items-center gap-2">
            {t("home.latest")}
            <span className="text-brand drop-shadow-[0_0_15px_rgba(248,98,56,0.3)]">
              {t("home.products")}
            </span>
          </h1>
          <p className="text-muted font-medium text-lg max-w-2xl">
            {t("home.subtitle")}
          </p>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from(new Array(itemsPerPage)).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleProductAdded}
              />
            ))}
      </div>

      {/* Pagination Section */}
      {!loading && totalPages > 1 && (
        <Stack spacing={2} className="mt-16 items-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "var(--text-main)",
                borderColor: "var(--border-color)",
                borderRadius: "12px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "var(--p-orange)",
                  color: "white",
                },
                "&.Mui-selected": {
                  backgroundColor: "var(--p-orange)",
                  color: "white",
                  borderColor: "var(--p-orange)",
                  "&:hover": {
                    backgroundColor: "var(--p-orange)",
                    opacity: 0.9,
                  },
                },
              },
            }}
          />
        </Stack>
      )}
    </Container>
  );
};

export default Home;
