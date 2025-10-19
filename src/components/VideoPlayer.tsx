interface VideoPlayerProps {
  url: string;
  title: string;
}

const VideoPlayer = ({ url, title }: VideoPlayerProps) => {
  const getEmbedUrl = (videoUrl: string): string | null => {
    if (!videoUrl) return null;
    
    // YouTube
    const youtubeMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    
    // Vimeo
    const vimeoMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    // Если это уже embed URL
    if (videoUrl.includes('embed')) {
      return videoUrl;
    }
    
    return null;
  };

  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Видео недоступно</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
