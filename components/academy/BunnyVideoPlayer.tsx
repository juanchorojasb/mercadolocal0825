"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward,
  Settings,
  Download,
  Clock,
  Eye,
  BarChart3
} from 'lucide-react';

interface BunnyVideoPlayerProps {
  libraryId: string;
  videoId: string;
  title?: string;
  onProgress?: (currentTime: number, duration: number, percentageWatched: number) => void;
  onComplete?: () => void;
  onStart?: () => void;
  autoplay?: boolean;
  startTime?: number;
  className?: string;
  showControls?: boolean;
  showAnalytics?: boolean;
  enableDownload?: boolean;
  quality?: 'auto' | '1080p' | '720p' | '480p' | '360p';
  speed?: number;
}

interface VideoStats {
  totalWatchTime: number;
  percentageWatched: number;
  completionRate: number;
  averageEngagement: number;
  pauseCount: number;
  seekCount: number;
  qualityChanges: number;
}

export default function EnhancedBunnyVideoPlayer({
  libraryId,
  videoId,
  title,
  onProgress,
  onComplete,
  onStart,
  autoplay = false,
  startTime = 0,
  className = "",
  showControls = true,
  showAnalytics = false,
  enableDownload = false,
  quality = 'auto',
  speed = 1
}: BunnyVideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [currentTime, setCurrentTime] = useState(startTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(autoplay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(speed);
  const [selectedQuality, setSelectedQuality] = useState(quality);
  const [showSettings, setShowSettings] = useState(false);
  const [videoStats, setVideoStats] = useState<VideoStats>({
    totalWatchTime: 0,
    percentageWatched: 0,
    completionRate: 0,
    averageEngagement: 0,
    pauseCount: 0,
    seekCount: 0,
    qualityChanges: 0
  });

  const embedUrl = `https://iframe.mediadelivery.net/play/${libraryId}/${videoId}`;
  const playerParams = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    muted: autoplay ? '1' : '0',
    preload: 'metadata',
    responsive: 'true',
    t: startTime.toString(),
    quality: selectedQuality,
    speed: playbackSpeed.toString(),
  });

  const fullEmbedUrl = `${embedUrl}?${playerParams.toString()}`;

  const updateStats = useCallback((type: keyof VideoStats, value?: number) => {
    setVideoStats(prev => ({
      ...prev,
      [type]: value !== undefined ? value : prev[type] + 1
    }));
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculatePercentageWatched = useCallback((current: number, total: number): number => {
    return total > 0 ? Math.round((current / total) * 100) : 0;
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes('mediadelivery.net')) return;

      try {
        const data = event.data;

        switch (data.type) {
          case 'timeupdate':
            setCurrentTime(data.currentTime);
            setDuration(data.duration);
            
            const percentage = calculatePercentageWatched(data.currentTime, data.duration);
            updateStats('percentageWatched', percentage);
            updateStats('totalWatchTime', data.currentTime);
            
            if (onProgress) {
              onProgress(data.currentTime, data.duration, percentage);
            }
            break;

          case 'play':
            setIsPlaying(true);
            if (data.currentTime === 0 && onStart) {
              onStart();
            }
            break;

          case 'pause':
            setIsPlaying(false);
            updateStats('pauseCount');
            break;

          case 'ended':
            setIsPlaying(false);
            updateStats('completionRate', 100);
            if (onComplete) {
              onComplete();
            }
            break;

          case 'seeked':
            updateStats('seekCount');
            break;

          case 'loadstart':
            setIsLoading(false);
            break;

          case 'error':
            setError('Error al cargar el video');
            setIsLoading(false);
            break;

          case 'volumechange':
            setVolume(data.volume);
            setIsMuted(data.muted);
            break;

          case 'ratechange':
            setPlaybackSpeed(data.playbackRate);
            break;

          case 'qualitychange':
            setSelectedQuality(data.quality);
            updateStats('qualityChanges');
            break;
        }
      } catch (err) {
        console.error('Error procesando mensaje del video:', err);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onProgress, onComplete, onStart, calculatePercentageWatched, updateStats]);

  const togglePlayPause = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: isPlaying ? 'pause' : 'play'
      }, '*');
    }
  };

  const toggleMute = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: 'setMuted',
        muted: !isMuted
      }, '*');
    }
  };

  const changeVolume = (newVolume: number) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: 'setVolume',
        volume: newVolume
      }, '*');
    }
  };

  const seek = (seconds: number) => {
    if (iframeRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      iframeRef.current.contentWindow?.postMessage({
        type: 'setCurrentTime',
        currentTime: newTime
      }, '*');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changeSpeed = (newSpeed: number) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: 'setPlaybackRate',
        playbackRate: newSpeed
      }, '*');
      setPlaybackSpeed(newSpeed);
    }
  };

  const changeQuality = (newQuality: string) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: 'setQuality',
        quality: newQuality
      }, '*');
      setSelectedQuality(newQuality as any);
    }
  };

  if (error) {
    return (
      <div className={`bg-gray-900 rounded-lg flex items-center justify-center min-h-[400px] ${className}`}>
        <div className="text-center text-white p-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Error al cargar el video</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setIsLoading(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden group ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-30">
          <div className="text-center text-white">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-sm text-gray-400">Cargando video...</p>
          </div>
        </div>
      )}

      {/* Video Title */}
      {title && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          {showAnalytics && (
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {videoStats.percentageWatched}% visto
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(videoStats.totalWatchTime)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Main Video iframe */}
      <iframe
        ref={iframeRef}
        src={fullEmbedUrl}
        className="w-full aspect-video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError('No se pudo cargar el reproductor');
          setIsLoading(false);
        }}
      />

      {/* Enhanced Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-white text-xs mb-2">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1 bg-white/20 rounded-full h-1 cursor-pointer">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlayPause}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              {/* Skip buttons */}
              <button
                onClick={() => seek(-10)}
                className="text-white hover:text-blue-400 transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() => seek(10)}
                className="text-white hover:text-blue-400 transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => changeVolume(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-white/20 rounded-full outline-none slider"
                />
              </div>

              {/* Speed Indicator */}
              <span className="text-white text-sm bg-white/20 px-2 py-1 rounded">
                {playbackSpeed}x
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Download Button */}
              {enableDownload && (
                <button className="text-white hover:text-blue-400 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              )}

              {/* Analytics */}
              {showAnalytics && (
                <button className="text-white hover:text-blue-400 transition-colors">
                  <BarChart3 className="w-5 h-5" />
                </button>
              )}

              {/* Settings */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>

                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-4 min-w-[200px]">
                    {/* Speed Control */}
                    <div className="mb-4">
                      <label className="text-white text-sm font-medium block mb-2">Velocidad</label>
                      <div className="grid grid-cols-4 gap-1">
                        {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => changeSpeed(speed)}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              playbackSpeed === speed 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quality Control */}
                    <div>
                      <label className="text-white text-sm font-medium block mb-2">Calidad</label>
                      <div className="space-y-1">
                        {['auto', '1080p', '720p', '480p', '360p'].map((qual) => (
                          <button
                            key={qual}
                            onClick={() => changeQuality(qual)}
                            className={`block w-full text-left text-xs px-2 py-1 rounded transition-colors ${
                              selectedQuality === qual
                                ? 'bg-blue-500 text-white'
                                : 'text-white hover:bg-white/20'
                            }`}
                          >
                            {qual}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Panel */}
      {showAnalytics && (
        <div className="absolute top-4 right-4 bg-black/80 rounded-lg p-3 text-white text-xs space-y-1 z-20">
          <div>Tiempo total: {formatTime(videoStats.totalWatchTime)}</div>
          <div>Progreso: {videoStats.percentageWatched}%</div>
          <div>Pausas: {videoStats.pauseCount}</div>
          <div>Saltos: {videoStats.seekCount}</div>
        </div>
      )}
    </div>
  );
}
