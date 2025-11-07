import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { OffersProvider } from './context/OffersProvider';
import { Toaster } from 'react-hot-toast';
import { MenuProvider } from './context/MenuProvider';
import AuthWrapper from './components/AuthWrapper';
import { OrderProvider } from './context/OrderProvider';

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <AuthWrapper>
            <MenuProvider>
                <OffersProvider>
                    <OrderProvider>
                        <Toaster />
                        <App />
                    </OrderProvider>
                </OffersProvider>
            </MenuProvider>
        </AuthWrapper>
    </AuthProvider>
);
