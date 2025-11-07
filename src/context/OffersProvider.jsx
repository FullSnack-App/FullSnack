import { useState, useEffect, useCallback } from 'react';
import apiClient from '../config/axiosConfig';
import { OffersContext } from './OffersContext';

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
        <OffersContext.Provider value={{ offers, loading, getOfferById, setOffers }}>
            {children}
        </OffersContext.Provider>
    );
}
