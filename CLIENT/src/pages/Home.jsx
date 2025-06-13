import React from 'react'
import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import BestSellers from '../components/BestCollections'
import BestCollections from '../components/BestCollections'
import OurPolicy from '../components/OurPolicy'
import LetterBox from '../components/LetterBox'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
    <Hero></Hero>
    <LatestCollections></LatestCollections>
    <BestCollections></BestCollections>
    <OurPolicy></OurPolicy>
    <LetterBox></LetterBox>
    
    </div>
  )
}

export default Home
