import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const useAuthForm = (closeAuth) => {
    const [activeCategory, setActiveCategory] = useState('login');
    const [localError, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        repeatPassword: '',
        age: '',
        phone: '',
    });

    const { login, register, isLoading, error } = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            email: '',
            password: '',
            fullName: '',
            repeatPassword: '',
            gender: '',
            age: '',
            phone: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (activeCategory === 'login') {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                closeAuth();
                resetForm();
            }
        } else {
            // Register
            if (formData.password !== formData.repeatPassword) {
                setError("Passwords don't match");
                return;
            }

            const userData = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                repeat_password: formData.repeatPassword,
                gender: formData.gender,
                age: parseInt(formData.age),
                phone: formData.phone,
            };

            const result = await register(userData);

            if (result.success) {
                closeAuth();
                resetForm();
            } else {
                // The error will be automatically set in the state by the register function
                console.error("Registration failed:", result.error);
            }
        }
    };

    return {
        activeCategory,
        setActiveCategory,
        formData,
        handleInputChange,
        handleSubmit,
        isLoading,
        error: localError || error,  // Show local validation errors or backend errors
    };
};
