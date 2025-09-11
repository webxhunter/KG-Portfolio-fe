// /components/common/VideoHero.jsx

export default function VideoHero({ media, defaultVideo, title }) {
    const videoSrc = media?.['hero']?.media_type === 'video'
        ? `${process.env.NEXT_PUBLIC_API_URL}${media['hero'].file_path}`
        : defaultVideo;

    const titleParts = title.split(' ');
    const firstWord = titleParts[0] || '';
    const restOfTitle = titleParts.slice(1).join(' ');

    console.log("videoSrc",videoSrc)

    return (
        <div className="container mx-auto my-12 px-4" data-aos="fade-up" data-aos-delay="100">
            <div className="relative text-white overflow-hidden rounded-2xl shadow-2xl h-[60vh] max-h-[650px]">
                <video key={videoSrc} autoPlay muted loop playsInline className="absolute w-full h-full object-cover">
                    <source src={videoSrc} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent"></div>
                <div className="absolute bottom-8 left-8">
                    <h1 className="text-3xl md:text-5xl font-light text-white tracking-wide capitalize">
                        <span className="font-serif italic text-yellow-300 mr-2">{firstWord}</span>
                        <span>{restOfTitle}</span>
                    </h1>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent mt-4"></div>
                </div>
            </div>
        </div>
    );
}