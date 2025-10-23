import React, { useState, useMemo } from 'react';
import { Book, CartItem } from './types';
import { BOOKS, GENRES } from './constants';
import Header from './components/Header';
import BookGrid from './components/BookGrid';
import GenreFilter from './components/GenreFilter';
import RecommendationModal from './components/RecommendationModal';
import CartSidebar from './components/CartSidebar';
import Checkout from './components/Checkout';
import { getPersonalizedRecommendations } from './services/geminiService';

const App: React.FC = () => {
    // Search and filter state
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    
    // UI state
    const [currentView, setCurrentView] = useState<'store' | 'checkout'>('store');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

    // Recommendation state
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
    const [isRecommendationLoading, setIsRecommendationLoading] = useState<boolean>(false);
    const [recommendationError, setRecommendationError] = useState<string | null>(null);

    // Cart state
    const [cart, setCart] = useState<CartItem[]>([]);

    const filteredBooks = useMemo(() => {
        return BOOKS.filter(book => {
            const matchesSearch = 
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
            return matchesSearch && matchesGenre;
        });
    }, [searchTerm, selectedGenre]);

    const cartCount = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

    const handleGetRecommendations = async (interests: string) => {
        setIsRecommendationLoading(true);
        setRecommendationError(null);
        setRecommendedBooks([]);
        try {
            const bookIds = await getPersonalizedRecommendations(interests, BOOKS);
            const recommendations = BOOKS.filter(book => bookIds.includes(book.id));
            setRecommendedBooks(recommendations);
        } catch (error) {
            console.error('Failed to get recommendations:', error);
            setRecommendationError('Sorry, we couldn\'t fetch recommendations at this time. Please try again.');
        } finally {
            setIsRecommendationLoading(false);
        }
    };
    
    // Cart handlers
    const handleAddToCart = (bookToAdd: Book) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.book.id === bookToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.book.id === bookToAdd.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { book: bookToAdd, quantity: 1 }];
            }
        });
    };
    
    const handleRemoveFromCart = (bookIdToRemove: number) => {
        setCart(prevCart => prevCart.filter(item => item.book.id !== bookIdToRemove));
    };

    const handleUpdateCartQuantity = (bookId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(bookId);
        } else {
            setCart(prevCart => prevCart.map(item => 
                item.book.id === bookId 
                    ? { ...item, quantity: newQuantity } 
                    : item
            ));
        }
    };

    const handleCheckout = () => {
        if (cart.length > 0) {
            setIsCartOpen(false);
            setCurrentView('checkout');
        }
    };

    const handlePlaceOrder = () => {
        alert('Thank you for your order! Your e-books are on their way.');
        setCart([]);
        setCurrentView('store');
    };
    
    if (currentView === 'checkout') {
        return <Checkout 
                    cart={cart} 
                    onPlaceOrder={handlePlaceOrder} 
                    onBackToStore={() => setCurrentView('store')}
                />;
    }

    return (
        <div className="bg-background min-h-screen font-serif text-text">
            <Header 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                onRecommendClick={() => setIsModalOpen(true)}
                cartCount={cartCount}
                onCartClick={() => setIsCartOpen(true)}
            />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/4 lg:w-1/5">
                        <GenreFilter 
                            genres={GENRES} 
                            selectedGenre={selectedGenre} 
                            onSelectGenre={setSelectedGenre}
                        />
                    </aside>
                    <section className="w-full md:w-3/4 lg:w-4/5">
                        <BookGrid 
                            books={filteredBooks} 
                            onAddToCart={handleAddToCart}
                        />
                    </section>
                </div>
            </main>
            <RecommendationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onGetRecommendations={handleGetRecommendations}
                recommendedBooks={recommendedBooks}
                isLoading={isRecommendationLoading}
                error={recommendationError}
                onAddToCart={handleAddToCart}
            />
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateCartQuantity}
                onCheckout={handleCheckout}
            />
        </div>
    );
};

export default App;