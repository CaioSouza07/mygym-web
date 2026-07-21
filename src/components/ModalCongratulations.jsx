import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import MuiModal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "./ui/Button";
import CongratulationsEffect from "./CongratulationsEffect";

function ModalCongratulations({
  open,
  onClose,
  onGoHome,
  completedSeries,
  totalSeries,
}) {
  const percentage =
    totalSeries > 0 ? Math.round((completedSeries / totalSeries) * 100) : 0;

  return (
    <AnimatePresence>
      {open && (
        <MuiModal open={open} onClose={onClose}>
          <Box className="absolute inset-0 flex items-center justify-center p-4 outline-none">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative bg-zinc-900 border border-zinc-700 shadow-2xl rounded-2xl p-6 w-80 sm:w-96 flex flex-col items-center gap-4 overflow-hidden"
            >
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#FFCC00]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#FFCC00]/5 rounded-full blur-3xl" />

              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                className="relative"
              >
                <motion.div
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="bg-[#FFCC00]/20 rounded-full p-4">
                    {/* <Trophy size={56} className="text-[#FFCC00]" /> */}
                    <CongratulationsEffect size={120} />
                  </div>
                </motion.div>

                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{
                      delay: 0.4 + i * 0.1,
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="absolute w-2 h-2 bg-[#FFCC00] rounded-full"
                    style={{
                      top: `${20 + Math.sin(i * 60 * (Math.PI / 180)) * 40}%`,
                      left: `${50 + Math.cos(i * 60 * (Math.PI / 180)) * 50}%`,
                    }}
                  />
                ))}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-1 z-10"
              >
                <h1 className="text-2xl font-bold text-white">Parabéns!</h1>
                <p className="text-white/60 text-center text-sm">
                  Treino finalizado com sucesso!
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-4 bg-zinc-800/80 rounded-xl px-5 py-3 z-10"
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-[#FFCC00]">
                    {completedSeries}
                  </span>
                  <span className="text-[11px] text-zinc-400 uppercase">
                    Séries
                  </span>
                </div>
                <div className="w-px h-8 bg-zinc-700" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-[#FFCC00]">
                    {percentage}%
                  </span>
                  <span className="text-[11px] text-zinc-400 uppercase">
                    Completo
                  </span>
                </div>
                <div className="w-px h-8 bg-zinc-700" />
                <div className="flex items-center gap-1">
                  <Flame size={20} className="text-orange-400" />
                  <span className="text-sm font-semibold text-white">
                    On fire!
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/50 text-xs text-center z-10"
              >
                Cada treino te deixa mais forte. Continue assim!
              </motion.p>

              {/* Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="w-full z-10"
              >
                <Button onClick={onGoHome} className="gap-2">
                  Ir para Início
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            </motion.div>
          </Box>
        </MuiModal>
      )}
    </AnimatePresence>
  );
}

export default ModalCongratulations;
