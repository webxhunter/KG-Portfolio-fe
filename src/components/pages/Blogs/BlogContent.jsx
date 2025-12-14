"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "@/Assets/Blog/heart-blog.png";
import EyeIcon from "@/Assets/Blog/eye-blog.png";
import ShareIcon from "@/Assets/Blog/share-icon.png";

const BlogContent = () => {
  const [likes, setLikes] = useState(1);

  const handleLike = () => setLikes((prev) => prev + 1);

  const formatLikes = (count) =>
    count >= 1000 ? (count / 1000).toFixed(1) + "k" : count.toString();

  return (
    <div className="bg-black text-white pb-5 ">
      <div className="container mx-auto pb-5">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-20">
          <div className="lg:col-span-8 pt-5">
            <div className="mb-5 px-3">
              <h4 className="mb-3 text-white text-xl">Introduction</h4>
              <p className="text-[#98989A] font-work-sans text-base md:text-lg ">
                Color grading is like that frosting — it's the magic touch that
                gives your photos a mood, a vibe, a personality.
              </p>
            </div>
            <hr className="mb-5 border-[#98989A]" />
            <div className="px-3 pb-5">
              <p className="text-[#98989A] font-work-sans text-base md:text-lg mb-4">
                Okay, imagine baking a cake 🧁. You've got your sponge ready —
                soft, fresh, and tasty. But now you add some frosting, maybe
                drizzle some chocolate, sprinkle in colors — that's what makes
                it look delicious, right?
              </p>
              <p className="text-[#98989A] font-work-sans text-base md:text-lg mb-4">
                Color grading is like that frosting — it’s the magic touch that
                gives your photos a mood, a vibe, a personality.
              </p>
              <p className="text-[#98989A] mb-4">📸 Let's break it down:</p>
              <ul className="text-[#98989A] list-disc pl-6 space-y-2">
                <li>
                  The raw image is like a blank canvas — good, but not exciting
                  yet.
                </li>
                <li>
                  Color grading adjusts the colors, tones, shadows, and
                  highlights to tell a story.
                </li>
                <li>
                  Want a warm sunset or a cold rainy day mood? Color grading
                  does that!
                </li>
                <li>
                  It's about evoking emotions: happy, dreamy, dramatic, vintage
                  — color grading brings them to life. 💫
                </li>
              </ul>
              <p className="text-[#98989A] mt-4">
                So next time you look at a photo that gives you goosebumps —
                yup, you're probably feeling the magic of color grading!
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 lg:border-l border-[#393939] pt-5">
            <div className="flex justify-center gap-3 mb-4 pb-4">
              <button
                // onClick={handleLike}
                className="flex items-center bg-[#141414] border border-[#262626] rounded-full px-4 py-2 text-[#98989A] cursor-pointer hover:bg-[#1a1a1a] transition-colors"
              >
                <Image
                  src={HeartIcon}
                  alt="likes"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {100}
              </button>
              <div className="flex items-center bg-[#141414] border border-[#262626] rounded-full px-4 py-2 text-[#98989A]">
                <Image
                  src={EyeIcon}
                  alt="views"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                50k
              </div>
              <Link
                href="https://www.instagram.com/_shotsbykg?igsh=MTd4NWg1d3FqdGR6Ng=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-[#141414] border border-[#262626] rounded-full px-4 py-2 text-[#98989A] hover:bg-[#1a1a1a] transition-colors no-underline"
              >
                <Image
                  src={ShareIcon}
                  alt="shares"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                206
              </Link>
            </div>

            <hr className="border-[#98989A]" />

            <div className="grid grid-cols-2 px-4 py-4">
              <div className="mb-4">
                <h6 className="text-[#98989A] text-base font-normal mb-1">
                  Publication Date
                </h6>
                <p className="text-white font-medium text-base">
                  October 15, 2023
                </p>
              </div>
              <div className="mb-4">
                <h6 className="text-[#98989A] text-base font-normal mb-1">
                  Category
                </h6>
                <p className="text-white font-medium text-base">Color Theory</p>
              </div>
              <div className="mb-4">
                <h6 className="text-[#98989A] text-base font-normal mb-1">
                  Reading Time
                </h6>
                <p className="text-white font-medium text-base">05 Min</p>
              </div>
              <div>
                <h6 className="text-[#98989A] text-base font-normal mb-1">
                  Author Name
                </h6>
                <p className="text-white font-medium text-base">
                  Kamal Goswami
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-[#98989A] mt-8" />
      </div>
    </div>
  );
};

export default BlogContent;
