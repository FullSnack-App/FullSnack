import { Routes, Route } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Offer from '../pages/Offer';
import MenuItemDetails from '../pages/MenuItemDetails';
import { ROUTES } from '../config/routes';
import ProtectedRoute from '../components/ProtectedRoute';
import Profile from '../pages/Profile';
import OrderCancel from '../pages/OrderCancel';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSucces';
import ProtectedUserRoute from '../components/protectedUser';
import MailVerification from '../pages/MailVerification';
import { adminRoutes } from './AdminRouter';

export const routes = (
    <Routes>
        <Route
            element={
                <ProtectedUserRoute>
                    <MainLayout />
                </ProtectedUserRoute>
            }
        >
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.OFFER} element={<Offer />} />
            <Route path={ROUTES.MENU_ITEM} element={<MenuItemDetails />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path={ROUTES.ABOUT} element={<About />} />

            <Route
                path={ROUTES.PROFILE}
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.CHECKOUT}
                element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.ORDER_SUCCESS}
                element={
                    <ProtectedRoute>
                        <OrderSuccess />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.ORDER_CANCEL}
                element={
                    <ProtectedRoute>
                        <OrderCancel />
                    </ProtectedRoute>
                }
            />
        </Route>
        <Route path={ROUTES.CONFIRM_MAIL} element={<MailVerification />} />

        {adminRoutes}

        <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
);
