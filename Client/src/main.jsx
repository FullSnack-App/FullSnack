import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { OffersProvider } from './context/offersProvider';
import { Toaster } from 'react-hot-toast';
import { MenuProvider } from './context/menuProvider';
import AuthWrapper from './components/AuthWrapper';

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
