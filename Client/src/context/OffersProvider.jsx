import { useState, useEffect, useCallback, createContext } from 'react';
import apiClient from '../config/axiosConfig';

export const offersContext = createContext();

export function OffersProvider({ children }) {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    // Fetch offers from backend
    async function fetchOffers() {
        try {
            const response = await apiClient.get('/offers');
            setOffers(response.data);
        } catch (err) {
            console.error('Failed to fetch offers:', err);
        } finally {
            setLoading(false);
        }
    }

    // Fetch once on mount
    useEffect(() => {
        fetchOffers();
    }, []);

    // Helper: Get offer by ID
    const getOfferById = useCallback((id) => offers.find((offer) => offer._id === id), [offers]);

    return (
        <offersContext.Provider value={{ offers, loading, getOfferById, setOffers }}>
            {children}
        </offersContext.Provider>
    );
}
