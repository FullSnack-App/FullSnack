import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";

export function useMenu() {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useOffers must be used within an OffersProvider');
    }
    return context;
}
