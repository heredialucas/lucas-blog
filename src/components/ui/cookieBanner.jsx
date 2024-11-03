// components/ui/CookieBanner.js
"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setIsBannerVisible(true);
      setTimeout(() => setIsAnimating(true), 100);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", true);
    setIsAnimating(false);
    setTimeout(() => setIsBannerVisible(false), 300);
  };

  const handleReject = () => {
    localStorage.setItem("cookiesAccepted", false);
    setIsAnimating(false);
    setTimeout(() => setIsBannerVisible(false), 300);
  };

  if (!isBannerVisible) return null;

  return (
    <div
      className={`fixed bottom-0 w-full bg-white text-gray-800 p-4 shadow-md z-50 transition-transform duration-300 relative ${
        isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-2 md:mb-0">
          We use cookies to ensure the best experience on our website. Please
          accept or reject cookies as per your preference.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleAccept}
            className="bg-teal-500 hover:bg-teal-600 text-white py-1 px-4 rounded"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
