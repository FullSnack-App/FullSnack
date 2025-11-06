import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { OffersProvider } from './context/offersProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { MenuProvider } from './context/menuProvider.jsx';
import AuthWrapper from './components/AuthWrapper.jsx';

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <AuthWrapper>
            <MenuProvider>
                <OffersProvider>
                    <Toaster />
                    <App />
                </OffersProvider>
            </MenuProvider>
        </AuthWrapper>
    </AuthProvider>
);
