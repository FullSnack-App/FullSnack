import './App.css';
import ScrollToTop from './components/ScrollToTop';
import { routes } from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            {routes}
        </BrowserRouter>
    );
}

export default App;
