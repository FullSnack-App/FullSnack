import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function MainLayout() {
    return (
        <>
            <Navbar />
            <main className="pt-16">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
