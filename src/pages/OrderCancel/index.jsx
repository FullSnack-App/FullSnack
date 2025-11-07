import React from 'react';
import { XCircleIcon } from 'lucide-react';
import { Link } from 'react-router';

const OrderCancel = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
                <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
                <p className="text-gray-600 mb-6">
                    Your payment was not completed or was canceled. Don’t worry — your order has not
                    been placed.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {/* <Link to="/cart" className="btn btn-outline btn-error w-full sm:w-1/2">
                        Return to Cart
                    </Link> */}
                    <Link
                        to="/"
                        className="btn bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-1/2"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderCancel;
