import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import apiClient from '../../config/axiosConfig';

const ConfirmEmail = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
    const [message, setMessage] = useState('');

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const res = await apiClient.get(
                    `/user/confirm-email/${userId}`
                );
                if (res.data?.accessToken) {
                    setStatus('success');
                    setMessage(res.data.message);
                    toast.success('Email confirmed successfully!');
                    localStorage.setItem('token', res.data.accessToken);

                    // Redirect after 3s
                    setTimeout(() => navigate('/'), 3000);
                } else {
                    setStatus('error');
                    setMessage(res.data?.err_msg || 'Failed to confirm email');
                }
            } catch (err) {
                setStatus('error');
                setMessage(err.response?.data?.err_msg || 'Something went wrong');
            }
        };

        confirmEmail();
    }, [userId, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            {status === 'loading' && (
                <div className="text-lg font-medium dark:text-gray-200">Confirming your email...</div>
            )}

            {status === 'success' && (
                <div className="flex flex-col items-center gap-3">
                    <CheckCircleIcon className="w-16 h-16 text-green-500" />
                    <h1 className="text-2xl font-semibold dark:text-gray-100">{message}</h1>
                    <p className="text-gray-500 dark:text-gray-400">Redirecting to home page...</p>
                </div>
            )}

            {status === 'error' && (
                <div className="flex flex-col items-center gap-3">
                    <XCircleIcon className="w-16 h-16 text-red-500" />
                    <h1 className="text-2xl font-semibold dark:text-gray-100">Verification failed</h1>
                    <p className="text-gray-500 dark:text-gray-400">{message}</p>
                </div>
            )}
        </div>
    );
};

export default ConfirmEmail;
