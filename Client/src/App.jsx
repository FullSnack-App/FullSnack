import './App.css';
import Menu from './pages/Home/components/menu';
import Footer from './components/Footer';
import HeroSection from './pages/Home/components/HeroSection';

function App() {
    return (
        // <button class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
        //   Button
        // </button>
        <>
            <HeroSection />
            <Menu></Menu>
            <Footer></Footer>
        </>
    );
}

export default App;
