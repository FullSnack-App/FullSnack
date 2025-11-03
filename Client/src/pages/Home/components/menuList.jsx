import SkeletonMenuItem from '../../../components/SkeletonMenuItem';
import MenuItem from './menuItem';

function MenuList({ menulist = [], loading, className = '' }) {
    return (
        <div
            className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xlg:grid-cols-4 transition-all duration-300 ${className}`}
        >
            {loading ? (
                // While loading → show skeleton placeholders
                [...Array(6)].map((_, i) => <SkeletonMenuItem key={i} />)
            ) : menulist.length > 0 ? (
                // When loaded and have data
                menulist.map((menuitem) => <MenuItem key={menuitem._id} {...menuitem} />)
            ) : (
                // When loaded but empty
                <p className="col-span-full text-center text-gray-500 text-lg">
                    No menu items found.
                </p>
            )}
        </div>
    );
}

export default MenuList;
