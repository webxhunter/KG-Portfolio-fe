import React from 'react';
import BlogHero from './BlogHero';
import BlogContent from './BlogContent';
import BlogSection from './BlogSection';
import ScrollingFooter from '@/components/molecule/ScrollingCategory/ScrollingFooter';
import ImageCollage from './ImageCollage';



export default function BlogPage() {
  return (
    <>
   
      <div className="bg-black px-6 md:px-[6rem]">
        <BlogHero />
        <BlogContent />
        <BlogSection 
          title="What is Storytelling? (And Why It Matters in Photos & Films)"
          type="storytelling"
        />
        <BlogSection 
          title="🎥 Cinematographer vs 📸 Photographer — What's the Difference?"
          type="comparison"
        />
      </div>
      
      <ScrollingFooter />
      <ImageCollage />
    </>
  );
}