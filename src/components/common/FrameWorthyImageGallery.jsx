// /components/common/ImageGallery.jsx
import Image from 'next/image';

const MediaItem = ({ item, onClick }) => (
    <div
        // The layout is determined by the `col` prop, including row-spans.
        // REMOVED h-96 to allow row-span to control height.
        className={`relative group rounded-xl overflow-hidden cursor-pointer ${item.col}`}
        onClick={onClick}
        data-aos="fade-up"
    >
        {item.type === 'video' ? (
            <video src={item.src} controls className="w-full h-full object-cover" preload="none"
            playsInline
            muted/>
        ) : (
            <Image
                src={item.src}
                alt={`Gallery item for ${item.position}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
            />
        )}
    </div>
);


export default function FrameWorthyImageGallery({ items, onImageClick, gridClass = "" }) {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 sm:px-10">
             {/* The grid definition itself can now be passed as a prop for maximum flexibility */}
            <div className={`grid grid-cols-12 gap-3 ${gridClass}`}>
                {items.map((item, index) => (
                    <MediaItem
                        key={item.position || index}
                        item={item}
                        onClick={() => onImageClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}