import memoryWallBg from "@/assets/memory_wall_background.jpeg";

interface BackgroundWithBlurProps {
  backgroundImageUrl: string;
  height?: string;
}

export default function BackgroundWithBlur({ 
  backgroundImageUrl, 
  height = "h-96" 
}: BackgroundWithBlurProps) {
  return (
    <div className={`absolute ${height} inset-0 w-full`}>
      <div
        className={`w-full ${height} bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      />
      {/* Gradient overlay for blur effect at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      {/* Additional blur overlay at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}