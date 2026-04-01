import { Fab, Zoom, useScrollTrigger, useTheme } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollToTop = () => {
  const theme = useTheme(); // الوصول لخصائص الثيم الحالي

  const trigger = useScrollTrigger({
    threshold: 400,
    disableHysteresis: true,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleClick}
        size="medium"
        aria-label="scroll back to top"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
          // استخدام ألوان الثيم ديناميكياً
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          // إضافة تأثير زجاجي خفيف يتماشى مع الفوتر
          backdropFilter: "blur(8px)",
          boxShadow: `0px 8px 20px ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.1)"}`,

          "&:hover": {
            // تغيير اللون عند الحوم بناءً على درجة أغمق/أفتح من الثيم
            backgroundColor: theme.palette.primary.dark,
            transform: "scale(1.1) translateY(-5px)",
          },
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        <KeyboardArrowUp fontSize="large" />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
