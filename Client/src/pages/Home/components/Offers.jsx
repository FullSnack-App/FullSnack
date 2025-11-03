import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './offers.css';
import OfferCard from '../../../components/OfferCard';
const Offers = () => {
    const offers = [
        {
            _id: '690716024fd965cbdf027d7b',
            title: 'Burger & Fries Combo',
            imageUrl:
                'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
            description: 'Get fries free when you buy a burger!',
            discountPercent: 20,
            menuItems: [
                {
                    _id: '690714ee4fd965cbdf027d6c',
                    name: 'Beef Burger',
                    description: 'Juicy grilled beef patty with lettuce and cheese',
                    price: 120,
                    category: 'meal',
                    rate: 4.5,
                    isAvailable: true,
                    createdAt: '2025-11-02T08:23:10.322Z',
                    updatedAt: '2025-11-02T08:23:10.322Z',
                    __v: 0,
                },
                {
                    _id: '690715014fd965cbdf027d6f',
                    name: 'Fries',
                    description: 'Crispy golden fries with salt',
                    price: 50,
                    category: 'appetizer',
                    rate: 4.2,
                    isAvailable: true,
                    createdAt: '2025-11-02T08:23:29.240Z',
                    updatedAt: '2025-11-02T08:23:29.240Z',
                    __v: 0,
                },
            ],
            isActive: true,
            createdAt: '2025-11-02T08:27:46.715Z',
            updatedAt: '2025-11-02T08:27:46.715Z',
            __v: 0,
        },
        {
            _id: '6907164b4fd965cbdf027d7e',
            title: 'Dessert Deal',
            imageUrl:
                'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
            description: 'Get 10% off on all desserts this week',
            discountPercent: 10,
            menuItems: [
                {
                    _id: '6907150e4fd965cbdf027d72',
                    name: 'Chocolate Cake',
                    description: 'Rich chocolate cake with fudge topping',
                    price: 80,
                    category: 'dessert',
                    rate: 4.8,
                    isAvailable: true,
                    createdAt: '2025-11-02T08:23:42.279Z',
                    updatedAt: '2025-11-02T08:23:42.279Z',
                    __v: 0,
                },
            ],
            isActive: true,
            createdAt: '2025-11-02T08:28:59.518Z',
            updatedAt: '2025-11-02T08:28:59.518Z',
            __v: 0,
        },
    ];

    return (
        <div className="container mx-auto px-4 ">
            {/* Section Title */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                    Special <span className="text-orange-600">Offers</span>
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600">
                    Enjoy our limited-time deals and exclusive discounts.
                </p>
            </div>

            {/* Swiper Slider */}
            <Swiper
                slidesPerView={1}
                loop={true}
                speed={500}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                }}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {offers.map((offer) => (
                    <SwiperSlide key={offer._id}>
                        <OfferCard offer={offer}></OfferCard>
                    </SwiperSlide>
                ))}
                <div className="custom-pagination mt-10 flex justify-center"></div>
            </Swiper>
        </div>
    );
};

export default Offers;
