import React from 'react';
import HeroSection from './components/HeroSection';
import Menu from './components/Menu';
import Offers from './components/Offers';
const Home = () => {
    return (
        <>
            <HeroSection />
            <div className="h-10 bg-linear-to-b from-orange-50 to-white" />
            <Offers></Offers>
            <div className="h-10 bg-linear-to-b from-white to-orange-50" />
            <section id="menu" className="bg-linear-to-b from-orange-50 to-white">
                <Menu />
            </section>
        </>
    );
};

export default Home;
