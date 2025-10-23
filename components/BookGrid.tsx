import React from 'react';
import { Book } from '../types';
import BookCard from './BookCard';

interface BookGridProps {
    books: Book[];
    onAddToCart: (book: Book) => void;
}

const BookGrid: React.FC<BookGridProps> = ({ books, onAddToCart }) => {
    if (books.length === 0) {
        return <div className="text-center py-10 text-gray-500">
            <h2 className="text-2xl font-sans">No books found.</h2>
            <p className="mt-2">Try adjusting your search or filter.</p>
        </div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map(book => (
                <BookCard 
                    key={book.id} 
                    book={book} 
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
};

export default BookGrid;