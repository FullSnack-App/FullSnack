import { useContext } from "react";
import { offersContext } from "../context/offersProvider";

export function useOffer() {
    const context = useContext(offersContext);
    if (!context) {
        throw new Error('useOffers must be used within an OffersProvider');
    }
    return context;
}
