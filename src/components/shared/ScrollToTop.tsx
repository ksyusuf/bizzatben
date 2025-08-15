// src/components/shared/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // pathname her değiştiğinde pencereyi en üste kaydır
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Bu bileşen UI'da bir şey render etmeyeceği için null döndürür
}