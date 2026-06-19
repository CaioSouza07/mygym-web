import { CircleQuestionMark } from "lucide-react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

function ModalConfirmation({
  handleYes,
  handleNo,
  handleClose,
  title,
  description,
  yesText = "OK",
}) {
  return (
    <Modal handleClose={handleClose}>
      <div className="flex flex-col gap-2 items-center">
        <CircleQuestionMark className="text-[#FFCC00] w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12" />
        <h1 className="text-white text-lg font-bold">{title}</h1>
        <span className="text-white/50 font-sm text-center">{description}</span>
        <div className="border-t border-zinc-800 pt-4 mt-2 flex w-full">
          <div className="flex gap-3 w-full">
            <Button variant="secondary" onClick={handleNo}>
              Cancelar
            </Button>
            <Button onClick={handleYes}>{yesText}</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalConfirmation;
