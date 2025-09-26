"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  price: string;
  href: string;
}

interface MenuSwiperWrapperProps {
  menus: MenuItem[];
  autoplay?: boolean;
}

export default function MenuSwiperWrapper({ menus, autoplay = true }: MenuSwiperWrapperProps) {
  return (
    <div className="mk-swiper-container">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 text-center mb-4">メニュー紹介</h3>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          nextEl: ".mk-swiper-button-next",
          prevEl: ".mk-swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".mk-swiper-pagination",
        }}
        autoplay={autoplay ? {
          delay: 4000,
          disableOnInteraction: false,
        } : false}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
        }}
        className="mk-swiper"
      >
        {menus.map((menu) => (
          <SwiperSlide key={menu.id} className="mk-swiper-slide">
            <article className="mk-menu-slide-card">
              <a href={menu.href} className="group block">
                <div className="mk-menu-slide-image-container">
                  <img 
                    src={menu.image} 
                    alt={menu.alt} 
                    className="mk-menu-slide-image" 
                  />
                  <div className="mk-menu-slide-overlay"></div>
                </div>
                <div className="mk-menu-slide-content">
                  <h3 className="mk-menu-slide-title">{menu.title}</h3>
                  <p className="mk-menu-slide-description">{menu.description}</p>
                  <div className="mk-menu-slide-price">{menu.price}</div>
                  <span className="mk-menu-slide-link">詳しく見る</span>
                </div>
              </a>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="mk-swiper-button mk-swiper-button-prev" aria-label="前のメニュー">
        <svg className="mk-swiper-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="mk-swiper-button mk-swiper-button-next" aria-label="次のメニュー">
        <svg className="mk-swiper-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination */}
      <div className="mk-swiper-pagination"></div>
    </div>
  );
}
