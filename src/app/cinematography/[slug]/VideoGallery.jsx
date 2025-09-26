import { useState, useCallback } from "react";
import AdaptiveGallery from "@/components/common/AdaptiveGallery";
import VideoLightBox from "@/components/common/VideoLightBox";

const VideoGallery = ({ videos = [] }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleItemClick = useCallback((src, index) => {
    setSelectedItem(src);
    setCurrentIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(videos[nextIndex]);
  }, [currentIndex, videos]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    setCurrentIndex(prevIndex);
    setSelectedItem(videos[prevIndex]);
  }, [currentIndex, videos]);

  return (
    <>
      <AdaptiveGallery content={videos} onItemClick={handleItemClick} />
      <VideoLightBox
        open={!!selectedItem}
        src={selectedItem}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
        showNav={videos.length > 1}
      />
    </>
  );
};

export default VideoGallery;