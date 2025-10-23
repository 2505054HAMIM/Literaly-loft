import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
    cart: CartItem[];
    onPlaceOrder: () => void;
    onBackToStore: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onPlaceOrder, onBackToStore }) => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({...prevState, [name]: value}));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd validate and process payment here
        onPlaceOrder();
    };
    
    const subtotal = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
    const tax = subtotal * 0.07; // Example tax rate
    const total = subtotal + tax;

    return (
        <div className="bg-background min-h-screen">
            <header className="bg-white/80 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
                     <h1 className="text-3xl font-sans font-bold text-primary tracking-wider">
                        Checkout
                    </h1>
                    <button onClick={onBackToStore} className="text-sm text-primary hover:underline">
                        &larr; Back to Store
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-lg shadow-sm order-last lg:order-first">
                        <h2 className="text-2xl font-sans text-accent mb-6 border-b pb-4">Order Summary</h2>
                        <ul className="space-y-4 mb-6">
                            {cart.map(item => (
                                <li key={item.book.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <img src={item.book.coverImage} alt={item.book.title} className="w-12 h-[72px] object-cover rounded" />
                                        <div>
                                            <p className="font-bold text-gray-800">{item.book.title} <span className="text-sm font-normal text-gray-500">x{item.quantity}</span></p>
                                            <p className="text-sm text-gray-500">{item.book.author}</p>
                                        </div>
                                    </div>
                                    <p className="font-sans font-semibold">${(item.book.price * item.quantity).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>${subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Taxes</p>
                                <p>${tax.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between font-bold text-lg text-accent font-sans">
                                <p>Total</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    {/* Payment Form */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-sans text-accent mb-6 border-b pb-4">Payment Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" name="name" id="name" required onChange={handleInputChange} className="mt-1 block w-full border-secondary rounded-md shadow-sm py-2 px-3 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" name="email" id="email" required onChange={handleInputChange} className="mt-1 block w-full border-secondary rounded-md shadow-sm py-2 px-3 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"/>
                            </div>
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                                <input type="text" name="cardNumber" id="cardNumber" placeholder="•••• •••• •••• ••••" required onChange={handleInputChange} className="mt-1 block w-full border-secondary rounded-md shadow-sm py-2 px-3 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"/>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                    <input type="text" name="expiry" id="expiry" placeholder="MM / YY" required onChange={handleInputChange} className="mt-1 block w-full border-secondary rounded-md shadow-sm py-2 px-3 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"/>
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                                    <input type="text" name="cvc" id="cvc" placeholder="•••" required onChange={handleInputChange} className="mt-1 block w-full border-secondary rounded-md shadow-sm py-2 px-3 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"/>
                                </div>
                            </div>
                            <button type="submit" className="w-full mt-4 py-3 bg-primary text-white rounded-full font-sans font-bold text-lg hover:bg-opacity-90 transition-colors">
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;