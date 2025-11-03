import { Clock4 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import MenuList from '../Home/components/MenuList';
import OfferCard from '../../components/OfferCard';

function Offer() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Temporary local offers data (later from context or API)
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
                    imageUrl:
                        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
                    price: 120,
                    category: 'meal',
                    rate: 4.5,
                },
                {
                    _id: '690715014fd965cbdf027d6f',
                    name: 'Fries',
                    description: 'Crispy golden fries with salt',
                    price: 50,
                    imageUrl:
                        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
                    category: 'appetizer',
                    rate: 4.2,
                },
            ],
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
                    imageUrl:
                        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
                    category: 'dessert',
                    rate: 4.8,
                },
            ],
        },
    ];

    const offer = offers.find((offer) => offer._id === id);

    if (!offer) {
        return (
            <div className="text-center py-20 text-gray-600">
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
    const menuList = offer.menuItems.map((item) => ({
        ...item,
        offer: {
            priceAfterDiscount: item.price - (item.price * offer.discountPercent) / 100,
            discountPercent: offer.discountPercent + '%',
        },
    }));

    return (
        <section className="py-10 px-4 max-w-6xl mx-auto">
            {/* Offer Hero */}
            <OfferCard offer={offer} onClick={() => {}}></OfferCard>

            {/* Limited Time Section */}
            <div className="flex items-start gap-4 mt-8 bg-orange-50 rounded-xl p-5 shadow-sm border border-orange-100">
                <div className="bg-orange-100 rounded-lg p-3">
                    <Clock4 color="orange" />
                </div>
                <div>
                    <h3 className="font-semibold mb-1 text-orange-800">Limited Time Offer</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        This special offer is available for a limited time only. Order now to take
                        advantage of this amazing deal before it’s gone!
                    </p>
                </div>
            </div>

            {/* Menu Items */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Items in this Offer</h3>
                <MenuList menulist={menuList} />
            </div>
        </section>
    );
}

export default Offer;
