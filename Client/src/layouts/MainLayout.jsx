import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
export default function MainLayout() {
    return (
        <>
            <Toaster></Toaster>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
