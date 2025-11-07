import { useContext } from 'react';
import { OffersContext } from '../context/OffersContext';
export function useOffer() {
    const context = useContext(OffersContext);
    if (!context) {
        throw new Error('useOffers must be used within an OffersProvider');
    }
    return context;
}
