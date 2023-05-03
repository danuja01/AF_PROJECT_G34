import React from 'react'
import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css'
import 'normalize.css/normalize.css'
import './slider-animations.css'
import './styles.css'

const content = [
  {
    title: 'Sri Lankan Cultural Hotels and Products',
    description: "Our Sri Lankan cultural hotels offers you the opportunity to explore the country's vibrant traditions, breathtaking scenery, and delicious cuisine. Stay in tents that are fully equipped with modern amenities and enjoy meals cooked over an open fire.",
    image: 'assets/images/hotel-page/image.png',
  },
]

const Hero = () => (
  <div className="w-screen relative -z-0]">
    <Slider className="slider-wrapper">
      {content.map((item, index) => (
        <div key={index} className="slider-content" style={{ background: `url('${item.image}') no-repeat center center` }}>
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </Slider>
  </div>
)

export default Hero
