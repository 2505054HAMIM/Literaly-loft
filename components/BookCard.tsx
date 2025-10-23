import React, { useState } from 'react';
import { Book } from '../types';
import { StarIcon, CheckIcon } from './icons/Icons';

interface BookCardProps {
    book: Book;
    onAddToCart: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCartClick = () => {
        onAddToCart(book);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 1500);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
            <div className="relative">
                <img 
                    src={book.coverImage} 
                    alt={`Cover of ${book.title}`}
                    className="w-full h-64 object-cover" 
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <StarIcon />
                    <span>{book.rating.toFixed(1)}</span>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-sans font-bold text-gray-800 truncate">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <div className="mt-auto flex justify-between items-center pt-2">
                    <p className="text-lg font-sans font-bold text-primary">${book.price.toFixed(2)}</p>
                    <button 
                        onClick={handleAddToCartClick}
                        disabled={isAdded}
                        className={`px-4 py-1.5 rounded-full text-sm font-sans transition-all duration-300 w-28 text-center ${
                            isAdded
                                ? 'bg-green-500 text-white cursor-default'
                                : 'bg-accent text-white hover:bg-opacity-90'
                        }`}
                    >
                        {isAdded ? (
                            <span className="flex items-center justify-center gap-1">
                                <CheckIcon />
                                Added!
                            </span>
                        ) : (
                            'Add to Cart'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;