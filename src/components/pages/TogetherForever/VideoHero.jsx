const VideoHero = ({ media, defaultVideo, title }) => {
    return (
      <div className="container mx-auto my-12 px-4" data-aos="fade-up" data-aos-delay="300">
        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            <div className="relative text-white overflow-hidden rounded-xl shadow-2xl">
              <video
                key={media['hero'] ? media['hero'].file_path : 'static'}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[450px] md:h-[550px] lg:h-[650px] object-cover"
              >
                <source
                  src={
                    media['hero'] && media['hero'].media_type === 'video'
                      ? process.env.NEXT_PUBLIC_API_URL + media['hero'].file_path
                      : defaultVideo
                  }
                  type="video/mp4"
                />
              </video>
              
              {/* Black overlay with opacity hover effect */}
              <div className="absolute inset-0 bg-black opacity-50 hover:opacity-70 transition-opacity duration-300"></div>
              
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Elegant title with sophisticated typography */}
              <div className="absolute bottom-8 left-8 right-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-2 tracking-wide">
                  <span className="font-serif italic text-yellow-300 mr-2">Together</span>
                  <span className="font-light">forever</span>
                </h1>
                
                {/* Subtle decorative line */}
                <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent mt-4"></div>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default VideoHero;