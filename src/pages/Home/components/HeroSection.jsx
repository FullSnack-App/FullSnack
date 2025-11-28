import image1 from '../../../Chef.jfif';

export default function HeroSection() {
    const scrollToMenu = () => {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="shadow-sm bg-[#FFF8EE] dark:bg-gray-800 px-8 md:px-16 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                <div className="order-2 md:order-1 space-y-5 text-center md:text-left">
                    <p className="inline-block bg-[#FFF0E0] dark:bg-gray-700 text-[#FF5722] dark:text-orange-400 px-4 py-2 rounded-full font-medium text-sm shadow-sm">
                        Free Delivery on Orders Over $35
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                        Delicious Food <br />
                        <span className="text-[#FF5722] dark:text-orange-400">Delivered to You</span>
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-md mx-auto md:mx-0">
                        Experience the finest cuisine from local restaurants. Fresh ingredients,
                        amazing flavors, fast delivery.
                    </p>

                    <button
                        onClick={scrollToMenu}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                    >
                        Explore our Menu
                    </button>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                    <img
                        src={image1}
                        alt="Chef"
                        className="w-[80%] md:w-full lg:w-full rounded-3xl shadow-lg object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
