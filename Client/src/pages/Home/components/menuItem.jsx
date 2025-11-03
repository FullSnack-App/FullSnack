import ButtonComp from '../../../components/Button';
import { Star, Plus } from 'lucide-react';

function MenuItem({ name, description, price, imagesUrl, rate, offer }) {
    // Calculate discounted price and percentage
    const discountedPrice = offer?.priceAfterDiscount ?? null;

    return (
        <div className="card bg-base-100 shadow-sm hover:shadow-lg transition-transform duration-300 relative overflow-hidden">
            {/* Image */}
            <figure>
                <img
                    src={imagesUrl}
                    alt={name}
                    className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
                />
            </figure>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-white backdrop-blur-sm px-2 py-1 rounded-full absolute right-2 top-3 shadow-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{rate}</span>
            </div>

            {/* Offer Badge */}
            {offer && (
                <div className="absolute left-3 top-3 bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                    {offer.discountPercent}
                </div>
            )}

            {/* Body */}
            <div className="card-body mt-5 p-5">
                <h3 className="card-title text-lg mb-2">{name}</h3>
                <p className="text-sm text-gray-600 mb-3">{description}</p>

                {/* Price */}
                <p className="text-xl text-orange-600 mb-3">
                    {offer ? (
                        <>
                            <span className="line-through text-gray-400 mr-2">${price}</span>
                            <span>${discountedPrice}</span>
                        </>
                    ) : (
                        <>${price}</>
                    )}
                </p>

                {/* Add to cart */}
                <div className="card-actions justify-center mt-5">
                    <ButtonComp className="w-full rounded-xl">
                        <Plus size={18} /> Add to cart
                    </ButtonComp>
                </div>
            </div>
        </div>
    );
}

export default MenuItem;
