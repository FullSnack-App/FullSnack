import React from 'react';
import HeroSection from './components/HeroSection';
import Menu from './components/Menu';
import Offers from './components/Offers';
const Home = () => {
    return (
        <>
            <HeroSection />
            <div className="h-10 bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900" />
            <Offers></Offers>
            <div className="h-10 bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800" />
            <section id="menu" className="bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900">
                <Menu />
            </section>
        </>
    );
};

export default Home;
