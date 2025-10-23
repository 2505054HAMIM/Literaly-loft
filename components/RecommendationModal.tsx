import React, { useState } from 'react';
import { Book } from '../types';
import BookCard from './BookCard';
import { SparklesIcon, CloseIcon } from './icons/Icons';

interface RecommendationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGetRecommendations: (interests: string) => Promise<void>;
    recommendedBooks: Book[];
    isLoading: boolean;
    error: string | null;
    onAddToCart: (book: Book) => void;
}

const RecommendationModal: React.FC<RecommendationModalProps> = ({ isOpen, onClose, onGetRecommendations, recommendedBooks, isLoading, error, onAddToCart }) => {
    const [interests, setInterests] = useState('');

    if (!isOpen) return null;
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (interests.trim()) {
            onGetRecommendations(interests);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-background rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative flex flex-col gap-6"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors">
                    <CloseIcon />
                </button>
                
                <div className="text-center">
                    <h2 className="text-3xl font-sans text-primary">AI-Powered Recommendations</h2>
                    <p className="text-gray-600 mt-2">Tell us what you love to read, and we'll find your next favorite book!</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <textarea
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        placeholder="e.g., I enjoy fast-paced fantasy novels with complex magic systems, strong female protagonists, and a touch of romance. I'm a big fan of authors like Sarah J. Maas and Brandon Sanderson."
                        className="w-full p-4 border border-secondary rounded-lg bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-shadow min-h-[120px]"
                        rows={4}
                        disabled={isLoading}
                    />
                    <button 
                        type="submit"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto mx-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isLoading || !interests.trim()}
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                               <span>Finding Your Books...</span>
                            </>
                        ) : (
                            <>
                               <SparklesIcon />
                               <span>Get Recommendations</span>
                            </>
                        )}
                    </button>
                </form>

                {error && <div className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</div>}

                {recommendedBooks.length > 0 && !isLoading && (
                     <div className="border-t pt-6 mt-4">
                        <h3 className="text-2xl font-sans text-accent text-center mb-6">Here are some books you might enjoy:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedBooks.map(book => <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationModal;