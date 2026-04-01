// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/layout/Navbar";
import { CartProvider } from "./context/CartContext";
import { MyThemeProvider } from "./context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "./i18n";

// ✅ الاستيراد الصحيح للصفحة (تأكد من المسار حسب مشروعك)
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import { Toaster } from "react-hot-toast";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import NotFound from "./pages/NotFound";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language;
    document.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [i18n.language]);

  return (
    <MyThemeProvider>
      {/* CssBaseline سيقوم بضبط خلفية الـ body تلقائياً بناءً على وضع الثيم (Light/Dark) */}
      <CssBaseline /> 
      <CartProvider>
        <Toaster/>
        <Router>
          <Navbar />
          {/* أزلنا bg-white و dark:bg-[#0a0a0a] لنترك الشفافية تعمل مع خلفية الـ Body الأصلية */}
          <main className="min-h-screen transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer/>
          <ScrollToTop />
        </Router>
      </CartProvider>
    </MyThemeProvider>
  );
}

export default App;
