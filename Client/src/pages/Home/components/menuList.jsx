import MenuItem from './MenuItem';
import SkeletonMenuItem from '../../../components/skeletonMenuItem';

function MenuList({ menulist, className = '' }) {
    return (
        <div
            className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xlg:grid-cols-4 transition-all duration-300 ${className}`}
        >
            {menulist.length > 0
                ? menulist.map((menuitem) => <MenuItem key={menuitem._id} {...menuitem} />)
                : [...Array(3)].map((_, i) => <SkeletonMenuItem key={i} />)}
        </div>
    );
}

export default MenuList;
