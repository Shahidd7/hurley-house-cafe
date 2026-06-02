import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, Reservation } from '../types';

interface AppContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity: number, customizations?: string[]) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, q: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  submitReservation: (details: Reservation) => Promise<boolean>;
  activeNotification: { message: string; type: 'success' | 'info' } | null;
  showNotification: (message: string, type?: 'success' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [activeNotification, setActiveNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('hurley-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('hurley-theme', next ? 'dark' : 'light');
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setActiveNotification({ message, type });
    setTimeout(() => {
      setActiveNotification(null);
    }, 4000);
  };

  const addToCart = (item: MenuItem, quantity: number, customizations?: string[]) => {
    setCart((prevCart) => {
      const hash = `${item.id}-${(customizations || []).join(',')}`;
      const existingIndex = prevCart.findIndex((i) => i.id === hash);
      
      let nextCart = [...prevCart];
      if (existingIndex > -1) {
        const existingItem = prevCart[existingIndex];
        const newQty = existingItem.quantity + quantity;
        nextCart[existingIndex] = {
          ...existingItem,
          quantity: newQty,
          totalPrice: parseFloat((item.price * newQty).toFixed(2))
        };
      } else {
        nextCart.push({
          id: hash,
          menuItem: item,
          quantity,
          customizations,
          totalPrice: parseFloat((item.price * quantity).toFixed(2))
        });
      }
      
      showNotification(`Added ${quantity}x ${item.name} to your order!`, 'success');
      return nextCart;
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === cartItemId);
      if (item) {
        showNotification(`Removed ${item.menuItem.name} from your order.`, 'info');
      }
      return prev.filter((i) => i.id !== cartItemId);
    });
  };

  const updateCartQuantity = (cartItemId: string, q: number) => {
    if (q <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: q, totalPrice: parseFloat((item.menuItem.price * q).toFixed(2)) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showNotification('Order cleared.', 'info');
  };

  const submitReservation = async (details: Reservation): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    showNotification(`Reservation confirmed for ${details.guests} guests on ${details.date} at ${details.time}!`, 'success');
    setIsReservationOpen(false);
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isReservationOpen,
        setIsReservationOpen,
        submitReservation,
        activeNotification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used inside an AppProvider');
  }
  return context;
};
