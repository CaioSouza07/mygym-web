import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const variants = {
  error: "bg-[#f8d7da] text-[#842029] border-[#842029]",
  success: "bg-[#d1e7dd] text-[#0f5132] border-[#0f5132]",
  warning: "bg-[#fff3cd] text-[#664d03] border-[#664d03]",
};

function AlertCard({
  show,
  children,
  onClose,
  type = "error",
  duration = 3000,
}) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`absolute top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md flex justify-between gap-2 border-2 p-4 rounded-2xl shadow-lg ${variants[type]}`}
        >
          <p className="flex-1">{children}</p>

          <button onClick={onClose} className="p-1 hover:opacity-70">
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AlertCard;
