import {
  Container,
  Typography,
  IconButton,
  Box,
  Divider,
  Stack,
} from "@mui/material";
// استيراد Grid المحدث لـ MUI v7
import Grid from "@mui/material/Grid";
import {
  Facebook,
  Instagram,
  Twitter,
  GitHub,
  Email,
  LocationOn,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const socialLinks = [
    { icon: <Facebook fontSize="small" />, url: "#" },
    { icon: <Instagram fontSize="small" />, url: "#" },
    { icon: <Twitter fontSize="small" />, url: "#" },
    { icon: <GitHub fontSize="small" />, url: "https://github.com/nmtcode" },
  ];

  return (
    <Box
      component="footer"
      dir={isRtl ? "rtl" : "ltr"}
      // تحسين المساحة العلوية والخلفية الزجاجية
      className="relative mt-32 border-t border-white/10 bg-glass backdrop-blur-2xl transition-all duration-500"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.02)", // تعزيز تأثير الزجاج
      }}
    >
      <Container maxWidth="lg" className="py-20">
        <Grid container spacing={{ xs: 8, md: 12 }}>
          {/* 1. قسم الهوية - Brand Identity */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* أضفنا items-center للجوال و items-start للكمبيوتر */}
            <Box className="flex flex-col items-center md:items-start gap-6 text-center md:text-start">
              <Box className="flex items-center gap-4">
                <img src="/logo.png" alt="Logo" width={48} />
                <Typography
                  variant="h5"
                  className="font-black tracking-tighter text-content uppercase"
                >
                  {t("footer.brand_name")}
                  <span className="text-orange-500 ml-1.5">STORE</span>
                </Typography>
              </Box>
              <Typography
                variant="body1"
                className="text-muted opacity-70 max-w-[320px]"
              >
                {t("footer.description")}
              </Typography>
              {/* تمركز الأيقونات الاجتماعية */}
              <Stack
                direction="row"
                spacing={2}
                className="justify-center md:justify-start"
              >
                {socialLinks.map((social, index) => (
                  <IconButton key={index} href={social.url} className="...">
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* 2. الروابط السريعة - Navigation */}
          {/* قسم الروابط السريعة المطور */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="subtitle2"
              className="font-black text-content mb-5 uppercase tracking-widest text-[11px] opacity-60"
            >
              {t("footer.sections.links")}
            </Typography>
            <Box component="ul" className="list-none p-0 space-y-4">
              {[
                { key: "home", path: "/" },
                { key: "cart", path: "/cart" },
              ].map((item) => (
                <li key={item.key}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-sm transition-all duration-300 no-underline font-medium relative py-1
            ${
              isActive
                ? "text-orange-500 after:w-full" // الستايل عند تفعيل الرابط
                : "text-muted hover:text-orange-500 after:w-0 hover:after:w-1/2" // الستايل العادي
            } 
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] 
            after:bg-orange-500 after:transition-all after:duration-300`
                    }
                  >
                    {t(`footer.links.${item.key}`)}
                  </NavLink>
                </li>
              ))}
            </Box>
          </Grid>

          {/* 3. التواصل - Support */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              variant="subtitle1"
              className="font-black text-content mb-8 uppercase tracking-widest text-[12px] opacity-50"
            >
              {t("footer.sections.contact")}
            </Typography>
            <Stack spacing={3}>
              <Box className="flex items-center gap-4 group cursor-pointer">
                <Box className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                  <Email className="text-orange-500 text-[18px] group-hover:text-white" />
                </Box>
                <Typography
                  variant="body2"
                  className="text-muted font-medium truncate"
                >
                  {t("footer.contact.email")}
                </Typography>
              </Box>

              <Box className="flex items-center gap-4 group cursor-pointer">
                <Box className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                  <LocationOn className="text-orange-500 text-[18px] group-hover:text-white" />
                </Box>
                <Typography variant="body2" className="text-muted font-medium">
                  {t("footer.contact.address")}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* 4. قسم الدفع والأمان - Trust Section */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box className="p-7 rounded-[2rem] border border-white/5 bg-white/[0.03] backdrop-blur-md flex flex-col items-center md:items-start">
              <Typography
                variant="caption"
                className="text-content font-bold block mb-6 italic opacity-60 text-center md:text-start"
              >
                {t("footer.payment_secure")}
              </Typography>
              <Stack
                direction="row"
                spacing={3}
                className="justify-center md:justify-start"
              >
                {/* ... أيقونات الدفع ... */}

                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="mastercard"
                  width={35}
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="paypal"
                  width={50}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Divider className="mt-20 mb-2 border-white/5" />

        {/* الجزء السفلي المعدل بمساحة أكبر */}
        <Box
          className="flex flex-col md:flex-row justify-between items-center gap-6 py-10" // أضفنا py-10 هنا
          sx={{
            marginTop: "20px", // إضافة مساحة إضافية فوق النصوص
            opacity: 0.8,
          }}
        >
          <Typography
            variant="caption"
            className="text-muted font-medium tracking-wide"
          >
            © {new Date().getFullYear()} {t("footer.brand_name")}.{" "}
            {t("footer.developed_by")}
            <span className="text-orange-500 font-black ml-1.5 hover:text-orange-400 transition-colors cursor-pointer">
              NMTCODE
            </span>
          </Typography>

          <Stack direction="row" spacing={5}>
            {["privacy", "terms"].map((item) => (
              <Typography
                key={item}
                variant="caption"
                className="text-muted hover:text-orange-500 cursor-pointer transition-colors duration-300 font-semibold"
              >
                {t(`footer.links.${item}`)}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
