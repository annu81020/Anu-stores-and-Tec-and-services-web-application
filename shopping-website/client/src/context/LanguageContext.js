import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    home: 'Home',
    cart: 'Cart',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    profile: 'Profile',
    orders: 'My Orders',
    admin: 'Admin',
    storeLocator: 'Store Locator',
    searchProducts: 'Search products...',
    addToCart: 'Add to Cart',
    checkout: 'Checkout',
    viewDetails: 'View Details',
    price: 'Price',
    stock: 'In Stock',
    outOfStock: 'Out of Stock',
    category: 'Category',
    description: 'Description',
    reviews: 'Reviews',
    rating: 'Rating',
    welcome: 'Welcome',
    featuredProducts: 'Featured Products',
    shopNow: 'Shop Now',
    contactUs: 'Contact Us',
    aboutUs: 'About Us',
    termsConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    footerTagline: 'Your Future, Delivered Today',
    allRightsReserved: 'All rights reserved',
    poweredBy: 'Powered by Advanced Technology',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Name',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    postalCode: 'Postal Code',
    country: 'Country',
    orderTracking: 'Order Tracking',
    trackYourOrder: 'Track Your Order',
    orderStatus: 'Order Status',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    wishlist: 'Wishlist',
    addToWishlist: 'Add to Wishlist',
    removeFromWishlist: 'Remove from Wishlist',
    deals: 'Special Deals',
    dealOfTheDay: 'Deal of the Day',
    limitedOffer: 'Limited Offer',
    writeReview: 'Write a Review',
    submitReview: 'Submit Review',
    yourReview: 'Your Review',
    ratingRequired: 'Rating Required',
    searchSuggestions: 'Search Suggestions',
    noResults: 'No Results Found',
    viewAll: 'View All',
    trending: 'Trending',
    newArrivals: 'New Arrivals',
    bestSellers: 'Best Sellers',
    recommended: 'Recommended For You'
  },
  hi: {
    home: 'होम',
    cart: 'कार्ट',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    register: 'रजिस्टर',
    profile: 'प्रोफाइल',
    orders: 'मेरे आर्डर',
    admin: 'एडमिन',
    storeLocator: 'स्टोर लोकेटर',
    searchProducts: 'उत्पाद खोजें...',
    addToCart: 'कार्ट में डालें',
    checkout: 'चेकआउट',
    viewDetails: 'विवरण देखें',
    price: 'मूल्य',
    stock: 'स्टॉक में',
    outOfStock: 'स्टॉक में नहीं',
    category: 'श्रेणी',
    description: 'विवरण',
    reviews: 'समीक्षाएं',
    rating: 'रेटिंग',
    welcome: 'स्वागत',
    featuredProducts: 'विशेष उत्पाद',
    shopNow: 'अभी खरीदें',
    contactUs: 'संपर्क करें',
    aboutUs: 'हमारे बारे में',
    termsConditions: 'नियम और शर्तें',
    privacyPolicy: 'गोपनीयता नीति',
    footerTagline: 'आपका भविष्य, आज डिलीवर',
    allRightsReserved: 'सर्वाधिकार सुरक्षित',
    poweredBy: 'उन्नत प्रौद्योगिकी द्वारा संचालित',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    name: 'नाम',
    phone: 'फोन',
    address: 'पता',
    city: 'शहर',
    postalCode: 'पोस्टल कोड',
    country: 'देश',
    orderTracking: 'आर्डर ट्रैकिंग',
    trackYourOrder: 'अपना आर्डर ट्रैक करें',
    orderStatus: 'आर्डर की स्थिति',
    processing: 'प्रोसेसिंग',
    shipped: 'भेज दिया गया',
    delivered: 'डिलीवर किया गया',
    cancelled: 'रद्द किया गया',
    wishlist: 'विशलिस्ट',
    addToWishlist: 'विशलिस्ट में डालें',
    removeFromWishlist: 'विशलिस्ट से हटाएं',
    deals: 'विशेष सौदे',
    dealOfTheDay: 'आज का सौदा',
    limitedOffer: 'सीमित ऑफर',
    writeReview: 'समीक्षा लिखें',
    submitReview: 'समीक्षा जमा करें',
    yourReview: 'आपकी समीक्षा',
    ratingRequired: 'रेटिंग आवश्यक',
    searchSuggestions: 'खोज सुझाव',
    noResults: 'कोई परिणाम नहीं मिला',
    viewAll: 'सभी देखें',
    trending: 'ट्रेंडिंग',
    newArrivals: 'नए आगमन',
    bestSellers: 'सर्वश्रेष्ठ विक्रेता',
    recommended: 'आपके लिए अनुशंसित'
  },
  de: {
    home: 'Startseite',
    cart: 'Warenkorb',
    login: 'Anmelden',
    logout: 'Abmelden',
    register: 'Registrieren',
    profile: 'Profil',
    orders: 'Meine Bestellungen',
    admin: 'Administrator',
    storeLocator: 'Geschäftsfinder',
    searchProducts: 'Produkte suchen...',
    addToCart: 'In den Warenkorb',
    checkout: 'Zur Kasse',
    viewDetails: 'Details anzeigen',
    price: 'Preis',
    stock: 'Auf Lager',
    outOfStock: 'Nicht vorrätig',
    category: 'Kategorie',
    description: 'Beschreibung',
    reviews: 'Bewertungen',
    rating: 'Bewertung',
    welcome: 'Willkommen',
    featuredProducts: 'Empfohlene Produkte',
    shopNow: 'Jetzt einkaufen',
    contactUs: 'Kontaktieren Sie uns',
    aboutUs: 'Über uns',
    termsConditions: 'Geschäftsbedingungen',
    privacyPolicy: 'Datenschutzrichtlinie',
    footerTagline: 'Ihre Zukunft, heute geliefert',
    allRightsReserved: 'Alle Rechte vorbehalten',
    poweredBy: 'Betrieben durch fortschrittliche Technologie',
    email: 'E-Mail',
    password: 'Passwort',
    confirmPassword: 'Passwort bestätigen',
    name: 'Name',
    phone: 'Telefon',
    address: 'Adresse',
    city: 'Stadt',
    postalCode: 'Postleitzahl',
    country: 'Land',
    orderTracking: 'Bestellverfolgung',
    trackYourOrder: 'Verfolgen Sie Ihre Bestellung',
    orderStatus: 'Bestellstatus',
    processing: 'In Bearbeitung',
    shipped: 'Versendet',
    delivered: 'Zugestellt',
    cancelled: 'Storniert',
    wishlist: 'Wunschliste',
    addToWishlist: 'Zur Wunschliste',
    removeFromWishlist: 'Von Wunschliste entfernen',
    deals: 'Sonderangebote',
    dealOfTheDay: 'Angebot des Tages',
    limitedOffer: 'Begrenztes Angebot',
    writeReview: 'Bewertung schreiben',
    submitReview: 'Bewertung absenden',
    yourReview: 'Ihre Bewertung',
    ratingRequired: 'Bewertung erforderlich',
    searchSuggestions: 'Suchvorschläge',
    noResults: 'Keine Ergebnisse gefunden',
    viewAll: 'Alle anzeigen',
    trending: 'Im Trend',
    newArrivals: 'Neuankömmlinge',
    bestSellers: 'Bestseller',
    recommended: 'Für Sie empfohlen'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
