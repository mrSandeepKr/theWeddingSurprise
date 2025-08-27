import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ImageModalProps {
  imageSrc: string;
  onClose: () => void;
}

export default function ImageModal({ imageSrc, onClose }: ImageModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl max-h-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-rose-300 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-8 w-8" />
        </button>
        <img
          src={imageSrc}
          alt="Gallery image"
          className="w-full h-full object-contain rounded-lg"
          loading="eager"
        />
      </motion.div>
    </motion.div>
  );
}