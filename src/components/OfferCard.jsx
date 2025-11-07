import { useNavigate } from "react-router";

function OfferCard({ offer, onClick }) {
    const navigate = useNavigate();
    return (
        <>
            <div
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-in-out"
                onClick={() => (onClick ? onClick() : navigate(`/offer/${offer._id}`))}
            >
                <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-full h-75 md:h-90 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                {/* Offer Badge */}
                {offer.discountPercent && (
                    <div className="absolute right-5 top-5 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-20">
                        {offer.discountPercent}% OFF
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                    <h2 className="text-3xl font-bold mb-2">{offer.title}</h2>
                    <p className="text-gray-200 text-sm">{offer.description}</p>
                </div>
            </div>
        </>
    );
}

export default OfferCard;
