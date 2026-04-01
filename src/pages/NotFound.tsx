import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HomeRounded, ExtensionOffRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Box className="min-h-[80vh] flex flex-col items-center justify-center text-center gap-8">
        {/* أنيميشن الأيقونة الضائعة */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Box className="w-32 h-32 md:w-48 md:h-48 rounded-[3rem] bg-orange-500/10 flex items-center justify-center border border-orange-500/20 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
            <ExtensionOffRounded
              sx={{ fontSize: { xs: 80, md: 120 } }}
              className="text-orange-500 opacity-80"
            />
          </Box>
        </motion.div>

        {/* رقم الخطأ بتصميم زجاجي */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Typography
            variant="h1"
            className="font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-800"
            sx={{ fontSize: { xs: "8rem", md: "12rem" }, lineHeight: 1 }}
          >
            404
          </Typography>
          <Typography
            variant="h4"
            className="font-bold text-content mt-4 uppercase tracking-widest"
          >
            {t("errors.page_not_found") || "Page Not Found"}
          </Typography>
        </motion.div>

        {/* رسالة توضيحية */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4 }}
          className="text-muted max-w-sm text-lg font-medium"
        >
          {t("errors.404_msg") ||
            "Looks like you've wandered into a warehouse section that doesn't exist yet!"}
        </motion.p>

        {/* أزرار العودة */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeRounded />}
            onClick={() => navigate("/")}
            className="bg-orange-500 hover:bg-orange-600 py-3 px-8 rounded-2xl shadow-xl shadow-orange-500/20 lowercase first-letter:uppercase"
          >
            {t("buttons.back_home") || "Back to Home"}
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default NotFound;
