import React from 'react';
import Link from 'next/link';
import Footer from './Footer';
import Navigation from './Navigation';

interface BaseLayoutProps {
    children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
    return (
        <div>
            <Navigation />

            <main className="bg-white">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BaseLayout;