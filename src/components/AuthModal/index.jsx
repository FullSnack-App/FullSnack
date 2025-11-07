import { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import TogglerGroup from '../TogglerGroup';
import AuthModalBranding from './AuthModalBranding';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuthForm } from './useAuthForm';

const AuthModal = ({ isOpen, closeAuth }) => {
    const {
        activeCategory,
        setActiveCategory,
        formData,
        handleInputChange,
        handleSubmit,
        isLoading,
        error,
    } = useAuthForm(closeAuth);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 overflow-hidden">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={closeAuth}
            />

            <div
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl transform transition-all overflow-hidden flex h-[70vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <AuthModalBranding />

                <div className="w-full md:w-1/2 flex flex-col max-h-[90vh]">
                    <div className="flex items-center justify-between p-6 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {activeCategory === 'login' ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <button
                            onClick={closeAuth}
                            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                            aria-label="Close modal"
                        >
                            <MdClose className="w-6 h-6" />
                        </button>
                    </div>
<hr className='w-100 text-primary m-auto'></hr>
                    <TogglerGroup
                    className='m-auto p-4'
                        activeCategory={activeCategory}
                        categories={['login', 'Register']}
                        onchange={setActiveCategory}
                    />

                    <div className="flex-1 overflow-y-auto p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {activeCategory === 'login' ? (
                                <LoginForm
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    isLoading={isLoading}
                                    error={error}
                                    onSwitchToRegister={() => setActiveCategory('Register')}
                                />
                            ) : (
                                <RegisterForm
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    isLoading={isLoading}
                                    error={error}
                                    onSwitchToLogin={() => setActiveCategory('login')}
                                />
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
