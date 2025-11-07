import { MdCheckCircle } from 'react-icons/md';

const AuthModalBranding = () => {
    const features = ['Fresh & Quality Ingredients', 'Fast Delivery', 'Exclusive Offers'];

    return (
        <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-primary via-primary to-primary-700 relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 flex flex-col justify-center items-center p-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">Welcome to FullSnack</h1>
                    <p className="text-lg text-white">
                        Discover amazing food and delicious meals delivered to your doorstep
                    </p>
                </div>
                <div className="space-y-4 text-white">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                <MdCheckCircle className="w-6 h-6" />
                            </div>
                            <span className="text-lg">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
    );
};

export default AuthModalBranding;
