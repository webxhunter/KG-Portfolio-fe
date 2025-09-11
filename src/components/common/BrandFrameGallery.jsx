import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import axios from 'axios';
import f_img_1 from "@/Assets/BrandInFrame/f-img-1.png";
import f_img_2 from "@/Assets/BrandInFrame/f-img-2.png";
import f_img_3 from "@/Assets/BrandInFrame/f-img-3.png";
import f_img_4 from "@/Assets/BrandInFrame/f-img-4.png";
import f_img_5 from "@/Assets/BrandInFrame/f-img-5.png";
import f_img_6 from "@/Assets/BrandInFrame/f-img-6.png";

const defaultCollageImages = [
    { src: f_img_1, position: 'image1', classes: "top-0 left-0 w-[25%] h-[45%] z-20" },
    { src: f_img_2, position: 'image2', classes: "top-[50%] left-0 w-[25%] h-[40%] z-20" },
    { src: f_img_3, position: 'image3', classes: "top-0 left-[26%] w-[24%] h-[45%] z-10" },
    { src: f_img_4, position: 'image4', classes: "top-[50%] left-[26%] w-[24%] h-[40%] z-10" },
    { src: f_img_5, position: 'image5', classes: "top-0 right-0 w-[48%] h-[88%] z-30" },
    { src: f_img_6, position: 'image6', classes: "top-[50%] left-[26%] w-[24%] h-[40%] z-20" },
    { src: f_img_7, position: 'image7', classes: "top-[50%] left-[26%] w-[24%] h-[40%] z-20" }
];

export default function BrandframeGallery() {
    const [media, setMedia] = useState({});

    useEffect(() => {
        async function fetchMedia() {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                const res = await axios.get(`${API_URL}/api/services/brand_in_frame/media`);
                const mediaMap = res.data.reduce((acc, item) => {
                    acc[item.position] = item;
                    return acc;
                }, {});
                setMedia(mediaMap);
            } catch (err) {
                console.error("Failed to fetch media:", err);
                setMedia({});
            }
        }
        fetchMedia();
    }, []);

    const collageImages = useMemo(() => {
        return defaultCollageImages.map(item => {
            const m = media[item.position];
            return m ? { 
                ...item, 
                src: `${process.env.NEXT_PUBLIC_API_URL}${m.file_path}`,
                type: m.media_type 
            } : item;
        });
    }, [media]);
    return (
        <div className="bg-black py-16">
            <div className="relative w-full max-w-6xl mx-auto h-[500px]">
                {collageImages.map((image, index) => (
                    <div key={index} className={`absolute ${image.classes}`}>
                        <Image
                            src={image.src}
                            alt=""
                            fill
                            className="object-cover rounded-lg"
                            sizes="50vw"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}