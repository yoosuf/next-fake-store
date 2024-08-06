import React from 'react';



const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contact us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="mailto:hello@gmail.com" className="hover:underline">Email </a>
                                </li>
                                <li>
                                    <a href="tel:0776002116" className="hover:underline">Phone</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">About us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="/story" className="hover:underline ">Our story</a>
                                </li>
                                <li>
                                    <a href="/careers" className="hover:underline">Careers</a>
                                </li>
                            </ul>
                        </div>

                            &copy; 2024, Your company all rights reserved.
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;