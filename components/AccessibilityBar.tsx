'use client';

import { useState } from 'react';
import { Volume2, Minus, Plus, Eye } from 'lucide-react';

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  const handleFontDecrease = () => {
    if (fontSize > 80) setFontSize(fontSize - 10);
  };

  const handleFontIncrease = () => {
    if (fontSize < 150) setFontSize(fontSize + 10);
  };

  const handleFontReset = () => {
    setFontSize(100);
  };

  return (
    <div
      className={`${
        highContrast ? 'bg-black text-white border-2 border-white' : 'bg-light-blue text-text-dark border-b border-gray-300'
      } transition-colors duration-300`}
      style={{ fontSize: `${fontSize}%` }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <a
            href="#main-content"
            className="font-semibold hover:underline focus:underline"
          >
            Skip to Main Content
          </a>
          <span className="text-gray-500">|</span>
          <button
            className="flex items-center gap-1 hover:underline focus:underline"
            aria-label="Screen reader"
          >
            <Volume2 size={16} />
            <span>Screen Reader</span>
          </button>
          <span className="text-gray-500">|</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFontDecrease}
              className="p-1 hover:bg-gray-300 rounded focus:ring-2 focus:ring-offset-1 focus:ring-primary-blue"
              aria-label="Decrease font size"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">A</span>
            <button
              onClick={handleFontReset}
              className="text-xs hover:bg-gray-300 rounded px-1 focus:ring-2 focus:ring-offset-1 focus:ring-primary-blue"
              aria-label="Reset font size"
            >
              Reset
            </button>
            <button
              onClick={handleFontIncrease}
              className="p-1 hover:bg-gray-300 rounded focus:ring-2 focus:ring-offset-1 focus:ring-primary-blue"
              aria-label="Increase font size"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center gap-1 hover:underline focus:underline"
            aria-label="Toggle high contrast mode"
          >
            <Eye size={16} />
            <span>High Contrast</span>
          </button>
          <span className="text-gray-500">|</span>
          <select
            className={`${
              highContrast
                ? 'bg-black text-white border-2 border-white'
                : 'bg-white text-text-dark border border-gray-300'
            } px-2 py-1 rounded focus:ring-2 focus:ring-offset-1 focus:ring-primary-blue cursor-pointer`}
            aria-label="Language selection"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="bn">বাংলা</option>
            <option value="te">తెలుగు</option>
            <option value="ta">தமிழ்</option>
          </select>
          <span className="text-gray-500">|</span>
          <span className="font-semibold">🇮🇳 India</span>
        </div>
      </div>
    </div>
  );
}
