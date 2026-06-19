import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
function Modal({ handleClose, children }) {
  return (
    <MuiModal open={true} onClose={handleClose}>
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-700 shadow-2xl p-4 rounded-2xl outline-none w-68 sm:w-80 md:max-w-100 lg:w-150">
        {children}
      </Box>
    </MuiModal>
  );
}

export default Modal;
