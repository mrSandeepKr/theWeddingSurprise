import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ImageModalProps {
  imageSrc: string;
  onClose: () => void;
}

export default function ImageModal({ imageSrc, onClose }: ImageModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-7xl max-h-full"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt="Gallery image"
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          loading="eager"
        />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>
      </motion.div>
    </motion.div>
  );
}
