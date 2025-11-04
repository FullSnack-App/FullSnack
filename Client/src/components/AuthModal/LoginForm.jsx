import Input from '../Input';
import Button from '../Button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdError } from 'react-icons/md';

const LoginForm = ({ formData, handleInputChange, isLoading, error, onSwitchToRegister }) => {
    return (
        <>
            <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
            />

            <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
            />

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                    <MdError className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <span className="flex items-center justify-center">
                        <AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                        Logging in...
                    </span>
                ) : (
                    'Login'
                )}
            </Button>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-3">
                <button
                    type="button"
                    className="text-sm text-primary hover:text-primary font-medium block w-full"
                >
                    Forgot password?
                </button>
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="text-primary hover:text-primary font-semibold"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </>
    );
};

export default LoginForm;
