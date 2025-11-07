function OfferCardSkeleton() {
    return (
        <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ease-in-out">
            {/* Image skeleton */}
            <div className="skeleton w-full h-75 md:h-90"></div>

            {/* Discount badge placeholder */}  
            <div className="absolute right-5 top-5">
                <div className="skeleton h-6 w-16 rounded-full"></div>
            </div>

            {/* Gradient overlay for consistency */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

            {/* Text placeholders */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="skeleton h-6 w-2/3 mb-2"></div>
                <div className="skeleton h-4 w-full mb-1"></div>
                <div className="skeleton h-4 w-5/6"></div>
            </div>
        </div>
    );
}

export default OfferCardSkeleton;
