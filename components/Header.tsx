
import React from 'react';
import { SparklesIcon, SearchIcon, ShoppingCartIcon } from './icons/Icons';

interface HeaderProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onRecommendClick: () => void;
    cartCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onRecommendClick, cartCount, onCartClick }) => {
    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="text-3xl font-sans font-bold text-primary tracking-wider">
                        Literary Loft
                    </div>
                    <div className="flex-1 flex justify-center px-2 sm:px-8">
                         <div className="relative w-full max-w-lg">
                            <input
                                type="text"
                                placeholder="Search by title or author..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-secondary rounded-full bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <SearchIcon />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={onRecommendClick}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                            <SparklesIcon />
                            <span className="font-sans text-sm font-medium hidden md:inline">AI Recommends</span>
                        </button>
                        <button 
                            onClick={onCartClick}
                            className="relative p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-secondary"
                            aria-label={`Shopping cart with ${cartCount} items`}
                        >
                            <ShoppingCartIcon />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
