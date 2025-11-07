import './App.css';
import ScrollToTop from './components/ScrollToTop';
import { appRoutes } from './router/AppRouter';
import { BrowserRouter } from 'react-router';
import { adminRoutes } from './router/AdminRouter';
import { useAuth } from './hooks/useAuth';
function App() {
    const { user } = useAuth();
    const routes = user?.user?.role === 'admin' ? adminRoutes : appRoutes;
    return (
        <BrowserRouter>
            <ScrollToTop />
            {routes}
        </BrowserRouter>
    );
}

export default App;
