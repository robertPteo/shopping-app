import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  // State để kiểm soát việc hiển thị trang Landing hay trang Sản phẩm
  const [showProductList, setShowProductList] = useState(false);

  // Hàm xử lý khi nhấn nút "Get Started"
  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {/* Hiển thị Landing Page nếu showProductList là false */}
      {!showProductList ? (
        <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome To Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Greenery Meets Serenity</p>
              
              <button className="get-started-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
            
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        /* Hiển thị danh sách sản phẩm khi showProductList là true */
        <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
          <ProductList />
        </div>
      )}
    </div>
  );
}

export default App;
