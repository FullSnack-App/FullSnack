import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdEmail, MdPhone } from 'react-icons/md';

export default function Footer() {
    return (
        <footer className="bg-[#0E1626] text-gray-300 px-8 md:px-20 py-12">
            <div className="">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-[#FF5722] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
                            F
                        </div>
                        <h2 className="text-white text-xl font-semibold">FullSnack</h2>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Delivering happiness one meal at a time. Fresh ingredients, amazing flavors.
                    </p>
                    <div className="flex gap-4 text-gray-400">
                        <a href="#" className="hover:text-[#FF5722] transition">
                            <FaFacebookF size={18} />
                        </a>
                        <a href="#" className="hover:text-[#FF5722] transition">
                            <FaInstagram size={18} />
                        </a>
                        <a href="#" className="hover:text-[#FF5722] transition">
                            <FaTwitter size={18} />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>
                            <a href="#" className="hover:text-[#FF5722]">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-[#FF5722]">
                                Menu
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-[#FF5722]">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Contact</h3>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li className="flex items-start gap-2">
                            <FaLocationDot className="text-[#FF5722] mt-1" />
                            <span>17 El-sadat street El-marg</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <MdPhone className="text-[#FF5722]" />
                            <span>0111111111</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <MdEmail className="text-[#FF5722]" />
                            <span>FullSnack@tastehub.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-gray-500 text-sm pt-6">
                © 2025 TasteHub. All rights reserved.
            </div>
        </footer>
    );
}
