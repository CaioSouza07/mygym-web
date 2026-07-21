import { useLottie } from "lottie-react";
import bicepsAnimation from "../assets/animations/congratulations.json";

function CongratulationsEffect({ size = 120 }) {
  const { View } = useLottie({
    animationData: bicepsAnimation,
    loop: false,
    autoplay: true,
  });

  return <div style={{ width: `${size}px`, height: `${size}px` }}>{View}</div>;
}

export default CongratulationsEffect;
