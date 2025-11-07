import { useContext } from 'react';
import { Clock4 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import MenuList from '../Home/components/MenuList';
import OfferCard from '../../components/OfferCard';
import OfferCardSkeleton from '../../components/OfferCardSkeleton';
import { OffersContext } from '../../context/OffersContext';

function Offer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getOfferById, loading } = useContext(OffersContext);

    const offer = getOfferById(id);

    if (loading) {
        return (
            <section className="py-10 px-4 max-w-6xl mx-auto">
                <OfferCardSkeleton />
            </section>
        );
    }

    if (!offer) {
        return (
            <div className="text-center py-20 text-gray-600 dark:text-gray-400">
                <h2 className="text-3xl font-semibold mb-4">Offer not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition"
                >
                    Back to Offers
                </button>
            </div>
        );
    }

    // Adjust each menu item to include offer info
    const menuList =
        offer.menuItems?.map((item) => ({
            ...item,
            offer: {
                priceAfterDiscount: item.price - (item.price * offer.discountPercent) / 100,
                discountPercent: offer.discountPercent + '%',
            },
        })) || [];

    return (
        <section className="container">
            {/* Offer Hero */}
            <OfferCard offer={offer} onClick={() => {}} />

            {/* Limited Time Section */}
            <div className="flex items-start gap-4 mt-8 bg-orange-50 rounded-xl p-5 shadow-sm border border-orange-100">
                <div className="bg-orange-100 rounded-lg p-3">
                    <Clock4 color="orange" />
                </div>
                <div>
                    <h3 className="font-semibold mb-1 text-orange-800">Limited Time Offer</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        This special offer is available for a limited time only. Order now to take
                        advantage of this amazing deal before it’s gone!
                    </p>
                </div>
            </div>

            {/* Menu Items */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Items in this Offer</h3>
                <MenuList menulist={menuList} />
            </div>
        </section>
    );
}

export default Offer;
