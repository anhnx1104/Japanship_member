import Box from '@mui/material/Box';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { BannerType } from 'types/banner';
import SlideImage from './components/SlideImage';
import SlideInner from './components/SlideInner';
import NextButton from './NextButton';
import PrevButton from './PrevButton';

interface Props {
  banners: BannerType[];
}

const Banner = (props: Props) => {
  const { banners } = props;

  return (
    <Swiper
      cssMode={true}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      navigation={{
        prevEl: '.prev',
        nextEl: '.next',
      }}
      pagination={{
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'my-swiper-bullet',
        bulletActiveClass: 'my-swiper-bullet-active',
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {banners?.map((banner) => (
        <SwiperSlide key={banner.id}>
          <SlideInner sx={{ width: 1, aspectRatio: '4 / 1.4', height: 'auto' }}>
            <SlideImage
              src={banner.hostUrl + banner.imageUrl}
              alt={banner.name}
            />
          </SlideInner>
        </SwiperSlide>
      ))}
      <NextButton />
      <PrevButton />
      <Box className="swiper-pagination" />
    </Swiper>
  );
};

export default Banner;
