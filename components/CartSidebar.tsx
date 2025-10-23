import React from 'react';
import { CartItem } from '../types';
import { CloseIcon, TrashIcon } from './icons/Icons';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    onRemoveFromCart: (bookId: number) => void;
    onUpdateQuantity: (bookId: number, newQuantity: number) => void;
    onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onRemoveFromCart, onUpdateQuantity, onCheckout }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>
            <div 
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-heading"
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 id="cart-heading" className="text-2xl font-sans text-primary">Shopping Cart</h2>
                        <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-secondary hover:text-black transition-colors">
                            <CloseIcon />
                            <span className="sr-only">Close cart</span>
                        </button>
                    </div>

                    {cart.length > 0 ? (
                        <div className="flex-1 overflow-y-auto p-6">
                            <ul className="space-y-4">
                                {cart.map(item => (
                                    <li key={item.book.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                                        <img src={item.book.coverImage} alt={item.book.title} className="w-16 h-24 object-cover rounded-md flex-shrink-0" />
                                        <div className="flex-1">
                                            <h3 className="font-sans font-bold text-gray-800 leading-tight">{item.book.title}</h3>
                                            <p className="text-sm text-gray-500">{item.book.author}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.book.id, item.quantity - 1)}
                                                    className="w-6 h-6 border rounded-full flex items-center justify-center text-lg text-gray-600 hover:bg-secondary transition-colors"
                                                    aria-label={`Decrease quantity of ${item.book.title}`}
                                                >-</button>
                                                <span className="w-8 text-center font-bold" aria-label={`Current quantity ${item.quantity}`}>{item.quantity}</span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.book.id, item.quantity + 1)}
                                                    className="w-6 h-6 border rounded-full flex items-center justify-center text-lg text-gray-600 hover:bg-secondary transition-colors"
                                                    aria-label={`Increase quantity of ${item.book.title}`}
                                                >+</button>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end justify-between self-stretch">
                                            <p className="text-md font-sans font-bold text-primary">${(item.book.price * item.quantity).toFixed(2)}</p>
                                            <button
                                                onClick={() => onRemoveFromCart(item.book.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors mt-2"
                                            >
                                                <TrashIcon />
                                                <span className="sr-only">Remove {item.book.title} from cart</span>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                            <p className="text-gray-500 text-lg">Your cart is empty.</p>
                            <p className="text-sm text-gray-400 mt-2">Find your next great read!</p>
                        </div>
                    )}

                    <div className="p-6 border-t bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-sans text-gray-600">Subtotal</span>
                            <span className="text-2xl font-sans font-bold text-accent">${subtotal.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={onCheckout}
                            disabled={cart.length === 0}
                            className="w-full py-3 bg-primary text-white rounded-full font-sans font-bold text-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartSidebar;