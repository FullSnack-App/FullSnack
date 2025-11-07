import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function MainLayout() {
    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-592px)]">
                <Outlet/>
            </main>
            <Footer />
        </>
    );
}
