import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import { Card } from '../../common'

const CardStack = () => {
  return (
    <Swiper modules={[FreeMode, Pagination]} freeMode={true} spaceBetween={50} auto slidesPerView={4} pagination={{ clickable: true }} className="h-full">
      <SwiperSlide>
        <Card />
      </SwiperSlide>
      <SwiperSlide>
        <Card />
      </SwiperSlide>
      <SwiperSlide>
        <Card />
      </SwiperSlide>
      <SwiperSlide>
        <Card />
      </SwiperSlide>
      <SwiperSlide>
        <Card />
      </SwiperSlide>
      <SwiperSlide>
        <Card />
      </SwiperSlide>
    </Swiper>
  )
}

export default CardStack
