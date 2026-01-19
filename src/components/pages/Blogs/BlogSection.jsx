'use client';

import React from 'react';
import Image from 'next/image';
import BlogImg1 from '@/Assets/Blog/StoryTelling.PNG';
import BlogImg2 from '@/Assets/Blog/cinaVsPho.JPEG';
import PhotoCineHeading from '@/Assets/Blog/blog-3-heading.png';

const BlogSection = ({ type = 'storytelling' }) => {
  const isStorytelling = type === 'storytelling';
  const backgroundImage = isStorytelling ? BlogImg1 : BlogImg2;

  const renderContent = () => {
    if (isStorytelling) {
      return (
        <>
          <div className="py-5">
            <h4 className="mb-3 text-white text-xl">Introduction</h4>
            <p className="text-[#98989A] font-work-sans  text-base md:text-lg">
              Storytelling = More Than Just Pretty Pictures
            </p>
            <p className="text-[#98989A] font-work-sans text-base md:text-lg f">
              It's not just about showing what happened. It's about showing how it felt.
            </p>
          </div>
          <hr className="mb-5 border-[#98989A]" />

          <div className="space-y-4">
            <div className="mb-5">
              <p className="text-[#98989A] font-work-sans text-base md:text-lg  ">
                ✨ What is Storytelling? (And Why It Matters in Photos & Films)
              </p>
              <p className="text-[#98989A]">
                Let's be real — everyone loves a good story. Whether it's in a movie, a book, or a photo… storytelling is what pulls you in.
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#98989A]">
                But wait — <span className="font-work-sans text-base md:text-lg">how can a photo or a video tell a story? 🤔</span>
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#98989A] ">
                Imagine a photo of a little kid blowing out birthday candles.
              </p>
              <p className="text-[#98989A] ">
                Now think — is the kid excited? Nervous? Surprised?
              </p>
              <p className="text-[#98989A]">
                The lighting, the angle, the expressions — they all tell the story behind that moment.
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#98989A] font-work-sans text-base md:text-lg">
                🎬 In Films or Videos?
              </p>
              <p className="text-[#98989A]">
                Cinematographers use storytelling to take you on a journey. Every frame, every shot, every transition — it's all done on purpose to make you feel something.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[#98989A] ">
                It's not "just" showing someone walking — it's about making you wonder,
              </p>
              <p className="text-[#98989A]">
                Where is he going? What's he thinking?
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#98989A] font-work-sans text-base md:text-lg">
                Great Storytelling = You Don't Just Watch It. You Feel It.
              </p>
              <p className="text-[#98989A]">
                Whether it's a single photo or a full video, storytelling is what turns a moment into a memory.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[#98989A]">
                It's the difference between "nice picture" and "wow, I felt that." 💥
              </p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="py-5">
            <h4 className="mb-3 text-white text-xl">Introduction</h4>
            <p className="text-[#98989A] font-work-sans text-base md:text-lg">
              📸 Photographer = The Master of Moments
            </p>
            <p className="text-[#98989A] font-work-sans text-base md:text-lg">
              A photographer freezes time. One click. One frame. One powerful image that says a thousand words. Whether it's your smile, a plate of pasta, or a dreamy sunset — a photographer captures that one perfect second.
            </p>
          </div>
          <hr className="mb-5 border-[#98989A]" />

          <div className="space-y-4">
            <div className="mb-4">
              <p className="text-[#98989A] font-work-sans text-base md:text-lg">
                Artificial Intelligence 🎥 Cinematographer vs 📸 Photographer — What's the Difference?
              </p>
              <p className="text-[#98989A]">
                Let's keep it simple — both love cameras, both love capturing moments… but they tell stories a little differently.
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#98989A] font-work-sans text-base md:text-lg">
                📸 Photographer = The Master of Moments
              </p>
              <p className="text-[#98989A]">
                A photographer freezes time. One click. One frame. One powerful image that says a thousand words. Whether it's your smile, a plate of pasta, or a dreamy sunset — a photographer captures that one perfect second.
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#98989A]">
                Think of it like capturing a highlight — a snapshot memory you can hold onto forever.
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#98989A] font-work-sans text-base md:text-lg">
                🎥 Cinematographer = The Storyteller in Motion
              </p>
              <p className="text-[#98989A]">
                Now, a cinematographer? They're all about movement. They're the reason movies and videos feel so cinematic. They don't just press record — they paint with light, motion, and emotion. Every shot, every angle, every color — it's all part of a story they're telling through a lens.
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#98989A]">
                It's like instead of showing you a picture of a sunrise, they take you there, let you feel it rising.
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#98989A] mb-0">So, who does what?</p>
              <p className="text-[#98989A] font-work-sans text-base md:text-lg">
                A photographer captures your wedding kiss. 💏
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#98989A] font-work-sans text-base md:text-lg">
                A cinematographer captures the nervous laugh before, the kiss, and the happy tears after. 🎬
              </p>
            </div>

            <div>
              <p className="text-[#98989A]">
                Both are artists. One plays with stills. The other plays with motion. Together? They make magic happen. ✨
              </p>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <section className="pb-5 bg-black">
      <div className="container mx-auto mb-5">
        <div 
          className="bg-cover bg-center bg-no-repeat h-[65vh] max-[427px]:h-[40vh] flex items-end justify-center text-center p-8 w-screen -ml-[50vw] left-1/2 relative text-white"
          style={{ backgroundImage: `url(${backgroundImage.src})` }}
        >
          <div>
            {isStorytelling ? (
              <p className="text-xl md:text-3xl  font-semibold">
                What is Storytelling? (And Why It Matters in Photos & Films)
              </p>
            ) : (
              <Image 
                src={PhotoCineHeading} 
                alt="blog-heading"
                width={400}
                height={100}
                className="max-[427px]:w-80"
              />
            )}
          </div>
        </div>

        <div className="px-4">
          {renderContent()}
          <hr className="pb-5 border-[#98989A]" />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;