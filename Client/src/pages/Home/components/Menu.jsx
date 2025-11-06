import { useState, useMemo } from 'react';
import TogglerGroup from '../../../components/TogglerGroup';
import MenuList from './MenuList';
import { useMenu } from '../../../hooks/useMenu';

function Menu() {
    const { menuItems, loading } = useMenu();
    console.log(menuItems);
    const [activeCategory, setActiveCategory] = useState('meal');
    // Automatically extract unique categories from the data
    const categories = useMemo(() => {
        const unique = new Set(menuItems.map((item) => item.category));
        return Array.from(unique);
    }, [menuItems]);

    const updateCategory = (cat) => setActiveCategory(cat);

    const filteredItems = useMemo(() => {
        if (!activeCategory) return menuItems;
        return menuItems.filter((item) => item.category === activeCategory);
    }, [menuItems, activeCategory]);

    return (
        <div className="container">
            {/* Section Title */}
            <div className="title text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                    Our <span className="text-orange-600">Menu</span>
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600">
                    Explore our delicious selection of dishes made with fresh ingredients and
                    authentic recipes
                </p>
            </div>

            {/* Category Toggles */}
            {categories.length > 0 && (
                <TogglerGroup
                    categories={categories}
                    activeCategory={activeCategory}
                    onchange={updateCategory}
                    className="mb-10"
                />
            )}

            {/* Menu Items List */}
            <MenuList menulist={filteredItems} loading={loading} className="mt-8" />
        </div>
    );
}

export default Menu;
