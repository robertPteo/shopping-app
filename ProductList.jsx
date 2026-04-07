import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
    // State to toggle between Product view and Cart view
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    
    // Get cart items from Redux store to calculate total quantity for the icon
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Mock data for plants categorized by type
    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://pixabay.com", cost: "$15" },
                { name: "Spider Plant", image: "https://pixabay.com", cost: "$12" }
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "https://unsplash.com", cost: "$20" },
                { name: "Rosemary", image: "https://unsplash.com", cost: "$15" }
            ]
        }
    ];

    // Navigation handler to show the Cart component
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    // Dispatcher to add a selected plant to the Redux store
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div>
            {/* Navbar Section with Logo and Cart Icon */}
            <div className="navbar">
                <div className="navbar-logo">Paradise Nursery</div>
                <div className="navbar-links">
                    <a href="#" onClick={() => setShowCart(false)}>Plants</a>
                    <a href="#" onClick={handleCartClick} className="cart-icon">
                        <svg xmlns="http://w3.org" viewBox="0 0 256 256" height="68" width="68">
                            <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.3A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeWidth="2"></path>
                        </svg>
                        <span className="cart-quantity-count">{totalQuantity}</span>
                    </a>
                </div>
            </div>

            {/* Conditional Rendering: Show CartItem component or Product Grid */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2 className="category-title">{category.category}</h2>
                            <div className="product-list">
                                {category.plants.map((plant, idx) => (
                                    <div className="product-card" key={idx}>
                                        <img src={plant.image} alt={plant.name} className="product-image" />
                                        <h3 className="product-name">{plant.name}</h3>
                                        <p className="product-cost">{plant.cost}</p>
                                        <button 
                                            className="add-to-cart-button" 
                                            onClick={() => handleAddToCart(plant)}
                                            /* Disable button if item is already in cart */
                                            disabled={cartItems.some(item => item.name === plant.name)}
                                        >
                                            {cartItems.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Pass function to CartItem to allow returning to the store */
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
