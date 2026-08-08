import React, { useState, useEffect, useMemo } from 'react';
import './HexagonColorPicker.css';

// Helper to convert HSL to Hex
const hslToHex = (h, s, l) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// Generate 61-hexagon concentric color wheel matrix (9 rows)
const generateHoneycombGrid = () => {
  const rowCounts = [5, 6, 7, 8, 9, 8, 7, 6, 5];
  const grid = [];

  rowCounts.forEach((count, rowIndex) => {
    const row = [];
    const dy = (rowIndex - 4) * 0.866; // sqrt(3)/2 vertical step
    const centerCol = (count - 1) / 2;

    for (let colIndex = 0; colIndex < count; colIndex++) {
      const dx = colIndex - centerCol;
      const r = Math.sqrt(dx * dx + dy * dy);

      let hexColor = '#ffffff';

      if (r > 0.1) {
        let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
        if (angleDeg < 0) angleDeg += 360;

        // Align Hue: Blue on top, Green on left, Yellow/Red bottom, Purple right
        const hue = (angleDeg + 270) % 360;
        const sat = Math.min(100, Math.round(55 + r * 12));
        const light = Math.max(18, Math.round(96 - r * 16));

        hexColor = hslToHex(hue, sat, light);
      }

      row.push({
        id: `hex-${rowIndex}-${colIndex}`,
        color: hexColor,
      });
    }
    grid.push(row);
  });

  return grid;
};

const defaultPresets = [
  { name: 'SCIEnT Gold', hex: '#facc15' },
  { name: 'Cyber Cyan', hex: '#38bdf8' },
  { name: 'Electric Purple', hex: '#a78bfa' },
  { name: 'Neon Pink', hex: '#f472b6' },
  { name: 'Emerald Green', hex: '#34d399' },
  { name: 'Sunset Orange', hex: '#fb923c' },
  { name: 'Deep Violet', hex: '#2F293A' },
  { name: 'Magenta Glow', hex: '#FF9FFC' },
];

const HexagonColorPicker = ({
  value = '#facc15',
  onChange,
  label = 'Select Color',
  presets = defaultPresets,
}) => {
  const [selectedColor, setSelectedColor] = useState(value);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (value) {
      setSelectedColor(value);
      setInputValue(value);
    }
  }, [value]);

  const honeycombGrid = useMemo(() => generateHoneycombGrid(), []);

  const handleSelectColor = (colorHex) => {
    setSelectedColor(colorHex);
    setInputValue(colorHex);
    if (onChange) onChange(colorHex);
  };

  const handleCustomInputSubmit = (e) => {
    e.preventDefault();
    let formatted = inputValue.trim();
    if (formatted && !formatted.startsWith('#') && /^[0-9a-fA-F]{3,6}$/.test(formatted)) {
      formatted = `#${formatted}`;
    }
    if (/^#([0-9a-fA-F]{3}){1,2}$/.test(formatted)) {
      setSelectedColor(formatted);
      if (onChange) onChange(formatted);
    }
  };

  return (
    <div className="hexagon-color-picker-container">
      {label && <h4 className="picker-title">{label}</h4>}

      {/* Standard Preset Swatch Buttons */}
      {presets && presets.length > 0 && (
        <div className="picker-section">
          <span className="picker-section-heading">Preset Colors:</span>
          <div className="picker-presets-row">
            {presets.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                title={preset.name}
                onClick={() => handleSelectColor(preset.hex)}
                className={`preset-swatch-btn ${
                  selectedColor.toLowerCase() === preset.hex.toLowerCase() ? 'active' : ''
                }`}
                style={{ backgroundColor: preset.hex }}
              >
                {selectedColor.toLowerCase() === preset.hex.toLowerCase() && (
                  <span className="preset-swatch-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Section 1: Honeycomb Hexagon Matrix */}
      <div className="picker-section">
        <span className="picker-section-heading">Pick a Color:</span>
        
        <div className="honeycomb-wrapper">
          {honeycombGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="honeycomb-row">
              {row.map((cell) => {
                const isSelected = selectedColor.toLowerCase() === cell.color.toLowerCase();
                return (
                  <div
                    key={cell.id}
                    className={`hexagon-cell ${isSelected ? 'selected' : ''}`}
                    style={{ backgroundColor: cell.color }}
                    onClick={() => handleSelectColor(cell.color)}
                    title={cell.color}
                  >
                    {isSelected && <span className="hexagon-selected-ring" />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Or Enter a Color */}
      <div className="picker-section">
        <span className="picker-section-heading">Or Enter a Color:</span>
        <form onSubmit={handleCustomInputSubmit} className="picker-input-group">
          <input
            type="text"
            className="picker-text-input"
            placeholder="#FFB800"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="picker-ok-btn">
            OK
          </button>
        </form>
      </div>

      {/* Section 3: Or Use HTML5 */}
      <div className="picker-section">
        <span className="picker-section-heading">Or Use HTML5:</span>
        <div className="picker-html5-row">
          <input
            type="color"
            className="picker-native-color"
            value={selectedColor.startsWith('#') && selectedColor.length === 7 ? selectedColor : '#ffffff'}
            onChange={(e) => handleSelectColor(e.target.value)}
          />
          <span className="picker-current-hex">{selectedColor}</span>
        </div>
      </div>
    </div>
  );
};

export default HexagonColorPicker;
