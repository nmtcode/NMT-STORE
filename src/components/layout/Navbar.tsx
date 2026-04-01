import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  ShoppingCart,
  // Storefront,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";
import { useColorMode } from "../../context/ThemeContext";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const { totalItems } = useCart();
  const { t, i18n } = useTranslation();
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangClose = (lang?: string) => {
    if (lang) {
      i18n.changeLanguage(lang);
      document.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
    setAnchorEl(null);
  };

  const isDark = theme.palette.mode === "dark";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="bg-glass backdrop-blur-xl border-b border-outline shadow-none transition-all duration-500"
      sx={{ backgroundImage: "none" }}
    >
      <Container maxWidth="lg">
        <Toolbar className="justify-between px-0">
          {/* 1. الشعار - Logo Section */}
          {/* 1. الشعار - Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 group no-underline transition-transform active:scale-95"
          >
            {/* حاوية الصورة (الشعار) */}
            <div className="bg-transparent p-1 group-hover:rotate-12 transition-transform flex-shrink-0">
              <img
                src="/logo.png"
                alt="Store Logo"
                width={45}
                height={45}
                className="object-contain"
              />
            </div>

            {/* حاوية النص - مفصولة عن حاوية الصورة لسهولة التحكم بالمسافة */}
            <Typography
              variant="h6"
              className="font-black tracking-tighter text-content sm:block hidden leading-none"
            >
              {t("navbar.store_name") || "NMT"}
              <span className="text-brand ml-1">STORE</span>
            </Typography>
          </Link>

          {/* 2. الأزرار الجانبية - Actions Section */}
          <div className="flex items-center sm:gap-3 gap-1">
            {/* زر تبديل الثيم */}
            <Tooltip title={isDark ? "Light Mode" : "Dark Mode"}>
              <IconButton
                onClick={toggleColorMode}
                className="text-content hover:bg-content/10 transition-all"
              >
                {isDark ? (
                  <LightMode className="text-yellow-400 animate-pulse" />
                ) : (
                  <DarkMode className="text-brand" />
                )}
              </IconButton>
            </Tooltip>

            {/* زر اللغة */}
            <IconButton
              onClick={handleLangClick}
              className="w-10 h-10 rounded-xl border border-outline text-content hover:bg-content/5 active:scale-95 transition-all"
            >
              <Typography className="font-black text-[10px] uppercase tracking-tighter">
                {i18n.language === "ar" ? "ع" : "EN"}
              </Typography>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleLangClose()}
              disableScrollLock={true}
              PaperProps={{
                className:
                  "bg-surface border border-outline text-content shadow-2xl rounded-2xl mt-2 min-w-[140px]",
                sx: { backgroundImage: "none" },
              }}
            >
              <MenuItem
                onClick={() => handleLangClose("ar")}
                className={`gap-3 py-2.5 px-4 font-bold ${i18n.language === "ar" ? "text-brand bg-brand/10" : ""}`}
              >
                <span className="text-lg">🇸🇦</span> العربية
              </MenuItem>
              <MenuItem
                onClick={() => handleLangClose("en")}
                className={`gap-3 py-2.5 px-4 font-bold ${i18n.language === "en" ? "text-brand bg-brand/10" : ""}`}
              >
                <span className="text-lg">🇺🇸</span> English
              </MenuItem>
            </Menu>

            {/* 3. أيقونة السلة (المكان الصحيح) */}
            <Tooltip title={t("navbar.cart") || "Cart"}>
              <IconButton
                component={Link}
                to="/cart"
                className="text-content hover:bg-brand/10 transition-all p-2"
              >
                <Badge
                  badgeContent={totalItems}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontWeight: "bold",
                      fontSize: "0.7rem",
                      backgroundColor: "var(--p-orange)", // تأكد أن هذا المتغير هو البرتقالي
                      color: "white",
                    },
                  }}
                >
                  <ShoppingCart
                    className={
                      totalItems > 0
                        ? "text-brand animate-bounce-short"
                        : "text-content"
                    }
                  />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
