import Input from '../Input';
import Button from '../Button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdError } from 'react-icons/md';

const RegisterForm = ({ formData, handleInputChange, isLoading, error, onSwitchToLogin }) => {
    return (
        <>
            <Input
                label="Full Name"
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe Smith"
                required
            />

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

            <div className="grid grid-cols-2 gap-4">
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
                <Input
                    label="Repeat Password"
                    type="password"
                    id="repeatPassword"
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Phone"
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    required
                />

                <Input
                    label="Age"
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="25"
                    required
                    min="1"
                    max="120"
                />
            </div>

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
                        Creating account...
                    </span>
                ) : (
                    'Register'
                )}
            </Button>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-3">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-primary hover:text-primary font-semibold"
                    >
                        Login
                    </button>
                </p>
            </div>
        </>
    );
};

export default RegisterForm;
