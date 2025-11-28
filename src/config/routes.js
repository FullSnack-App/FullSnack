export const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    PROFILE: '/profile',
    CONTACT: '/contact',
    CHECKOUT: '/checkout',
    CONFIRM_MAIL : "/confirm-email/:userId",
    ORDER_SUCCESS: '/order-success/:orderId',
    ORDER_CANCEL: '/order-cancel',
    OFFER: '/offer/:id',
    MENU_ITEM: '/menu-item/:id',
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
