import React, { useEffect, useState, useMemo } from "react";
import "./Inventory.css";
import Footer from "../components/footer";
import InventoryCard from "../components/InventoryCard";
import ParticleText from "../components/ParticleText";

const DEV_DUMMY_INVENTORY = [
  {
    _id: "test-inv-1",
    name: "3D Printer - Ultimaker S5 (Test Item)",
    category: "Prototyping & Printing",
    description: "High-precision dual-extrusion 3D printer for industrial composite materials, complex prototypes, and PLA/ABS models.",
    image: { url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" },
  }
];

// Phones and narrow windows get a lighter particle title: the glow is the most
// expensive part to draw, and touch screens have no hover to show it off
const lightTitle =
  typeof window !== "undefined" &&
  window.matchMedia?.("(pointer: coarse), (max-width: 767px)").matches;

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => {
        const isDev = process.env.NODE_ENV !== 'production';
        if (Array.isArray(data) && data.length > 0) {
          setInventoryItems(isDev ? [...data, ...DEV_DUMMY_INVENTORY] : data);
        } else if (isDev) {
          setInventoryItems(DEV_DUMMY_INVENTORY);
        } else {
          setInventoryItems([]);
        }
      })
      .catch((err) => {
        console.error(err);
        if (process.env.NODE_ENV !== 'production') {
          setInventoryItems(DEV_DUMMY_INVENTORY);
        }
      });
  }, []);

  // Extract unique categories for filter buttons
  const categories = useMemo(() => {
    const cats = [...new Set(inventoryItems.map((item) => item.category))];
    return ["All", ...cats];
  }, [inventoryItems]);

  // Filter items based on search query and selected category
  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return inventoryItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [inventoryItems, searchQuery, selectedCategory]);

  // Group filtered items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Get current category keys
  const keys = Object.keys(groupedItems);

  // Reorder: put index 1 and 2 first, then the rest
  let reorderedKeys = [];
  if (keys.length > 2) {
    reorderedKeys = [keys[1], keys[2], keys[0], ...keys.slice(3)];
  } else {
    reorderedKeys = keys;
  }

  // Build new ordered object
  const orderedGroupedItems = {};
  reorderedKeys.forEach((k) => {
    orderedGroupedItems[k] = groupedItems[k];
  });

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <>
      <div className="inventorypage ">
        {/* Real heading for screen readers; the particle version is decorative */}
        <h1 className="sr-only">Inventory</h1>
        <div className="inventory-title" aria-hidden="true">
          <ParticleText
            text="INVENTORY"
            color="#facc15"
            highlightColor="#ffffff"
            highlightMode="motion"
            particleSize={2}
            density={lightTitle ? 5 : 4}
            shape="circle"
            intro="gather"
            scatter={180}
            gatherDuration={1600}
            stagger={420}
            clickBurst
            burstStrength={1}
            pointerRepel={40}
            repelRadius={120}
            idleDrift={0}
            trigger="hover"
            fontSize="clamp(2.5rem, 9vw, 6rem)"
            fontWeight={800}
            fontFamily="inherit"
            glow={!lightTitle}
          />
        </div>

        {/* Search & Filter Section */}
        <div className="inventory-search-section">
          <div className="inventory-search-wrapper">
            <svg
              className="inventory-search-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="inventory-search-input"
              placeholder="Search tools by name, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="inventory-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="inventory-category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`inventory-category-btn ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          {(searchQuery || selectedCategory !== "All") && (
            <div className="inventory-results-info">
              <span>
                Showing {filteredItems.length} of {inventoryItems.length} items
              </span>
              <button
                className="inventory-clear-filters"
                onClick={handleClearSearch}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* No Results State */}
        {filteredItems.length === 0 && inventoryItems.length > 0 && (
          <div className="inventory-no-results">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="8" x2="14" y2="14" />
              <line x1="14" y1="8" x2="8" y2="14" />
            </svg>
            <h3>No tools found</h3>
            <p>
              No inventory items match "{searchQuery}"
              {selectedCategory !== "All" && ` in ${selectedCategory}`}. Try a
              different search term or category.
            </p>
            <button
              className="inventory-clear-filters"
              onClick={handleClearSearch}
            >
              Clear Filters
            </button>
          </div>
        )}

        {Object.keys(orderedGroupedItems).map((category, categoryIndex) => (
          <div key={categoryIndex} className="category-section">
            {/* Category Heading */}
            <h2 className="category-title">{category}</h2>

            {/* Inventory Cards under this category */}
            <div className="mainbox">
              {groupedItems[category].map((item, idx) => (
                <InventoryCard key={item._id || `${category}-${idx}`} item={item} />
              ))}
            </div>
          </div>
        ))}

        {/* Most BPCL photos are licensed from Wikimedia Commons and need credit */}
        {inventoryItems.some((item) => item.poweredBy === "BPCL") && (
          <p className="inventory-credits">
            <a href="/assets/inventory/bpcl/credits.html">Photo credits for BPCL-sponsored equipment</a>
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}
