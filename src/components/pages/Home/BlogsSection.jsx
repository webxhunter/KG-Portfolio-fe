"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 h-full flex flex-col">
      <div className="relative w-full h-56">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${blog.image}`}
          alt={blog.question}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs text-gray-400 uppercase mb-2">
          {new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
          {blog.question}
        </h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {blog.answer.length > 100
            ? blog.answer.slice(0, 100) + "..."
            : blog.answer}
        </p>
        <Link href={`/blogs`} className="text-white text-sm font-medium mt-auto self-start">
          <span className="border-b border-gray-500 hover:border-white transition-colors pb-1">
            READ FULL ARTICAL
          </span>
        </Link>
      </div>
    </div>
  );
};

const BlogsSection = ({ blogs }) => {
  return (
    <section className="blogs bg-black py-12" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h6
          className="text-sm md:text-base text-gray-400 mb-2"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          BLOGS
        </h6>
        <h2
          className="text-3xl sm:text-5xl font-semibold uppercase text-white mb-8 sm:mb-12"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          READ ME
        </h2>
        <hr className="border-gray-700 mb-8" data-aos="fade-up" data-aos-delay="400" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={blog.id || index}
                data-aos="fade-up"
                data-aos-delay={400 + index * 100}
              >
                <BlogCard blog={blog} />
              </div>
            ))
          ) : (
            <div
              className="text-white text-center col-span-full"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <p>No blogs found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
