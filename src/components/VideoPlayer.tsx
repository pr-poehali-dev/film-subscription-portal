import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { Movie } from "@/data/movies";

interface VideoPlayerProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
  isPremium?: boolean;
}

export default function VideoPlayer({ movie, isOpen, onClose, isPremium = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === " ") { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(cur);
    setProgress((cur / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    videoRef.current.volume = volume;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * (videoRef.current.duration || 0);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    videoRef.current.muted = next;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95" onClick={onClose}>
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl mx-4 bg-cinema-black rounded overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <div
          className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)" }}
        >
          <div>
            <h2 className="font-cinematic text-xl text-white font-semibold">{movie.title}</h2>
            <p className="text-white/50 text-xs font-body">{movie.year} · {movie.duration} · {movie.director}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Icon name="X" size={18} className="text-white" />
          </button>
        </div>

        <div className="relative aspect-video bg-black">
          {isPremium ? (
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlay}
              poster={movie.poster}
              src={movie.videoUrl}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-cinema-dark">
              <img src={movie.poster} alt={movie.title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
              <div className="relative z-10 text-center px-6">
                <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-5 shadow-[0_0_40px_rgba(201,168,76,0.4)]">
                  <Icon name="Crown" size={32} className="text-cinema-black" />
                </div>
                <h3 className="font-cinematic text-3xl text-white font-semibold mb-2">Премиум доступ</h3>
                <p className="text-white/60 font-body text-sm mb-6 max-w-xs mx-auto">
                  Оформите подписку за 1 ₽ в месяц, чтобы смотреть этот и тысячи других фильмов
                </p>
                <a
                  href="/subscription"
                  className="inline-flex items-center gap-2 px-7 py-3 gold-gradient text-cinema-black font-body font-semibold rounded hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all"
                >
                  <Icon name="Play" size={16} />
                  Оформить подписку за 1 ₽
                </a>
              </div>
            </div>
          )}

          {isPremium && (
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${!isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              onClick={togglePlay}
            >
              <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-gold/20 transition-colors cursor-pointer">
                <Icon name="Play" size={32} className="text-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {isPremium && (
          <div
            className={`absolute bottom-0 left-0 right-0 z-20 px-5 pb-4 pt-8 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }}
          >
            <div
              className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div
                className="h-full gold-gradient rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="text-white hover:text-gold transition-colors">
                  <Icon name={isPlaying ? "Pause" : "Play"} size={22} />
                </button>
                <button onClick={toggleMute} className="text-white/70 hover:text-gold transition-colors">
                  <Icon name={isMuted ? "VolumeX" : "Volume2"} size={18} />
                </button>
                <input
                  type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-gold cursor-pointer"
                />
                <span className="text-white/50 text-xs font-body">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <button onClick={toggleFullscreen} className="text-white/70 hover:text-gold transition-colors">
                <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
