import React from 'react';
import image1 from '../../../Chef.jfif';
import Button from '../../../components/Button';

export default function HeroSection() {
    return (
        <section className="bg-white  shadow-sm px-8 md:px-16 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                <div className="order-2 md:order-1 space-y-5 text-center md:text-left">
                    <p className="inline-block bg-[#FFF0E0] text-[#FF5722] px-4 py-2 rounded-full font-medium text-sm shadow-sm">
                        Free Delivery on Orders Over $30
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                        Delicious Food <br />
                        <span className="text-[#FF5722]">Delivered to You</span>
                    </h1>

                    <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto md:mx-0">
                        Experience the finest cuisine from local restaurants. Fresh ingredients,
                        amazing flavors, fast delivery.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                        <Button className="bg-[#FF5722] text-white px-6 py-3 rounded-lg text-sm md:text-base font-medium hover:bg-[#E64A19] transition">
                            Order Now →
                        </Button>
                        <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm md:text-base font-medium hover:bg-gray-100 transition">
                            View Menu
                        </button>
                    </div>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                    <img
                        src={image1}
                        alt="Chef"
                        className="w-[80%] md:w-full lg:w-full rounded-3xl shadow-lg object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
