import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, DownloadIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Correct import
import { Link, useParams } from 'react-router';
import apiClient from '../../config/axiosConfig';

const OrderSuccess = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await apiClient.get(`/orders/${orderId}`);
                setOrder(response.data.order);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    const handleDownloadPDF = () => {
        if (!order) return;

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'pt',
            format: 'a4',
        });

        // 🎨 Brand colors
        const orange = [234, 88, 12]; // Tailwind orange-600
        const grayText = [75, 85, 99]; // Tailwind gray-600
        const lightGray = [249, 250, 251]; // Tailwind gray-50 background

        // 🧡 Header
        doc.setFillColor(...orange);
        doc.rect(0, 0, doc.internal.pageSize.width, 90, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(26);
        doc.setTextColor(255, 255, 255);
        doc.text('FullSnack Restaurant', 40, 55);
        doc.setFontSize(13);
        doc.text('Order Invoice', 40, 75);

        // 📦 Invoice Container Background
        doc.setFillColor(...lightGray);
        doc.roundedRect(40, 110, 520, 630, 10, 10, 'F');

        // 🧾 Order Info Box
        doc.setFontSize(11);
        doc.setTextColor(...grayText);
        const startY = 140;
        const lineSpacing = 18;
        doc.text(`Order ID: ${order._id}`, 60, startY);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 60, startY + lineSpacing);
        doc.text(`Customer: ${order.customerFullName}`, 60, startY + lineSpacing * 2);
        doc.text(`Email: ${order.customerEmail}`, 60, startY + lineSpacing * 3);
        doc.text(`Payment Method: ${order.paymentMethod}`, 60, startY + lineSpacing * 4);
        doc.text(`Status: ${order.status}`, 60, startY + lineSpacing * 5);

        // 🪶 Items Table
        const tableY = startY + lineSpacing * 6 + 10;
        const tableRows = order.items.map((item) => [
            item.menuItem?.name || 'Item',
            item.quantity,
            `$${item.menuItem?.price?.toFixed(2) || '--'}`,
            `$${(item.menuItem?.price * item.quantity).toFixed(2)}`,
        ]);

        autoTable(doc, {
            startY: tableY,
            head: [['Item', 'Qty', 'Price', 'Subtotal']],
            body: tableRows,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 6,
                textColor: [55, 65, 81],
                lineColor: [229, 231, 235],
                valign: 'middle',
            },
            headStyles: {
                fillColor: orange,
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center',
            },
            alternateRowStyles: { fillColor: [255, 249, 244] },
            margin: { left: 55, right: 55 },
        });

        // 💵 Totals Section
        const afterTableY = doc.lastAutoTable.finalY + 20;
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...orange);
        doc.text(`Total Amount: $${order.totalAmount.toFixed(2)}`, 55, afterTableY);

        // 🚚 Delivery Details Box
        const boxY = afterTableY + 20;
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(55, boxY, 480, 80, 8, 8, 'F');
        doc.setTextColor(...orange);
        doc.text('Delivery Details', 70, boxY + 20);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...grayText);
        doc.text(`Address: ${order.deliveryAddress}`, 70, boxY + 40);
        doc.text(`Phone: ${order.phoneNumber}`, 70, boxY + 60);

        // 💬 Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setDrawColor(...orange);
        doc.line(40, pageHeight - 50, 555, pageHeight - 50);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Thank you for your purchase! FullSnack Restaurant', 40, pageHeight - 30);

        // 💾 Save file
        doc.save(`FullSnack_Invoice_${order._id}.pdf`);
    };



    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-lg text-gray-600 dark:text-gray-400">
                Loading your order details...
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-gray-700 dark:text-gray-300">
                <p>Unable to find your order 😕</p>
                <Link to="/" className="btn mt-4 bg-orange-600 hover:bg-orange-500 text-white">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 text-center max-w-3xl w-full">
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Order Placed Successfully!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Thank you for your purchase,{' '}
                    <span className="font-semibold">{order.customerFullName}</span>!
                    <br />A confirmation email has been sent to{' '}
                    <span className="font-semibold">{order.customerEmail}</span>.
                </p>

                {/* 🧾 Invoice Card */}
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-left shadow-sm mb-6">
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-medium text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Order ID:</span> {order._id}
                            </p>
                            <p className="font-medium text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Date:</span>{' '}
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-orange-600 font-semibold capitalize">
                                {order.paymentMethod} - {order.status}
                            </p>
                            <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                ${order.totalAmount.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <hr className="my-3" />

                    {/* Items List */}
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-orange-50 dark:bg-orange-900/20 text-gray-700 dark:text-gray-300">
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td>{item.menuItem?.name || 'Item'}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.menuItem?.price?.toFixed(2) || '--'}</td>
                                        <td>
                                            ${(item.menuItem?.price * item.quantity).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <hr className="my-4" />

                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-orange-600 mb-2">
                            Delivery Details
                        </h3>
                        <p>
                            <span className="font-medium">Address:</span> {order.deliveryAddress}
                        </p>
                        <p>
                            <span className="font-medium">Phone:</span> {order.phoneNumber}
                        </p>
                    </div>
                </div>

                {/* 🔘 Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={handleDownloadPDF}
                        className="btn btn-outline btn-success w-full sm:w-1/2 flex items-center justify-center gap-2"
                    >
                        <DownloadIcon className="w-5 h-5" />
                        Download Invoice
                    </button>
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

export default OrderSuccess;
