"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation,Scrollbar,A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import instaicon from "@/Assets/Home/insta-icon-kg.png";
import cardBg from "@/Assets/Home/home-card-design.png"; // Assuming you have this background image

const TestimonialCard = ({ testimonial }) => {
  return (
    <div
      className="border border-gray-800 rounded-2xl p-6 relative min-h-[280px] h-full flex flex-col transition-transform duration-300 hover:-translate-y-1.5 bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${cardBg.src})`,
        backgroundColor: "#0E0E10",
      }}
    >
      <div className="absolute top-4 right-4">
        {testimonial.instagram_link && (
          <a
            href={testimonial.instagram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black rounded-full p-1 block"
          >
            <Image src={instaicon} alt="Instagram" width={40} height={40} />
          </a>
        )}
      </div>
      <div className="flex-grow mt-8">
        <h5 className="text-lg sm:text-xl font-semibold text-white">
          {testimonial.client_name}
        </h5>
        <p className="text-gray-400 text-xs sm:text-sm mb-3">
          {testimonial.location}
        </p>
        <div className="text-yellow-400 mb-4 text-lg">
          {"★".repeat(testimonial.star_rating)}
        </div>
        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
          {testimonial.review}
        </p>
      </div>
    </div>
  );
};

const TestimonialsSection = ({ testimonials }) => {
  return (
    <section
      className="text-white py-12 bg-black"
      id="testimonials"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4">
        <h6
          className="text-sm md:text-base text-gray-400 mb-2"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          TESTIMONIALS
        </h6>
        <h2
          className="text-3xl sm:text-5xl font-semibold uppercase mb-8 sm:mb-12"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          What My Clients Say
        </h2>
        <hr
          className="border-gray-700 mb-8"
          data-aos="fade-up"
          data-aos-delay="400"
        />

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              data-aos="fade-up"
              data-aos-delay={500 + index * 100}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        <div
          className="md:hidden relative"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !bg-gray-600 !w-3 !h-3 !mx-1 !opacity-60 hover:!opacity-100 transition-opacity duration-200",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-yellow-400 !opacity-100",
            }}
            spaceBetween={20}
            slidesPerView={1}
            scrollbar={{ draggable: true }}
            navigation
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
            className="!pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id || index}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          position: relative !important;
          margin-top: 2rem !important;
          bottom: auto !important;
        }

        .swiper-pagination-bullet {
          border-radius: 50% !important;
          cursor: pointer !important;
        }

        .swiper-pagination-bullet:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
