import { useState } from 'react';
import TogglerGroup from '../../../components/toggleGroup';
import MenuList from './MenuList';

function Menu() {
    const mealItems = [
        {
            _id: '6902b02283965e8e039ab81d',
            name: 'Beef Burger',
            description: 'Juicy grilled beef patty with lettuce and cheese',
            price: 120,
            category: 'meal',
            rate: 4.5,
            isAvailable: true,
            imagesUrl:
                'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
            createdAt: '2025-10-30T00:24:02.339Z',
            updatedAt: '2025-10-30T00:24:02.339Z',
            offer: {
                title: 'Burger & Fries Combo',
                discountPercent: '20%',
                priceAfterDiscount: 96,
            },
        },
        {
            _id: '6902b03083965e8e039ab81f',
            name: 'Fries',
            description: 'Crispy golden fries with salt',
            price: 50,
            category: 'appetizer',
            rate: 4.2,
            isAvailable: true,
            imagesUrl:
                'https://images.unsplash.com/photo-1606755962773-d324c6c9c4b3?auto=format&fit=crop&w=800&q=80',
            createdAt: '2025-10-30T00:24:16.006Z',
            updatedAt: '2025-10-30T00:24:16.006Z',
            offer: {
                title: 'Burger & Fries Combo',
                discountPercent: '20%',
                priceAfterDiscount: 40,
            },
        },
        {
            _id: '6902b03683965e8e039ab821',
            name: 'Chocolate Cake',
            description: 'Rich chocolate cake with fudge topping',
            price: 80,
            category: 'dessert',
            rate: 4.8,
            isAvailable: true,
            imagesUrl:
                'https://images.unsplash.com/photo-1601972599720-3723e7a4d3b3?auto=format&fit=crop&w=800&q=80',
            createdAt: '2025-10-30T00:24:22.783Z',
            updatedAt: '2025-10-30T00:24:22.783Z',
            offer: {
                title: 'Dessert Deal',
                discountPercent: '10%',
                priceAfterDiscount: 72,
            },
        },
        {
            _id: '6902b03d83965e8e039ab823',
            name: 'Fresh Orange Juice',
            description: 'Freshly squeezed orange juice',
            price: 40,
            category: 'drink',
            rate: 4.6,
            isAvailable: true,
            imagesUrl:
                'https://images.unsplash.com/photo-1577801596757-18f3c5f8fba6?auto=format&fit=crop&w=800&q=80',
            createdAt: '2025-10-30T00:24:29.467Z',
            updatedAt: '2025-10-30T00:24:29.467Z',
            offer: {
                title: 'Healthy Combo',
                discountPercent: '15%',
                priceAfterDiscount: 34,
            },
        },
        {
            _id: '6902b04483965e8e039ab825',
            name: 'Grilled Chicken',
            description: 'Grilled chicken breast with herbs',
            price: 150,
            category: 'meal',
            rate: 4.7,
            isAvailable: true,
            imagesUrl:
                'https://images.unsplash.com/photo-1604909053137-774e2553e548?auto=format&fit=crop&w=800&q=80',
            createdAt: '2025-10-30T00:24:36.092Z',
            updatedAt: '2025-10-30T00:24:36.092Z',
            offer: {
                title: 'Healthy Combo',
                discountPercent: '15%',
                priceAfterDiscount: 127.5,
            },
        },
        {
            _id: '6902b2178a36e18c15427bfe',
            name: 'Pasta',
            description: 'Grilled chicken pasta with creamy sauce',
            price: 100,
            category: 'meal',
            rate: 4.7,
            isAvailable: true,
            imagesUrl:
                'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
            createdAt: '2025-10-30T00:32:23.184Z',
            updatedAt: '2025-10-30T00:32:23.184Z',
            offer: null,
        },
    ];

    const categories = ['meal', 'drink', 'dessert'];
    const [activeCategory, setActiveCategories] = useState('meal');
    const updateCategory = (cat) => {
        setActiveCategories(cat);
    };
    return (
        <>
            <div
                className="mx-auto px-4 py-16 w-full
            sm:max-w-[540px]
            md:max-w-[720px]
            lg:max-w-[960px]
            xl:max-w-[1140px]
            2xl:max-w-[1320px]"
            >
                <div className="title text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Our <span className="text-orange-600">Menu</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 ">
                        Explore our delicious selection of dishes made with fresh ingredients and
                        authentic recipes
                    </p>
                </div>

                <TogglerGroup
                    categories={categories}
                    activeCategory={activeCategory}
                    onchange={updateCategory}
                    className="mb-10"
                />

                <MenuList
                    menulist={mealItems.filter((item) => item.category === activeCategory)}
                    className="mt-8"
                />
            </div>
        </>
    );
}

export default Menu;
