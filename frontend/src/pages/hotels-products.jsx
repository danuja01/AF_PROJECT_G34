import { Section } from '../components/common'
import Layout from '../components/layout'
import CardStackHotels from '../components/hotels-products/card_carousel/cardStackHotels'
import CardStackProducts from '../components/hotels-products/card_carousel/cardStackProducts'
import Search from '../components/hotels-products/search/search'
import Hero from '../components/hotels-products/slider/slider'

const HotelsProducts = () => {
  return (
    <Layout title="Home">
      <div className="-z-10">
        <Hero />
      </div>
      <div className="w-full relative mb-28">
        <Search />
      </div>
      <Section className="max-w-7xl mx-auto ">
        <div className=" flex flex-col items-center">
          <h1 className="text-center text-3xl font-bold">Hotels</h1>
          {/* <p className="text-center w-[70%] text-sm">
            Get your adrenaline pumping with our Sri Lankan adventure tour. Trek through lush rainforests, raft down raging rivers, and climb towering mountains. This tour is perfect for thrill-seekers who want to experience the best of Sri Lanka's natural beauty.
          </p> */}
        </div>
        <div className="mt-16 h-[30rem]">
          <CardStackHotels />
        </div>
      </Section>
      <div className="bg-gray-100 ">
        <Section className="max-w-7xl mx-auto ">
          <div className=" flex flex-col items-center pt-12">
            <h1 className="text-center text-3xl font-bold">Products</h1>
            {/* <p className="text-center w-[70%] text-sm">
              Get your adrenaline pumping with our Sri Lankan adventure tour. Trek through lush rainforests, raft down raging rivers, and climb towering mountains. This tour is perfect for thrill-seekers who want to experience the best of Sri Lanka's natural beauty.
            </p> */}
          </div>
          <div className="mt-16 h-[30rem]">
            {/* <CardStackProducts /> */}
          </div>
        </Section>
      </div>
    </Layout>
  )
}

export default HotelsProducts
