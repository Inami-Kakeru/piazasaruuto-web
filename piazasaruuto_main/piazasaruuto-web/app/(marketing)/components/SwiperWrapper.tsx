"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

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
    <div className="mk-swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{
          nextEl: ".mk-swiper-button-next",
          prevEl: ".mk-swiper-button-prev",
        }}
        pagination={{
          el: ".mk-swiper-pagination",
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
        className="mk-swiper"
        aria-label="Instagram投稿スライダー"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="mk-swiper-slide">
              <div className="mk-swiper-image-container">
                <img
                  src={post.image}
                  alt={post.alt}
                  className="mk-swiper-image"
                />
                <div className="mk-swiper-overlay"></div>
              </div>
              <div className="mk-swiper-caption">
                <p className="mk-swiper-caption-text">
                  {post.caption}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* カスタムナビゲーションボタン */}
      <div className="mk-swiper-button-prev mk-swiper-button">
        <svg className="mk-swiper-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="mk-swiper-button-next mk-swiper-button">
        <svg className="mk-swiper-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* カスタムページネーション */}
      <div className="mk-swiper-pagination"></div>
    </div>
  );
}

