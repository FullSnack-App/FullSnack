import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './offers.css';
import OfferCard from '../../../components/OfferCard';
import OfferCardSkeleton from '../../../components/OfferCardSkeleton';
import { useOffer } from '../../../hooks/useOffer';

const Offers = () => {
    const { offers, loading } = useOffer()

    return (
        <div className="container">
            {/* Section Title */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                    Special <span className="text-orange-600">Offers</span>
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                    Enjoy our limited-time deals and exclusive discounts.
                </p>
            </div>

            {/* Handle Loading / Empty State */}
            {loading ? (
                // the swipper comp takes the full width so we will make one skeleton takes the full width too
                <OfferCardSkeleton/>
            ) : offers.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No offers available right now.</p>
            ) : (
                <Swiper
                    slidesPerView={1}
                    loop
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
                            <OfferCard offer={offer} />
                        </SwiperSlide>
                    ))}
                    <div className="custom-pagination mt-10 flex justify-center"></div>
                </Swiper>
            )}
        </div>
    );
};

export default Offers;
