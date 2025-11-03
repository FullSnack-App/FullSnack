export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    ABOUT: '/about',
    CONTACT: '/contact',
    CHECKOUT: '/checkout',
    OFFER: '/offer/:id',
    ADMIN: '/admin',
    ADMIN_MENU: '/admin/menu',
    ADMIN_OFFERS: '/admin/offers',
};

export const PROTECTED_ROUTES = [
    ROUTES.ADMIN,
    ROUTES.ADMIN_MENU,
    ROUTES.ADMIN_OFFERS,
    ROUTES.CHECKOUT,
];
