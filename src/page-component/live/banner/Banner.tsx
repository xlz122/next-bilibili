import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
// 引入基础样式
import 'swiper/css';
// 进入分页器相关样式
import 'swiper/css/pagination';
import styles from './banner.module.scss';

import { Pagination } from 'swiper';

type Props = {
  banner: BannerType;
};

export type BannerType = {
  module_info?: {
    title: string;
  };
  list?: {
    pic: string;
    link: string;
  }[];
};

function LiveBanner(props: Props): React.ReactElement {
  return (
    <div className={styles.liveBanner}>
      <Swiper
        className={styles.swiper}
        loop={true}
        pagination={{
          clickable: true
        }}
        modules={[Pagination]}
      >
        {props.banner.list?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Link href={item.link}>
                <Image src={item.pic} fill sizes="100%" priority alt="" />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style jsx global>
        {`
          .swiper-pagination {
            left: inherit !important;
            right: 5px;
            bottom: 5px !important;
            text-align: right;
          }

          .swiper-pagination-bullet {
            width: 6px !important;
            height: 6px !important;
            margin: 0 2px !important;
            background-color: #fff;
            opacity: 1;
          }

          .swiper-pagination-bullet-active {
            background-color: #fb7299;
          }
        `}
      </style>
    </div>
  );
}

export default LiveBanner;
