import { createContext, useReducer, useEffect, useCallback } from 'react';
import cartServices from '../services/cartServices';
import toast from 'react-hot-toast';

const CART_ACTIONS = {
    SET_CART: 'SET_CART',
    ADD_ITEM: 'ADD_ITEM',
    UPDATE_ITEM: 'UPDATE_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    CLEAR_CART: 'CLEAR_CART',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SYNC_START: 'SYNC_START',
    SYNC_COMPLETE: 'SYNC_COMPLETE',
};

const LOCALSTORAGE_KEY = 'guestCart';

const initialState = {
    items: [],
    isLoading: false,
    error: null,
    isSyncing: false,
};

/**
 * Cart Reducer
 * Manages cart state transformations
 */
const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.SET_CART:
            return {
                ...state,
                items: action.payload,
                isLoading: false,
                error: null,
            };

        case CART_ACTIONS.ADD_ITEM: {
            const existingItemIndex = state.items.findIndex(
                (item) => item.menuItemId === action.payload.menuItemId
            );

            let newItems;
            if (existingItemIndex >= 0) {
                newItems = [...state.items];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + action.payload.quantity,
                };
            } else {
                newItems = [...state.items, action.payload];
            }

            return {
                ...state,
                items: newItems,
                error: null,
            };
        }

        case CART_ACTIONS.UPDATE_ITEM: {
            const newItems = state.items.map((item) =>
                item.menuItemId === action.payload.menuItemId
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );

            return {
                ...state,
                items: newItems,
                error: null,
            };
        }

        case CART_ACTIONS.REMOVE_ITEM: {
            const newItems = state.items.filter(
                (item) => item.menuItemId !== action.payload.menuItemId
            );

            return {
                ...state,
                items: newItems,
                error: null,
            };
        }

        case CART_ACTIONS.CLEAR_CART:
            return {
                ...state,
                items: [],
                error: null,
            };

        case CART_ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case CART_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case CART_ACTIONS.SYNC_START:
            return {
                ...state,
                isSyncing: true,
            };

        case CART_ACTIONS.SYNC_COMPLETE:
            return {
                ...state,
                isSyncing: false,
            };

        default:
            return state;
    }
};

/**
 * Helper function to normalize cart items from backend
 */
const normalizeBackendCart = (backendCart) => {
    if (!backendCart || !backendCart.cart || !backendCart.cart.items) {
        return [];
    }

    return backendCart.cart.items.map((item) => ({
        menuItemId: item.menuItem._id || item.menuItem,
        quantity: item.quantity,
        priceAtAddition: item.priceAtAddition,
        originalPrice: item.originalPrice,
        discountApplied: item.discountApplied,
        // Include full menu item details if populated
        menuItemDetails: item.menuItem._id ? item.menuItem : null,
    }));
};

/**
 * Helper function to normalize localStorage cart
 */
const normalizeLocalStorageCart = (localCart) => {
    if (!Array.isArray(localCart)) return [];
    return localCart.map((item) => ({
        menuItemId: item.menuItemId || item._id,
        quantity: item.quantity || 1,
        priceAtAddition: item.priceAtAddition || item.price,
        originalPrice: item.originalPrice || item.price,
        discountApplied: item.discountApplied || 0,
        menuItemDetails: item.menuItemDetails || null,
    }));
};

const CartContext = createContext();

export const CartProvider = ({ children, isAuthenticated }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    /**
     * Load cart from localStorage (for guest users)
     */
    const loadLocalCart = useCallback(() => {
        try {
            const localCart = localStorage.getItem(LOCALSTORAGE_KEY);
            if (localCart) {
                const parsedCart = JSON.parse(localCart);
                const normalizedCart = normalizeLocalStorageCart(parsedCart);
                dispatch({ type: CART_ACTIONS.SET_CART, payload: normalizedCart });
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to load cart' });
        }
    }, []);

    /**
     * Save cart to localStorage
     */
    const saveLocalCart = useCallback((items) => {
        try {
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, []);

    /**
     * Load cart from backend (for authenticated users)
     */
    const loadBackendCart = useCallback(async () => {
        try {
            dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
            const response = await cartServices.getCart();
            const normalizedCart = normalizeBackendCart(response);
            dispatch({ type: CART_ACTIONS.SET_CART, payload: normalizedCart });
        } catch (error) {
            console.error('Error loading cart from backend:', error);
            // If backend fails, try loading from localStorage
            loadLocalCart();
        }
    }, [loadLocalCart]);

    /**
     * Sync local cart with backend when user logs in
     */
    const syncCartWithBackend = useCallback(async () => {
        try {
            dispatch({ type: CART_ACTIONS.SYNC_START });

            // Get local cart
            const localCart = localStorage.getItem(LOCALSTORAGE_KEY);
            if (localCart) {
                const parsedCart = JSON.parse(localCart);
                const normalizedCart = normalizeLocalStorageCart(parsedCart);

                if (normalizedCart.length > 0) {
                    // Prepare items for backend
                    const itemsToSync = normalizedCart.map((item) => ({
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                    }));

                    // Send to backend (supports batch add)
                    await cartServices.addToCart({ items: itemsToSync });

                    // Clear localStorage after successful sync
                    localStorage.removeItem(LOCALSTORAGE_KEY);

                    toast.success('Cart synced successfully!');
                }
            }

            // Load updated cart from backend
            await loadBackendCart();
            dispatch({ type: CART_ACTIONS.SYNC_COMPLETE });
        } catch (error) {
            console.error('Error syncing cart:', error);
            dispatch({ type: CART_ACTIONS.SYNC_COMPLETE });
            toast.error('Failed to sync cart');
        }
    }, [loadBackendCart]);

    /**
     * Initialize cart based on authentication status
     */
    useEffect(() => {
        if (isAuthenticated) {
            // Check if there's a local cart to sync
            const localCart = localStorage.getItem(LOCALSTORAGE_KEY);
            if (localCart && JSON.parse(localCart).length > 0) {
                syncCartWithBackend();
            } else {
                loadBackendCart();
            }
        } else {
            loadLocalCart();
        }
    }, [isAuthenticated, loadBackendCart, loadLocalCart, syncCartWithBackend]);

    /**
     * Save to localStorage when cart changes (for guest users)
     */
    useEffect(() => {
        if (!isAuthenticated) {
            saveLocalCart(state.items);
        }
    }, [state.items, isAuthenticated, saveLocalCart]);

    /**
     * Add item to cart
     */
    const addToCart = async (menuItemId, quantity = 1, menuItemDetails = null) => {
        try {
            if (isAuthenticated) {
                // Add to backend
                const response = await cartServices.addToCart({ menuItemId, quantity });
                const normalizedCart = normalizeBackendCart(response);
                dispatch({ type: CART_ACTIONS.SET_CART, payload: normalizedCart });
                toast.success(`Added ${quantity} item(s) to cart`);
            } else {
                // Add to local state and localStorage
                dispatch({
                    type: CART_ACTIONS.ADD_ITEM,
                    payload: {
                        menuItemId,
                        quantity,
                        priceAtAddition: menuItemDetails?.price || 0,
                        originalPrice: menuItemDetails?.price || 0,
                        discountApplied: 0,
                        menuItemDetails,
                    },
                });
                toast.success(`Added ${quantity} item(s) to cart`);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            const errorMsg = error.response?.data?.message || 'Failed to add item to cart';
            dispatch({ type: CART_ACTIONS.SET_ERROR, payload: errorMsg });
            toast.error(errorMsg);
        }
    };

    /**
     * Update item quantity in cart
     */
    const updateCartItem = async (menuItemId, quantity) => {
        if (quantity < 1) {
            return removeFromCart(menuItemId);
        }

        try {
            if (isAuthenticated) {
                // Update in backend
                const response = await cartServices.updateCartItem(menuItemId, quantity);
                const normalizedCart = normalizeBackendCart(response);
                dispatch({ type: CART_ACTIONS.SET_CART, payload: normalizedCart });
            } else {
                // Update in local state and localStorage
                dispatch({
                    type: CART_ACTIONS.UPDATE_ITEM,
                    payload: { menuItemId, quantity },
                });
            }
        } catch (error) {
            console.error('Error updating cart item:', error);
            const errorMsg = error.response?.data?.message || 'Failed to update cart item';
            dispatch({ type: CART_ACTIONS.SET_ERROR, payload: errorMsg });
            toast.error(errorMsg);
        }
    };

    /**
     * Remove item from cart
     */
    const removeFromCart = async (menuItemId) => {
        try {
            if (isAuthenticated) {
                // Remove from backend
                await cartServices.removeFromCart(menuItemId);
                dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { menuItemId } });
                toast.success('Item removed from cart');
            } else {
                // Remove from local state and localStorage
                dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { menuItemId } });
                toast.success('Item removed from cart');
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
            const errorMsg = error.response?.data?.message || 'Failed to remove item';
            dispatch({ type: CART_ACTIONS.SET_ERROR, payload: errorMsg });
            toast.error(errorMsg);
        }
    };

    /**
     * Clear entire cart
     */
    const clearCart = async () => {
        try {
            if (isAuthenticated) {
                // Clear backend cart
                await cartServices.clearCart();
            } else {
                // Clear localStorage
                localStorage.removeItem(LOCALSTORAGE_KEY);
            }
            dispatch({ type: CART_ACTIONS.CLEAR_CART });
            toast.success('Cart cleared');
        } catch (error) {
            console.error('Error clearing cart:', error);
            const errorMsg = error.response?.data?.message || 'Failed to clear cart';
            dispatch({ type: CART_ACTIONS.SET_ERROR, payload: errorMsg });
            toast.error(errorMsg);
        }
    };

    /**
     * Get item count in cart by menuItemId
     */
    const getItemQuantity = (menuItemId) => {
        const item = state.items.find((item) => item.menuItemId === menuItemId);
        return item ? item.quantity : 0;
    };

    /**
     * Get total items count
     */
    const getTotalItems = () => {
        return state.items.reduce((total, item) => total + item.quantity, 0);
    };

    /**
     * Calculate subtotal
     */
    const getSubtotal = () => {
        return state.items.reduce((total, item) => {
            const price = item.priceAtAddition || 0;
            return total + price * item.quantity;
        }, 0);
    };

    /**
     * Handle logout - clear cart from localStorage
     */
    const handleLogout = () => {
        localStorage.removeItem(LOCALSTORAGE_KEY);
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    const value = {
        // State
        items: state.items,
        isLoading: state.isLoading,
        error: state.error,
        isSyncing: state.isSyncing,

        // Actions
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        syncCartWithBackend,
        handleLogout,

        // Utilities
        getItemQuantity,
        getTotalItems,
        getSubtotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
