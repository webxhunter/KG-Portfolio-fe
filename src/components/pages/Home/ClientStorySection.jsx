"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import clientImg2 from "@/Assets/Home/home-clientstory-img-2.png";
import storyPattern from "@/Assets/Home/home-clientstory-bgborder.png";

const ClientStorySection = ({ clientVideo }) => {
  return (
    <section className="py-12 bg-black text-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4">
        <h6 className="text-sm md:text-base text-gray-400 mb-2" data-aos="fade-up" data-aos-delay="200">
          STORY
        </h6>
        <h2 className="text-3xl sm:text-5xl font-semibold uppercase mb-8 sm:mb-12 break-words" data-aos="fade-up" data-aos-delay="300">
          CLIENT STORY
        </h2>

        <div className="rounded-2xl overflow-hidden" data-aos="fade-up" data-aos-delay="400">
          {clientVideo?.url ? (
            <video
              className="w-full h-[40vh] sm:h-[70vh] object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={`${process.env.NEXT_PUBLIC_API_URL}${clientVideo.url}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-[40vh] sm:h-[70vh] flex items-center justify-center bg-gray-900">
              <p>No client video available.</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full my-2 md:my-4" data-aos="fade-up">
        <Image src={storyPattern} alt="Decorative pattern" className="w-full h-auto" width={1920} height={100} />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4" data-aos="fade-right" data-aos-delay="500">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed break-words">
              Tucked away on Loughborough Road in Leicester is a little shop with a big soul—
              <span className="text-blue-400">Mumbai</span> <span className="text-pink-500">Sandwich</span> <span className="text-indigo-400">Station</span>, 
              where nostalgia, flavor, and authenticity blend into every bite. What began as a father-son adventure through the streets of Mumbai has turned into a buzzing hub for Indian street food lovers in the UK. In just a few minutes inside the shop, you're greeted with the comforting aromas of buttered bread, spicy chutney, and melting cheese sizzling on a hot grill. It's not just food—it's theatre. In the video we captured, you can see the magic unfold: layers of vegetables, zesty green chutney, and a special masala blend come together between slices of soft bread, pressed until golden brown and perfectly crisp. Each sandwich tells a story—of home, heritage, and heart.
            </p>
            <div className="hidden lg:block">
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed break-words">
                But what truly sets this place apart is the experience. The smiles behind the counter, the hum of happy chatter, and the burst of flavor in every bite make it feel like a slice of Mumbai's street food culture has been lovingly transplanted into the heart of Leicester. Whether you're a longtime fan of vada pav and bhajiya, or trying these delicacies for the first time, Mumbai Sandwich Station welcomes you with open arms and full plates. It's not just about satisfying hunger—it's about feeding memories.
              </p>
            </div>
            <div className="lg:hidden">
              <Link href="/blogs/client-story" className="text-white text-sm font-medium inline-block">
                <span className="border-b border-gray-500 hover:border-white transition-colors pb-1">
                  READ MORE
                </span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-1 w-full" data-aos="fade-left" data-aos-delay="600">
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden">
              <Image
                src={clientImg2}
                alt="Client Story"
                className="w-full h-full object-cover"
                width={400}
                height={384}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full my-2 md:my-4" data-aos="fade-up">
        <Image src={storyPattern} alt="Decorative pattern" className="w-full h-auto" width={1920} height={100} />
      </div>
    </section>
  );
};

export default ClientStorySection;