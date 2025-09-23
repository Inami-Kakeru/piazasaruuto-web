"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Swiperスタイルのインポート
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface InstagramPost {
  id: number;
  image: string;
  alt: string;
  caption: string;
}

interface SwiperWrapperProps {
  posts: InstagramPost[];
  autoplay: boolean;
}

export default function SwiperWrapper({ posts, autoplay }: SwiperWrapperProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
        }}
        autoplay={autoplay ? {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        loop={true}
        speed={800}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
        }}
        className="!pb-12"
        aria-label="Instagram投稿スライダー"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="form-section p-0 overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="p-4">
                <p className="text-sm leading-relaxed line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* カスタムナビゲーションボタン */}
      <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* カスタムページネーション */}
      <div className="swiper-pagination-custom flex justify-center space-x-2 mt-6"></div>
    </div>
  );
}