import React, { useEffect, useState, useRef } from "react";
import "./Inventory.css";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    fetch("http://localhost:5000/inventory")
      .then((res) => res.json())
      .then((data) => setInventoryItems(data))
      .catch((err) => console.error(err));
  }, []);

  // Group items by category
  const groupedItems = inventoryItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Add entrance animation after items load
  useEffect(() => {
    if (inventoryItems.length > 0) {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(50px)';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.classList.add('animate-in');
          }, index * 150);
        }
      });
    }
  }, [inventoryItems]);

  // Handle card interactions
  const handleCardMouseMove = (e, cardElement) => {
    const rect = cardElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rotateX = (mouseY - centerY) / 15;
    const rotateY = (centerX - mouseX) / 15;
    
    cardElement.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleCardMouseLeave = (cardElement) => {
    cardElement.style.transform = '';
  };

  const handleCardClick = (e, cardElement) => {
    const ripple = document.createElement('div');
    const rect = cardElement.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.className = 'ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    cardElement.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <>
      <Navbar/>
      <div className="inventorypage ">
        <h1 className="inventory-heading">Inventory</h1>
        {Object.keys(groupedItems).map((category, categoryIndex) => (
          <div key={categoryIndex} className="category-section">
            {/* Category Heading */}
            <h1 className="category-title">{category}</h1>

            {/* Inventory Cards under this category */}
            <div className="mainbox">
              {groupedItems[category].map((item, idx) => {
                const globalIndex = Object.keys(groupedItems)
                  .slice(0, categoryIndex)
                  .reduce((sum, cat) => sum + groupedItems[cat].length, 0) + idx;
                
                return (
                  <div 
                    className="inventorycard" 
                    key={idx}
                    ref={el => cardRefs.current[globalIndex] = el}
                    onMouseMove={(e) => handleCardMouseMove(e, cardRefs.current[globalIndex])}
                    onMouseLeave={() => handleCardMouseLeave(cardRefs.current[globalIndex])}
                    onClick={(e) => handleCardClick(e, cardRefs.current[globalIndex])}
                    style={{
                      transition: 'opacity 0.6s ease, transform 0.3s ease'
                    }}
                  >
                    <div className="inventorybox">
                      <div className="imagebox">
                        <img src={item.image.url} alt={item.name} />
                      </div>
                      <div className="inventcontentbox">
                        <h2>{item.name}</h2>
                        <h3>{item.category}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}