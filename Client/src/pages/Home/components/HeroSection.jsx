import React from 'react';
import image1 from '../../../Chef.jfif';

export default function HeroSection() {
    return (
        <section className="flex h-screen flex-col-reverse md:flex-row items-center justify-between bg-[#FFF8EE] px-8 md:px-16 py-12 md:py-20 rounded-3xl shadow-sm">
            {/* Left side (Text) */}
            <div className="flex-1 text-left space-y-5">
                <p className="inline-block bg-[#FFF0E0] text-[#FF5722] px-4 py-2 rounded-full font-medium text-sm shadow-sm">
                    Free Delivery on Orders Over $30
                </p>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                    Delicious Food <br />
                    <span className="text-[#FF5722]">Delivered to You</span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg max-w-md">
                    Experience the finest cuisine from local restaurants. Fresh ingredients, amazing
                    flavors, fast delivery.
                </p>

                <div className="flex gap-4 pt-4">
                    <button className="bg-[#FF5722] text-white px-6 py-3 rounded-lg text-sm md:text-base font-medium hover:bg-[#E64A19] transition">
                        Order Now →
                    </button>
                    <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm md:text-base font-medium hover:bg-gray-100 transition">
                        View Menu
                    </button>
                </div>
            </div>

            {/* Right side (Image) */}
            <div className="flex-1 flex justify-center mb-8 md:mb-0">
                <div className=" rounded-3xl">
                    <img
                        src={image1}
                        alt="Chef"
                        className="w-[280px] shadow-lg md:w-[100%] rounded-2xl object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
