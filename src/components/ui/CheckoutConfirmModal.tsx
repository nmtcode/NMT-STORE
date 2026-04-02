import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Zoom,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ShoppingBagOutlined } from "@mui/icons-material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CheckoutConfirmModal: React.FC<Props> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Zoom}
      // أضفنا overflow visible لكي تظهر الأيقونة البارزة بوضوح
      PaperProps={{
        className: "rounded-[2.5rem] p-4 border border-outline shadow-2xl",
        sx: {
          backgroundColor: "var(--color-surface)",
          maxWidth: "400px",
          width: "90%",
          margin: "auto",
          overflow: "visible", // مهم جداً للأيقونة الخارجة عن الإطار
          pt: 6, // زيادة الارتفاع الداخلي من الأعلى
        },
      }}
    >
      {/* صندوق الأيقونة البارزة */}
      <Box
        className="absolute left-1/2 -translate-x-1/2 -top-10 flex justify-center"
        sx={{ width: "100%", zIndex: 10 }}
      >
        <div className="bg-brand text-white p-5 rounded-[2rem] shadow-xl shadow-brand/30 border-4 border-surface">
          <ShoppingBagOutlined sx={{ fontSize: 40 }} />
        </div>
      </Box>

      <DialogTitle className="text-center text-2xl font-black text-content pt-4 tracking-tighter">
        {t("cart.confirm_title")}
      </DialogTitle>

      <DialogContent>
        <DialogContentText className="text-center text-muted font-medium text-lg px-2 leading-relaxed">
          {t("cart.confirm_desc")}
        </DialogContentText>
      </DialogContent>

      <DialogActions className="flex-col gap-3 p-6 pt-2">
        <Button
          fullWidth
          onClick={onConfirm}
          variant="contained"
          className="bg-brand hover:bg-brand/90 py-4 rounded-2xl font-black text-lg shadow-lg shadow-brand/20 transition-all active:scale-95"
        >
          {t("cart.confirm_yes")}
        </Button>

        <Button
          fullWidth
          onClick={onClose}
          className="text-muted font-bold py-3 hover:bg-muted/10 rounded-2xl transition-colors"
        >
          {t("cart.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutConfirmModal;
