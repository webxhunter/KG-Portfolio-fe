import Image from 'next/image';

const TogetherImageGallery = ({ images, media, onImageClick }) => {
  if (!images || !media || images.length < 8) {
    return null; 
  }

  const MediaItem = ({ className, index }) => {
    const imgData = images[index];
    const mediaData = media[imgData.position];
    const source = mediaData?.file_path ? process.env.NEXT_PUBLIC_API_URL + mediaData.file_path : imgData.src;
    const isVideo = mediaData?.media_type === 'video';

    return (
      <div
        className={`relative w-full cursor-pointer rounded-xl overflow-hidden ${className}`}
        onClick={() => onImageClick(index)}
      >
        {isVideo ? (
          <video
            src={source}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            controls
            playsInline
            muted
          />
        ) : (
          <Image
            src={source}
            alt={`gallery-item-${index + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
    );
  };

  return (
    <div className="px-2 sm:px-5">
      <div className="flex flex-col md:flex-row gap-3">
        
        <div className="flex flex-col gap-3 w-full md:w-1/2">
          <MediaItem className="h-40 sm:h-78" index={0} />
          <div className="flex gap-3">
            <MediaItem className="w-1/2 h-40 sm:h-78" index={2} />
            <MediaItem className="w-1/2 h-40 sm:h-78" index={3} />
          </div>
          <MediaItem className="h-40 sm:h-78" index={4} />
          <MediaItem className="h-40 sm:h-78" index={6} />
        </div>

        <div className="flex flex-col gap-3 w-full md:w-1/2">
          <MediaItem className="h-[20.75rem] sm:h-[40rem]" index={1} />
          <MediaItem className="h-40 sm:h-78" index={5} />
          <MediaItem className="h-40 sm:h-78" index={7} />
        </div>
        
      </div>
    </div>
  );
};

export default TogetherImageGallery;